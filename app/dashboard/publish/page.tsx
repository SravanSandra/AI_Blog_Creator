import React, { useState } from "react";
import { useRouter } from "next/router";

const PublishPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handlePublish = async () => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Post published successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Publish Your Blog</h1>
      <input
        className="w-full p-2 border mb-4"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border mb-4"
        placeholder="Enter blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
};

export default PublishPage;
