// pages/dashboard/blogs.tsx

import { useEffect, useState } from 'react';

const PublishedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch('/api/getPublishedBlogs');
            const data = await response.json();
            setBlogs(data);
            setLoading(false);
        }

        fetchBlogs();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Published Blogs</h1>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.formData}</h2>
                    <a href={`/${blog.slug}`}>Read Blog</a>
                </div>
            ))}
        </div>
    );
};

export default PublishedBlogs;
