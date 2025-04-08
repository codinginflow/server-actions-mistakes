"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/auth";
import { useState } from "react";
import { createComment } from "./actions";

export default function CommentForm() {
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      setIsPending(true);
      await createComment(input, user);
      setInput("");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsPending(false);
    }
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
