import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskDialog } from "@/components/AddTaskDialog";

const DEFAULT_TASKS = [
  {
    title: "Web Scraping",
    description: "Extract product data from e-commerce websites automatically",
    completed: true,
    timeSaved: 8,
  },
  {
    title: "PDF to Excel",
    description: "Convert PDF documents into organized Excel spreadsheets",
    completed: true,
    timeSaved: 4,
  },
  {
    title: "Email Processing",
    description: "Automatically categorize and respond to customer emails",
    completed: true,
    timeSaved: 6,
  },
  {
    title: "Data Cleaning",
    description: "Clean and standardize data from multiple sources",
    completed: true,
    timeSaved: 5,
  },
  {
    title: "Image Processing",
    description: "Batch process and optimize images for web use",
    completed: true,
    timeSaved: 3,
  },
  {
    title: "Report Generation",
    description: "Generate automated reports from database queries",
    completed: true,
    timeSaved: 7,
  },
  {
    title: "Social Media Analysis",
    description: "Analyze social media metrics and generate insights",
    completed: true,
    timeSaved: 6,
  },
  {
    title: "Document Classification",
    description: "Automatically categorize documents by content",
    completed: true,
    timeSaved: 5,
  },
  {
    title: "Data Migration",
    description: "Migrate data between different system formats",
    completed: true,
    timeSaved: 10,
  },
];

const Index = () => {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [customTasks, setCustomTasks] = useState<Array<{ title: string; description: string }>>([]);

  const handleAddTask = (task: { title: string; description: string }) => {
    setCustomTasks([...customTasks, task]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Automation Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your workflow with our AI-powered automation services. From data extraction to
            processing, we've got you covered.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskCard
            title="Add Custom Task"
            description="Have a specific automation need? Add your custom task here and let our AI handle it."
            isNew
            onAddNew={() => document.querySelector<HTMLButtonElement>('[role="dialog"] button')?.click()}
          />
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              description={task.description}
              isCompleted={task.completed}
              timeSaved={task.timeSaved}
            />
          ))}
          {customTasks.map((task, index) => (
            <TaskCard
              key={`custom-${index}`}
              title={task.title}
              description={task.description}
              isCompleted={false}
              timeSaved={0}
            />
          ))}
        </div>

        <AddTaskDialog onAdd={handleAddTask} />
      </div>
    </div>
  );
};

export default Index;