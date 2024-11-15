"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  generatedContent: string;
  loading?: boolean; // Made optional
}

function OutputSection({ selectedTemplate, generatedContent, loading = false }: PROPS) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""; // Handle SSR

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      {/* @ts-ignore */}
      <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
      <h2 className="font-bold text-2xl mb-2 mt-4 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Generated Content</h3>
        <div className="border p-4 rounded bg-gray-100">{generatedContent}</div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={handleCopy} className="py-2 px-4">
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </Button>
        <div className="flex items-center gap-2">
          <FacebookShareButton url={shareUrl} quote={generatedContent}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={generatedContent}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} summary={generatedContent}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title={generatedContent}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>

      {loading && <Loader2Icon className="animate-spin mt-4 text-primary" />}
    </div>
  );
}

export default OutputSection;
