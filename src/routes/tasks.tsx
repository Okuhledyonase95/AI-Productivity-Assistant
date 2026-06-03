import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { useState } from "react";
import { ToolShell, Card } from "@/components/tool-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAI } from "@/lib/use-ai";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Aurora" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");
  const { output, setOutput, loading, run } = useAI();

  const plan = () => {
    const system = "You are an expert project planner. Break down goals into a prioritized, sequenced task list. Output markdown with sections: ## Overview, ## Milestones, ## Tasks (numbered, each with priority [High/Med/Low] and suggested time estimate).";
    const prompt = `Goal: ${goal}\nDeadline: ${deadline || "not specified"}\nContext: ${context || "none"}`;
    run(system, prompt);
  };

  return (
    <ToolShell
      title="AI Task Planner"
      description="Turn a goal into a prioritized, time-estimated action plan."
      icon={<ListChecks className="h-6 w-6" />}
    >
      <Card className="space-y-4">
        <div className="space-y-2">
          <Label>Goal</Label>
          <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Launch a customer feedback program" />
        </div>
        <div className="space-y-2">
          <Label>Deadline (optional)</Label>
          <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. End of Q3" />
        </div>
        <div className="space-y-2">
          <Label>Context (optional)</Label>
          <Textarea rows={4} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team size, constraints, tools available…" />
        </div>
        <Button onClick={plan} disabled={loading || !goal.trim()}>
          {loading ? "Planning…" : "Build plan"}
        </Button>
      </Card>

      <Card>
        <Label className="mb-2 block">Plan (editable)</Label>
        <Textarea
          rows={18}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Your task plan will appear here…"
          className="font-mono text-sm"
        />
      </Card>
    </ToolShell>
  );
}