"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateComment } from "./use-comments-hooks";

export default function CommentForm() {
  const [input, setInput] = useState("");

  const mutation = useCreateComment();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    mutation.mutate(
      { text: input },
      {
        onSuccess: () => {
          setInput("");
        },
      }
    );
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
          disabled={mutation.isPending}
        />
        <Button type="submit" disabled={!input.trim() || mutation.isPending}>
          {mutation.isPending ? "Posting..." : "Post"}
        </Button>
      </div>
      {mutation.error && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </form>
  );
}
