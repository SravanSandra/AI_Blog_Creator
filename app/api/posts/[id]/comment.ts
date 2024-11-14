// app/api/posts/[id]/comment.ts
import { NextResponse } from "next/server";
import { db } from "@/utils/db"; // Ensure this is the correct path to your db
import { posts } from "@/utils/schema"; // Ensure this is the correct path to your schema

export async function POST(req: Request) {
  const urlParts = req.url.split('/');
  const postId = urlParts[urlParts.length - 1];
  const { comment } = await req.json(); // Extract comment from request body

  if (!postId || !comment) {
    return NextResponse.json({ error: "Post ID and comment are required" }, { status: 400 });
  }

  // Add the comment to the post's comment array in the database
  await db.update(posts)
    .set({ comments: sql`array_append(comments, ${comment})` })
    .where(posts.id.eq(postId));

  return NextResponse.json({ message: "Comment added successfully" }, { status: 200 });
}
