// app/api/posts/[id]/like.ts
import { NextResponse } from "next/server";
import { db } from "@/utils/db"; // Ensure this is the correct path to your db
import { posts } from "@/utils/schema"; // Ensure this is the correct path to your schema

export async function POST(req: Request) {
  // Extract the post ID from the URL
  const urlParts = req.url.split('/');
  const postId = urlParts[urlParts.length - 1]; 

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  // Increment the like count in the database
  await db.update(posts)
    .set({ likes: sql`likes + 1` })
    .where(posts.id.eq(postId));

  return NextResponse.json({ message: "Post liked successfully" }, { status: 200 });
}
