"use server";

import { User } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createComment(text: string, user: User) {
  // Artificial delay to pretend we're writing to the DB
  await delay(700);
  await db.createComment({
    text,
    user,
  });

  revalidatePath("/comments/server/client-side-action");
}
