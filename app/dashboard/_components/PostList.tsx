// app/dashboard/_components/PostList.tsx
import React, { useState, useEffect } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts from the backend
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
    });
    // Optionally, update the local state to reflect the like
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = async (postId: string, comment: string) => {
    await fetch(`/api/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });
    // Optionally, update the local state to reflect the new comment
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const handleShare = (post: any) => {
    // Implement social media sharing functionality (using navigator.share or a sharing library)
    navigator.share({
      title: post.title,
      text: post.content,
      url: window.location.href,
    });
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <div className="flex gap-4 mt-4">
            <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
            <button onClick={() => handleComment(post.id, "Great post!")}>Comment</button>
            <button onClick={() => handleShare(post)}>Share</button>
          </div>
          <div className="mt-4">
            {post.comments.map((comment: string, idx: number) => (
              <p key={idx}>{comment}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
