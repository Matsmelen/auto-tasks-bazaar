import { Check, Clock, EuroIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface TaskCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isNew?: boolean;
  onAddNew?: () => void;
  timeSaved?: number;
}

export const TaskCard = ({
  title,
  description,
  isCompleted = false,
  isNew = false,
  onAddNew,
  timeSaved = 0,
}: TaskCardProps) => {
  const price = timeSaved * 12; // 12€ per hour

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
        <p className="text-gray-600 mb-4">{description}</p>
        {!isNew && (
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
        )}
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