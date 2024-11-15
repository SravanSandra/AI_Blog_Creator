import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const editorRef = useRef<any>(null);
  const [showShareOptions, setShowShareOptions] = useState(false); // State to toggle share options visibility

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <div className="flex gap-2">
          <Button onClick={() => navigator.clipboard.writeText(aiOutput)}>
            <Copy className="w-4 h-4" /> Copy
          </Button>
          <Button onClick={() => setShowShareOptions((prev) => !prev)}>
            <Share className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      {showShareOptions && (
        <div className="flex gap-2 p-3">
          <FacebookShareButton url={window.location.href} quote={aiOutput}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={aiOutput}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={window.location.href} summary={aiOutput}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      )}

      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
      />
    </div>
  );
}

export default OutputSection;
