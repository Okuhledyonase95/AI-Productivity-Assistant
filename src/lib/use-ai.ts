import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateAI } from "./ai.functions";
import { toast } from "sonner";

export function useAI() {
  const fn = useServerFn(generateAI);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function run(system: string, prompt: string) {
    setLoading(true);
    try {
      const res = await fn({
        data: { system, messages: [{ role: "user", content: prompt }] },
      });
      setOutput(res.content);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return { output, setOutput, loading, run };
}