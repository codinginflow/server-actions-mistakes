import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CommentForm from "./comment-form";
import CommentsList from "./comments-list";

export default async function Page() {
  return (
    <main className="mx-auto max-w-xl space-y-4 p-4">
      <Link
        href="/"
        className="text-primary flex items-center gap-2 text-sm hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h2 className="text-xl font-bold">Comments</h2>
      <CommentForm />
      <CommentsList />
    </main>
  );
}
