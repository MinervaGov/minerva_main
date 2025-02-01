"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const CopyToClipboard = ({ text, iconSize = 16, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });

    toast.success("Copied to clipboard");
  };

  return (
    <div>
      {copied ? (
        <Check size={iconSize} className="text-green-500" />
      ) : (
        <Copy
          onClick={handleCopy}
          size={iconSize}
          className={`cursor-pointer ${className}`}
        />
      )}
    </div>
  );
};

export default CopyToClipboard;
