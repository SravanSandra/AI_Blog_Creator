import { useState } from "react";

interface PublishBlogProps {
    blogId: number;
}

const PublishBlog: React.FC<PublishBlogProps> = ({ blogId }) => {
    const [isPublished, setIsPublished] = useState<boolean>(false);

    const handlePublish = async () => {
        try {
            const response = await fetch('/api/publish', {
                method: 'POST',
                body: JSON.stringify({ id: blogId }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                setIsPublished(true);
                alert(`Blog published! You can view it at: /${data.slug}`);
            } else {
                alert("Failed to publish blog");
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("An error occurred while publishing the blog.");
        }
    };

    return (
        <div>
            <button onClick={handlePublish} disabled={isPublished}>
                {isPublished ? "Published" : "Publish Blog"}
            </button>
        </div>
    );
};

export default PublishBlog;
