import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, EuroIcon } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

interface TaskPreviewDialogProps {
  task: {
    title: string;
    description: string;
    timeSaved?: number;
    submitter_name?: string;
    submitter_email?: string;
    status?: Tables<"tasks">["status"];
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskPreviewDialog = ({
  task,
  open,
  onOpenChange,
}: TaskPreviewDialogProps) => {
  if (!task) return null;

  const price = (task.timeSaved || 2) * 12; // 12€ per hour

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{task.timeSaved || 2}h saved</span>
            </div>
            <div className="flex items-center gap-2">
              <EuroIcon className="w-5 h-5 text-gray-500" />
              <span>{price}€</span>
            </div>
          </div>

          {(task.submitter_name || task.submitter_email) && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Submitted by</h3>
              {task.submitter_name && (
                <p className="text-gray-600">Name: {task.submitter_name}</p>
              )}
              {task.submitter_email && (
                <p className="text-gray-600">Email: {task.submitter_email}</p>
              )}
            </div>
          )}

          {task.status && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Status</h3>
              <span className="capitalize text-gray-600">{task.status}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};