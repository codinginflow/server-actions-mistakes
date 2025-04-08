import { User } from "@/lib/auth";
import { formatRelativeDate } from "@/lib/utils";

interface CommentProps {
  comment: {
    id: number;
    text: string;
    createdAt: string;
    user: User;
  };
}

export function Comment({ comment }: CommentProps) {
  return (
    <div className="bg-card flex gap-3 rounded-lg border p-3">
      <div className="flex-shrink-0">
        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
          {comment.user.avatar}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <p className="font-medium">{comment.user.name}</p>
          <span className="text-muted-foreground text-xs">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <div className="text-muted-foreground mt-1 break-all">
          {comment.text}
        </div>
      </div>
    </div>
  );
}
