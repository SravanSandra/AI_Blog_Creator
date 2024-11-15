"use client"
import React from 'react'
import { useState } from 'react';

interface PROPS {
    aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(aiOutput).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Show 'Copied' message for 2 seconds
        }).catch((error) => {
            console.error('Error copying text:', error);
        });
    };

    return (
        <div className="p-5 shadow-md border rounded-lg bg-white">
            <div>
                <h2 className='font-bold text-2xl mb-2 text-primary'>Generated Content</h2>
                <p className='text-gray-500'>{aiOutput}</p>
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={handleCopyClick} className="p-2 rounded-full bg-primary text-white">
                    Copy
                    {isCopied && <span className="text-xs ml-2 text-green-600">Copied!</span>}
                </button>
            </div>
        </div>
    )
}

export default OutputSection;
