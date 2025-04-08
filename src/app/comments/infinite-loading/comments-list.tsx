"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Comment } from "../comment";
import { useComments } from "./use-comments-hooks";

export default function CommentsList() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComments();

  const comments = data?.pages.flatMap((page) => page.comments);

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div className="space-y-4">
      {comments && comments.length > 0 && (
        <>
          <div className="space-y-3">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>

          <div className="my-4 flex justify-center">
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2"
              >
                {isFetchingNextPage ? "Loading more..." : "Load more comments"}
              </Button>
            )}
          </div>
        </>
      )}
      {!isError && !comments?.length && (
        <div className="text-center">No comments yet.</div>
      )}
      {isError && (
        <div className="text-center text-red-500">
          Error loading comments: {error.message}
        </div>
      )}
    </div>
  );
}
