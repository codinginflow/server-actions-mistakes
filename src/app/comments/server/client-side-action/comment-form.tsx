"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { createComment } from "./actions";

export default function CommentForm() {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const response = await createComment({ text: input });
      if (response?.error) {
        setError(response.error);
        return;
      }
      startTransition(() => {
        setInput("");
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1"
          maxLength={100}
          disabled={isPending}
        />
        <Button type="submit" disabled={!input.trim() || isPending}>
          {isPending ? "Posting..." : "Post"}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
