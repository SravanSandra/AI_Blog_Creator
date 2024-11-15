import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy, Share2 } from 'lucide-react'; // Share2 is the share icon
import { Button } from '@/components/ui/button';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

interface Props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button
          className="flex gap-2"
          onClick={() => navigator.clipboard.writeText(aiOutput)}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <div className="flex gap-3 p-5">
        {/* Social Media Share Buttons */}
        <FacebookShareButton url={window.location.href} quote={aiOutput} className="text-blue-600">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} title={aiOutput} className="text-blue-400">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={window.location.href} title={aiOutput} className="text-blue-700">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  );
}

export default OutputSection;
