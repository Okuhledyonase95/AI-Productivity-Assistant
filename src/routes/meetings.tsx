import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ToolShell, Card } from "@/components/tool-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAI } from "@/lib/use-ai";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Aurora" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const { output, setOutput, loading, run } = useAI();

  const summarize = () => {
    const system = "You are an expert meeting notetaker. Produce a clean markdown summary with sections: ## Summary, ## Key Decisions, ## Action Items (with owner if mentioned), ## Open Questions.";
    run(system, `Summarize the following meeting notes:\n\n${notes}`);
  };

  return (
    <ToolShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript and get a structured summary with action items."
      icon={<FileText className="h-6 w-6" />}
    >
      <Card className="space-y-4">
        <div className="space-y-2">
          <Label>Raw meeting notes / transcript</Label>
          <Textarea
            rows={10}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your notes or transcript here…"
          />
        </div>
        <Button onClick={summarize} disabled={loading || notes.trim().length < 20}>
          {loading ? "Summarizing…" : "Summarize"}
        </Button>
      </Card>

      <Card>
        <Label className="mb-2 block">Structured summary (editable)</Label>
        <Textarea
          rows={16}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Your summary will appear here…"
          className="font-mono text-sm"
        />
      </Card>
    </ToolShell>
  );
}