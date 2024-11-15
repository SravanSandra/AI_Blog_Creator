import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import {
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TelegramShareButton
} from 'react-share'; // Import from react-share
import {
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  RedditIcon,
  TelegramIcon
} from 'react-share'; // Import the icons

interface Props {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: Props) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

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

      {/* Show Share Options when the button is clicked */}
      {showShareOptions && (
        <div className="p-3">
          <div className="flex gap-3">
            {/* Twitter Share Button */}
            <TwitterShareButton url={window.location.href} title={aiOutput}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            
            {/* LinkedIn Share Button */}
            <LinkedinShareButton url={window.location.href} title={aiOutput}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            
            {/* Email Share Button */}
            <EmailShareButton url={window.location.href} subject="Check this out!" body={aiOutput}>
              <EmailIcon size={32} round />
            </EmailShareButton>

            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={window.location.href} title={aiOutput}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            {/* Reddit Share Button */}
            <RedditShareButton url={window.location.href} title={aiOutput}>
              <RedditIcon size={32} round />
            </RedditShareButton>

            {/* Telegram Share Button */}
            <TelegramShareButton url={window.location.href} title={aiOutput}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputSection;
