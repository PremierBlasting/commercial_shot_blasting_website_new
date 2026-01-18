import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Upload, X, Image as ImageIcon, Loader2, Zap } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  savings: number;
}

// Compress image using canvas
async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<{ base64: string; contentType: string; stats: CompressionStats }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw image with white background (for transparency)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Determine output format - use JPEG for better compression unless PNG is needed
      const outputType = file.type === "image/png" && hasTransparency(img, ctx, canvas) 
        ? "image/png" 
        : "image/jpeg";
      
      // Convert to base64 with compression
      const dataUrl = canvas.toDataURL(outputType, quality);
      const base64 = dataUrl.split(",")[1];
      
      // Calculate compressed size (base64 is ~33% larger than binary)
      const compressedSize = Math.round((base64.length * 3) / 4);
      const originalSize = file.size;
      const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      resolve({
        base64,
        contentType: outputType,
        stats: {
          originalSize,
          compressedSize,
          savings: Math.max(0, savings),
        },
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

// Check if image has transparency (simplified check)
function hasTransparency(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): boolean {
  // For simplicity, we'll assume PNGs might have transparency
  // A more thorough check would scan pixel data
  return false; // Default to JPEG for better compression
}

// Format file size for display
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageUpload({ 
  value, 
  onChange, 
  folder = "gallery", 
  label, 
  className = "",
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressionStats, setCompressionStats] = useState<CompressionStats | null>(null);
  const [statusText, setStatusText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.image.useMutation({
    onSuccess: (data) => {
      onChange(data.url);
      if (compressionStats && compressionStats.savings > 0) {
        toast.success(`Image uploaded! Saved ${compressionStats.savings}% (${formatFileSize(compressionStats.originalSize - compressionStats.compressedSize)})`);
      } else {
        toast.success("Image uploaded successfully");
      }
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    },
  });

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 20MB before compression)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image must be less than 20MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setStatusText("Reading image...");

    try {
      // Compress image
      setUploadProgress(20);
      setStatusText("Compressing image...");
      
      const { base64, contentType, stats } = await compressImage(file, maxWidth, maxHeight, quality);
      setCompressionStats(stats);
      
      setUploadProgress(60);
      setStatusText(`Compressed: ${formatFileSize(stats.originalSize)} → ${formatFileSize(stats.compressedSize)}`);
      
      // Small delay to show compression stats
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(80);
      setStatusText("Uploading to server...");
      
      // Get file extension from original name or content type
      const ext = contentType === "image/png" ? "png" : "jpg";
      const fileName = file.name.replace(/\.[^/.]+$/, "") + "." + ext;
      
      uploadMutation.mutate({
        fileName,
        fileData: base64,
        contentType,
        folder,
      });
    } catch (error) {
      toast.error("Failed to process image");
      setIsUploading(false);
      setUploadProgress(0);
      setCompressionStats(null);
      setStatusText("");
    }
  }, [folder, uploadMutation, maxWidth, maxHeight, quality]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <div className="relative aspect-video rounded-lg overflow-hidden border bg-gray-100">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleClick}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-1" /> Replace
              </Button>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={!isUploading ? handleClick : undefined}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative aspect-video rounded-lg border-2 border-dashed
            transition-all duration-200 flex flex-col items-center justify-center gap-2
            ${isDragging 
              ? "border-[#2C5F7F] bg-[#2C5F7F]/5" 
              : "border-gray-300 hover:border-[#2C5F7F] hover:bg-gray-50"
            }
            ${isUploading ? "pointer-events-none" : "cursor-pointer"}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#2C5F7F] animate-spin" />
              <p className="text-sm text-gray-600">{statusText || `Uploading... ${uploadProgress}%`}</p>
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2C5F7F] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              {compressionStats && compressionStats.savings > 0 && (
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <Zap className="w-3 h-3" />
                  <span>Saved {compressionStats.savings}%</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isDragging ? "bg-[#2C5F7F]/10" : "bg-gray-100"}
              `}>
                {isDragging ? (
                  <Upload className="w-6 h-6 text-[#2C5F7F]" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {isDragging ? "Drop image here" : "Click or drag image"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 20MB • Auto-compressed
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
