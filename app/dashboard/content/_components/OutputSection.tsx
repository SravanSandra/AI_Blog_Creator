import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import {
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  RedditIcon,
  TelegramIcon,
} from 'react-share';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

interface Props {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: Props) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const editorRef = useRef<any>(null); // Properly typed ref

  useEffect(() => {
    // Debug: Check if aiOutput is passed correctly
    console.log('Updated aiOutput:', aiOutput);

    // Safely set editor content if the instance exists
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput || ''); // Fallback to empty string
    }
  }, [aiOutput]); // Trigger this whenever aiOutput changes

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => navigator.clipboard.writeText(aiOutput)}
            className="flex gap-2"
          >
            <Copy className="w-4 h-4" /> Copy
          </Button>
          <Button onClick={() => setShowShareOptions(!showShareOptions)} className="flex gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      {showShareOptions && (
        <div className="p-3 flex justify-end gap-3">
          <TwitterShareButton url={window.location.href} title={aiOutput}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={window.location.href} title={aiOutput}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={window.location.href} subject="Check this out!" body={aiOutput}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <WhatsappShareButton url={window.location.href} title={aiOutput}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <RedditShareButton url={window.location.href} title={aiOutput}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TelegramShareButton url={window.location.href} title={aiOutput}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
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
};

export default OutputSection;
