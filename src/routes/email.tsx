import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { ToolShell, Card } from "@/components/tool-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAI } from "@/lib/use-ai";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Aurora" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("professional");
  const { output, setOutput, loading, run } = useAI();

  const generate = () => {
    const system = "You are an expert business communication assistant. Write concise, well-structured emails with a clear subject line, greeting, body, and sign-off. Use plain text only.";
    const prompt = `Write an email.\nRecipient: ${recipient || "(unspecified)"}\nTone: ${tone}\nGoal / Context: ${purpose}\n\nReturn just the email, starting with "Subject:".`;
    run(system, prompt);
  };

  return (
    <ToolShell
      title="Smart Email Generator"
      description="Describe what you need and draft a polished email in seconds."
      icon={<Mail className="h-6 w-6" />}
    >
      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Recipient</Label>
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. My manager, client Sarah…" />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="apologetic">Apologetic</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>What's the email about?</Label>
          <Textarea
            rows={5}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. Request to reschedule Thursday's review meeting…"
          />
        </div>
        <Button onClick={generate} disabled={loading || !purpose.trim()}>
          {loading ? "Generating…" : "Generate email"}
        </Button>
      </Card>

      <Card>
        <Label className="mb-2 block">Draft (editable)</Label>
        <Textarea
          rows={14}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Your generated email will appear here…"
          className="font-mono text-sm"
        />
      </Card>
    </ToolShell>
  );
}