import { useState } from "react";
import { Check, Clock, EuroIcon, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { TaskPreviewDialog } from "./TaskPreviewDialog";
import { Tables } from "@/integrations/supabase/types";

interface TaskCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isNew?: boolean;
  onAddNew?: () => void;
  timeSaved?: number;
  name?: string;
  email?: string;
  status?: Tables<"tasks">["status"];
}

export const TaskCard = ({
  title,
  description,
  isCompleted = false,
  isNew = false,
  onAddNew,
  timeSaved = 2,
  name,
  email,
  status,
}: TaskCardProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const price = timeSaved * 12; // 12€ per hour

  return (
    <>
      <Card className="hover:animate-card-hover transition-all duration-200 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            {isCompleted && (
              <span className="text-success">
                <Check className="w-5 h-5" />
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
          {!isNew && (
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeSaved}h saved</span>
                </div>
                <div className="flex items-center gap-1">
                  <EuroIcon className="w-4 h-4" />
                  <span>{price}€</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          {isCompleted ? (
            <Button className="flex-1 bg-success hover:bg-success/90">
              Task Completed by Automation AI
            </Button>
          ) : isNew ? (
            <Button className="flex-1" onClick={onAddNew}>
              Add New Task
            </Button>
          ) : (
            <>
              <Button className="flex-1">Send Task to AI</Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      <TaskPreviewDialog
        task={
          isNew
            ? null
            : {
                title,
                description,
                timeSaved,
                submitter_name: name,
                submitter_email: email,
                status,
              }
        }
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </>
  );
};