import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const TaskPreview = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleShare = async () => {
    // Mock social media sharing
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI Automation Services",
          text: "AI Automation Services just completed a task for me for free!",
          url: window.location.origin,
        });

        // Update share status
        const { error } = await supabase
          .from("tasks")
          .update({ has_shared: true })
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Shared successfully!",
          description: "You now have access to the full output.",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          "AI Automation Services just completed a task for me for free! " +
            window.location.origin
        )}`,
        "_blank"
      );
    }
  };

  const handlePayment = () => {
    // Mock payment for now
    toast({
      title: "Processing payment",
      description: "Payment of 5€ will be processed.",
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const canAccessOutput = task.has_shared || task.has_paid;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{task.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Output Preview</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                {canAccessOutput ? (
                  <p>{task.output_text}</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {task.output_text?.substring(0, 100)}...
                    </p>
                    <div className="border-t pt-4 space-y-4">
                      <p className="font-medium">
                        To access the full output, choose one of these options:
                      </p>
                      <div className="flex gap-4">
                        <Button
                          className="flex-1"
                          onClick={handleShare}
                          disabled={task.has_shared}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {task.has_shared
                            ? "Already Shared"
                            : "Share to Access (Free)"}
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={handlePayment}
                          disabled={task.has_paid}
                        >
                          Pay 5€ to Access
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {task.submitter_name && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Submitted by</h2>
                <p className="text-gray-600">{task.submitter_name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;