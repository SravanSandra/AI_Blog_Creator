import { useState } from "react";
import { useRouter } from "next/router";

export default function PublishBlog({ blogId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const publishBlog = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: blogId }), // Pass the blog ID
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Blog published! View it at: /${data.slug}`);
                router.push(`/${data.slug}`); // Redirect to the published blog page
            } else {
                alert("Failed to publish blog");
            }
        } catch (error) {
            alert("An error occurred while publishing");
        }
        setLoading(false);
    };

    return (
        <div>
            <button
                onClick={publishBlog}
                disabled={loading}
            >
                {loading ? "Publishing..." : "Publish Blog"}
            </button>
        </div>
    );
}
