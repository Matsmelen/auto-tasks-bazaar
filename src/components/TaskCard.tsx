import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface TaskCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isNew?: boolean;
  onAddNew?: () => void;
}

export const TaskCard = ({
  title,
  description,
  isCompleted = false,
  isNew = false,
  onAddNew,
}: TaskCardProps) => {
  return (
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
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        {isCompleted ? (
          <Button className="w-full bg-success hover:bg-success/90">
            Task Completed by Automation AI
          </Button>
        ) : isNew ? (
          <Button className="w-full" onClick={onAddNew}>
            Add New Task
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};