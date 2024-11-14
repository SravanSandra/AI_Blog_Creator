import { db } from "@/lib/drizzle";
import { posts } from "@/lib/schema";

export async function POST(req: Request) {
  const { title, content } = await req.json();
  
  const newPost = await db.insert(posts).values({
    title,
    content,
  }).returning();

  return new Response(JSON.stringify(newPost), { status: 201 });
}
