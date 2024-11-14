import { db } from "@/lib/drizzle";
import { posts } from "@/lib/schema";

// GET: Fetch all posts
export async function GET(req: Request) {
  const allPosts = await db.select().from(posts);
  return new Response(JSON.stringify(allPosts), { status: 200 });
}

// POST: Create a new post
export async function POST(req: Request) {
  const { title, content } = await req.json();

  const newPost = await db.insert(posts).values({
    title,
    content,
    likes: 0, // Set initial likes to 0
    comments: [], // Set initial comments to an empty array
  }).returning();

  return new Response(JSON.stringify(newPost), { status: 201 });
}

// POST: Like a post
export async function like(req: Request) {
  const postId = req.url.split("/").pop(); // Get the postId from the URL

  if (!postId) {
    return new Response("Post ID not provided", { status: 400 });
  }

  // Increment likes count by 1
  await db.update(posts)
    .set({ likes: db.raw("likes + 1") })
    .where(posts.id.equals(postId));

  return new Response("Post liked", { status: 200 });
}

// POST: Comment on a post
export async function comment(req: Request) {
  const postId = req.url.split("/").pop(); // Get the postId from the URL
  const { comment } = await req.json();

  if (!postId || !comment) {
    return new Response("Post ID or comment missing", { status: 400 });
  }

  // Add the comment to the post's comments array
  await db.update(posts)
    .set({ comments: db.raw("array_append(comments, ?)", comment) })
    .where(posts.id.equals(postId));

  return new Response("Comment added", { status: 200 });
}
