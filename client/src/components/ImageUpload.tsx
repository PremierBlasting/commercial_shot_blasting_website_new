import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, folder = "gallery", label, className = "" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.image.useMutation({
    onSuccess: (data) => {
      onChange(data.url);
      toast.success("Image uploaded successfully");
      setIsUploading(false);
      setUploadProgress(0);
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    },
  });

  const handleFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    // Convert file to base64
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress(Math.round((e.loaded / e.total) * 50));
      }
    };
    reader.onload = async () => {
      setUploadProgress(60);
      const base64 = (reader.result as string).split(",")[1];
      
      setUploadProgress(80);
      uploadMutation.mutate({
        fileName: file.name,
        fileData: base64,
        contentType: file.type,
        folder,
      });
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsUploading(false);
      setUploadProgress(0);
    };
    reader.readAsDataURL(file);
  }, [folder, uploadMutation]);

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
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative aspect-video rounded-lg border-2 border-dashed cursor-pointer
            transition-all duration-200 flex flex-col items-center justify-center gap-2
            ${isDragging 
              ? "border-[#2C5F7F] bg-[#2C5F7F]/5" 
              : "border-gray-300 hover:border-[#2C5F7F] hover:bg-gray-50"
            }
            ${isUploading ? "pointer-events-none" : ""}
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#2C5F7F] animate-spin" />
              <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2C5F7F] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
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
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
