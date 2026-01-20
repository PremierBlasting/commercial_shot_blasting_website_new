import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { History, RotateCcw, Trash2, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";

export default function VersionHistoryTab() {
  const [rollbackVersionId, setRollbackVersionId] = useState<string | null>(null);
  const [deleteVersionId, setDeleteVersionId] = useState<number | null>(null);

  const { data: versions, isLoading, refetch } = trpc.versionHistory.listAll.useQuery();
  const markAsCurrentMutation = trpc.versionHistory.markAsCurrent.useMutation();
  const deleteVersionMutation = trpc.versionHistory.delete.useMutation();

  const handleRollback = async (versionId: string) => {
    try {
      // In a real implementation, this would trigger webdev_rollback_checkpoint
      // For now, we just mark it as current in the database
      await markAsCurrentMutation.mutateAsync({ versionId });
      toast.success("Version marked as current", {
        description: `Version ${versionId.substring(0, 8)} is now the current version. To complete the rollback, use the Management UI or webdev_rollback_checkpoint tool.`
      });
      refetch();
      setRollbackVersionId(null);
    } catch (error) {
      toast.error("Failed to mark version as current");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVersionMutation.mutateAsync({ id });
      toast.success("Version deleted successfully");
      refetch();
      setDeleteVersionId(null);
    } catch (error) {
      toast.error("Failed to delete version");
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
          <h2 className="text-2xl font-bold text-[#2C5F7F]">Version History</h2>
          <p className="text-gray-600 mt-1">
            View and manage website checkpoints. Click rollback to restore a previous version.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <History className="h-4 w-4" />
          <span>{versions?.length || 0} versions</span>
        </div>
      </div>

      {!versions || versions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Version History</h3>
            <p className="text-gray-600">
              Version history will appear here after you create checkpoints.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {versions.map((version) => (
            <Card key={version.id} className={version.isCurrent ? "border-[#2C5F7F] border-2" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">
                        Version {version.versionId.substring(0, 8)}
                      </CardTitle>
                      {version.isCurrent && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {format(new Date(version.createdAt), "PPpp")}
                      {version.createdBy && ` • Created by ${version.createdBy}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!version.isCurrent && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRollbackVersionId(version.versionId)}
                          className="text-[#2C5F7F] border-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Rollback
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteVersionId(version.id)}
                          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              {(version.description || version.changesSummary || version.screenshotUrl) && (
                <CardContent className="space-y-3">
                  {version.description && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                      <p className="text-sm text-gray-600">{version.description}</p>
                    </div>
                  )}
                  {version.changesSummary && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Changes</h4>
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {version.changesSummary}
                      </div>
                    </div>
                  )}
                  {version.screenshotUrl && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Screenshot</h4>
                      <img
                        src={version.screenshotUrl}
                        alt={`Version ${version.versionId} screenshot`}
                        className="rounded-lg border border-gray-200 max-w-md"
                      />
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Rollback Confirmation Dialog */}
      <AlertDialog open={!!rollbackVersionId} onOpenChange={() => setRollbackVersionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rollback to Previous Version?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark version {rollbackVersionId?.substring(0, 8)} as the current version.
              To complete the rollback, you'll need to use the Management UI or the webdev_rollback_checkpoint tool.
              <br /><br />
              <strong>Note:</strong> This action only updates the database record. The actual code rollback must be performed separately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => rollbackVersionId && handleRollback(rollbackVersionId)}
              className="bg-[#2C5F7F] hover:bg-[#1e4259]"
            >
              Mark as Current
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteVersionId} onOpenChange={() => setDeleteVersionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Version?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this version record from the database.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteVersionId && handleDelete(deleteVersionId)}
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
