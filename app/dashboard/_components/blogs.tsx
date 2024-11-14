/import { useState } from "react";
import PublishBlog from "../components/PublishBlog"; // Import the PublishBlog component

export default function BlogCreationPage() {
    const [blogId, setBlogId] = useState(1); // Replace with the actual blog ID after creation

    return (
        <div>
            <h1>Create Blog</h1>
            {/* Display blog data here */}
            {/* Assuming you already have form data or content for the blog */}
            <PublishBlog blogId={blogId} /> {/* Pass the blog ID here */}
        </div>
    );
}
