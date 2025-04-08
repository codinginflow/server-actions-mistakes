import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Comment } from "../../comment";
import CommentForm from "./comment-form";

export default function Page() {
  return (
    <main className="mx-auto max-w-xl space-y-4 p-4">
      <Link
        href="/"
        className="text-primary hover:underline text-sm flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h2 className="text-xl font-bold">Comments</h2>
      <CommentForm />
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <CommentsList />
      </Suspense>
    </main>
  );
}

async function CommentsList() {
  // Artificial delay to pretend we're fetching from a database
  await delay(2000);

  const comments = await db.findComments({
    take: 10,
    sort: "desc",
  });

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
