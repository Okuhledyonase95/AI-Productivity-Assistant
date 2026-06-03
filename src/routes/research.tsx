import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { ToolShell, Card } from "@/components/tool-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAI } from "@/lib/use-ai";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Aurora" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("brief");
  const { output, setOutput, loading, run } = useAI();

  const research = () => {
    const system = `You are a rigorous research analyst. Provide ${depth === "brief" ? "a concise 1-page" : "an in-depth"} structured briefing in markdown with sections: ## Overview, ## Key Points, ## Considerations / Trade-offs, ## Suggested Next Steps. Be neutral, note when claims are uncertain, and do not fabricate statistics.`;
    run(system, `Research topic: ${topic}`);
  };

  return (
    <ToolShell
      title="AI Research Assistant"
      description="Get a structured briefing on any workplace topic, with clear next steps."
      icon={<Search className="h-6 w-6" />}
    >
      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <div className="space-y-2">
            <Label>Topic or question</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Best practices for async standups" />
          </div>
          <div className="space-y-2">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief</SelectItem>
                <SelectItem value="deep">In-depth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={research} disabled={loading || !topic.trim()}>
          {loading ? "Researching…" : "Run research"}
        </Button>
      </Card>

      <Card>
        <Label className="mb-2 block">Briefing (editable)</Label>
        <Textarea
          rows={18}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Your briefing will appear here…"
          className="font-mono text-sm"
        />
      </Card>
    </ToolShell>
  );
}