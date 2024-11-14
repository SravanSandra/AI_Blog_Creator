
import { useEffect, useState } from 'react';

const BlogPage = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { slug } = useRouter().query;  // Access the dynamic slug from the URL

    useEffect(() => {
        if (!slug) return; // Wait for slug

        async function fetchBlog() {
            try {
                const response = await fetch(`/api/getBlogBySlug?slug=${slug}`);
                if (response.ok) {
                    const blogData = await response.json();
                    setBlog(blogData);
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                setError('Failed to fetch blog');
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{blog?.formData}</h1>
            <div>{blog?.aiResponse}</div>
        </div>
    );
};

export default BlogPage;
