import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Database, Download, RotateCcw, Trash2, Plus, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function BackupTab() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [backupDescription, setBackupDescription] = useState("");
  const [restoreBackupId, setRestoreBackupId] = useState<string | null>(null);
  const [deleteBackupId, setDeleteBackupId] = useState<number | null>(null);

  const { data: backups, isLoading, refetch } = trpc.backup.listAll.useQuery();
  const createBackupMutation = trpc.backup.create.useMutation();
  const restoreBackupMutation = trpc.backup.restore.useMutation();
  const deleteBackupMutation = trpc.backup.delete.useMutation();

  const handleCreateBackup = async () => {
    try {
      const result = await createBackupMutation.mutateAsync({
        description: backupDescription || undefined,
      });
      
      toast.success("Backup created successfully", {
        description: `Backup ID: ${result.backupId.substring(0, 20)}...`
      });
      
      refetch();
      setCreateDialogOpen(false);
      setBackupDescription("");
    } catch (error) {
      toast.error("Failed to create backup", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const handleDownloadBackup = async (backupId: string) => {
    try {
      const result = await trpc.backup.download.useQuery({ backupId });
      if (result.data?.fileUrl) {
        window.open(result.data.fileUrl, '_blank');
        toast.success("Backup download started");
      }
    } catch (error) {
      toast.error("Failed to download backup");
    }
  };

  const handleRestore = async (backupId: string) => {
    try {
      const result = await restoreBackupMutation.mutateAsync({ backupId });
      toast.success("Backup restored successfully", {
        description: result.message
      });
      refetch();
      setRestoreBackupId(null);
    } catch (error) {
      toast.error("Failed to restore backup", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBackupMutation.mutateAsync({ id });
      toast.success("Backup deleted successfully");
      refetch();
      setDeleteBackupId(null);
    } catch (error) {
      toast.error("Failed to delete backup");
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(2)} KB` : `${mb.toFixed(2)} MB`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "creating":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-3 w-3" />;
      case "creating":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case "failed":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C5F7F]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2C5F7F]">Backup & Restore</h2>
          <p className="text-gray-600 mt-1">
            Create backups of your website data and restore from previous backups.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Database className="h-4 w-4" />
            <span>{backups?.length || 0} backups</span>
          </div>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-[#2C5F7F] hover:bg-[#1e4259]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
        </div>
      </div>

      {!backups || backups.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Backups Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first backup to protect your website data.
            </p>
            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="bg-[#2C5F7F] hover:bg-[#1e4259]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Backup
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {backups.map((backup) => (
            <Card key={backup.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">
                        {backup.description || `Backup ${backup.backupId.substring(0, 12)}...`}
                      </CardTitle>
                      <Badge className={getStatusColor(backup.status)}>
                        {getStatusIcon(backup.status)}
                        <span className="ml-1">{backup.status}</span>
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {format(new Date(backup.createdAt), "PPpp")}
                      {backup.createdBy && ` • Created by ${backup.createdBy}`}
                    </CardDescription>
                  </div>
                  {backup.status === "completed" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (backup.fileUrl) {
                            window.open(backup.fileUrl, '_blank');
                            toast.success("Backup download started");
                          }
                        }}
                        className="text-[#2C5F7F] border-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRestoreBackupId(backup.backupId)}
                        className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restore
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteBackupId(backup.id)}
                        className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">File Size:</span>
                    <span className="ml-2 font-medium">{formatFileSize(backup.fileSize)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tables:</span>
                    <span className="ml-2 font-medium">
                      {backup.tablesIncluded ? JSON.parse(backup.tablesIncluded).length : 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Backup ID:</span>
                    <span className="ml-2 font-mono text-xs">{backup.backupId.substring(0, 20)}...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Backup Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Backup</DialogTitle>
            <DialogDescription>
              This will create a complete backup of all your website data including blog posts, gallery items, testimonials, contacts, and SEO settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                placeholder="e.g., Before major update"
                value={backupDescription}
                onChange={(e) => setBackupDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateBackup}
              disabled={createBackupMutation.isPending}
              className="bg-[#2C5F7F] hover:bg-[#1e4259]"
            >
              {createBackupMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={!!restoreBackupId} onOpenChange={() => setRestoreBackupId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore from Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore data from the selected backup. Existing data will be preserved, and duplicate records will be skipped.
              <br /><br />
              <strong>Warning:</strong> This operation cannot be undone. Consider creating a new backup before restoring.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => restoreBackupId && handleRestore(restoreBackupId)}
              className="bg-green-600 hover:bg-green-700"
              disabled={restoreBackupMutation.isPending}
            >
              {restoreBackupMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Restoring...
                </>
              ) : (
                "Restore Backup"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteBackupId} onOpenChange={() => setDeleteBackupId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this backup file. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteBackupId && handleDelete(deleteBackupId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
