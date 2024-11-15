// outputsection.tsx
"use client"
import React from 'react'
import { FaShareAlt } from 'react-icons/fa/index.esm'; // You can choose your desired icon
import { useState } from 'react';

interface PROPS {
    aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {

    const [isCopied, setIsCopied] = useState(false);

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Generated Content',
                text: aiOutput,
                url: window.location.href,
            })
            .then(() => console.log('Content shared successfully'))
            .catch((error) => console.error('Error sharing content:', error));
        } else {
            // Fallback to copying the text if Web Share API is not available
            navigator.clipboard.writeText(aiOutput).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000); // Show 'Copied' message for 2 seconds
            }).catch((error) => {
                console.error('Error copying text:', error);
            });
        }
    };

    return (
        <div className="p-5 shadow-md border rounded-lg bg-white">
            <div>
                <h2 className='font-bold text-2xl mb-2 text-primary'>Generated Content</h2>
                <p className='text-gray-500'>{aiOutput}</p>
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={handleShareClick} className="p-2 rounded-full bg-primary text-white">
                    <FaShareAlt className="text-lg" />
                    {isCopied && <span className="text-xs ml-2 text-green-600">Copied!</span>}
                </button>
            </div>
        </div>
    )
}

export default OutputSection;
