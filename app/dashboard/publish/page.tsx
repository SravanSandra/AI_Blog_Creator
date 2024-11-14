'use client';

import React, { useState } from 'react';

const PublishPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle the publish action, e.g., send data to an API
        console.log('Publishing:', { title, content });
    };

    return (
        <div>
            <h1>Publish Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Publish</button>
            </form>
        </div>
    );
};

export default PublishPage;

