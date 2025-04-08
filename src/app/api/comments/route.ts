import { Comment } from "@/lib/data";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export type GetCommentsResponse = {
  comments: Comment[];
  nextCursor?: number;
};

export async function GET(request: NextRequest) {
  const cursorParam = request.nextUrl.searchParams.get("cursor");
  const cursor = cursorParam ? parseInt(cursorParam) : undefined;

  const pageSize = 5;

  // Artificial delay to pretend we're connecting to the database
  await delay(4000);

  // Below is identical to how I do pagination with Prisma ORM
  const comments = await db.findComments({
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    sort: "desc",
  });

  const nextCursor =
    comments.length > pageSize ? comments[pageSize].id : undefined;

  const response: GetCommentsResponse = {
    comments: comments.slice(0, pageSize),
    nextCursor,
  };

  return NextResponse.json(response);
}
