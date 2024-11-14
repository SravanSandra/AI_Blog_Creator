import { useState } from 'react';

const LikeDislike = ({ slug }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = async () => {
        if (liked) return;

        const response = await fetch('/api/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, action: 'like' })
        });

        if (response.ok) {
            setLiked(true);
            console.log("Liked!");
        } else {
            console.error("Failed to like");
        }
    };

    const handleDislike = async () => {
        if (disliked) return;

        const response = await fetch('/api/like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, action: 'dislike' })
        });

        if (response.ok) {
            setDisliked(true);
            console.log("Disliked!");
        } else {
            console.error("Failed to dislike");
        }
    };

    return (
        <div>
            <button onClick={handleLike} disabled={liked}>Like</button>
            <button onClick={handleDislike} disabled={disliked}>Dislike</button>
        </div>
    );
};

export default LikeDislike;
