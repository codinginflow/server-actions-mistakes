"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { createCommentSchema, CreateCommentValues } from "../../schema";

export async function createComment(
  input: CreateCommentValues
): Promise<{ error: string } | undefined> {
  try {
    // Artificial delay to pretend we're connecting to the DB
    await delay(700);

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw Error("Unauthorized");
    }

    const { text } = createCommentSchema.parse(input);

    if (text.includes("Java")) {
      return { error: "No profanity allowed" };
    }

    await db.createComment({
      text,
      user: currentUser,
    });

    revalidatePath("/comments/server/client-side-action");
  } catch (error) {
    console.error(error);
    return { error: "Failed to create comment" };
  }
}
