import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { supabase } from "@/integrations/supabase/client";

interface AddTaskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AddTaskDialog = ({ onOpenChange, open }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [example, setExample] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);

    try {
      let exampleFileUrl = null;
      
      if (example) {
        const fileExt = example.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('task-files')
          .upload(filePath, example);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('task-files')
          .getPublicUrl(filePath);

        exampleFileUrl = publicUrl;
      }

      const { error } = await supabase.from('tasks').insert({
        title,
        description,
        submitter_name: name,
        submitter_email: email,
        example_file_url: exampleFileUrl,
        status: 'pending'
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Thank you, the task has been sent to AI and will be delivered shortly.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setName("");
        setEmail("");
        setExample(null);
        setSubmitted(false);
        if (onOpenChange) {
          onOpenChange(false);
        }
      }, 2000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit task. Please try again.",
        variant: "destructive",
      });
      setSubmitted(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExample(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Automation Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Extract Data from PDF"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Task Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to automate..."
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="example">Upload Example (Optional)</Label>
            <Input
              id="example"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitted}>
            {submitted ? "Task Sent to AI..." : "Send Task to AI"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};