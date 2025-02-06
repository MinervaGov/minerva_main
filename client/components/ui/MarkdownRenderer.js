"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-xl font-bold text-white mb-4" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-lg font-semibold text-white mb-3" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-base font-medium text-white mb-2" {...props} />
        ),
        p: ({ ...props }) => <p className="text-gray-300 mb-3" {...props} />,
        ul: ({ ...props }) => (
          <ul className="list-disc pl-5 text-gray-300 mb-3" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-5 text-gray-300 mb-3" {...props} />
        ),
        li: ({ ...props }) => <li className="mb-1" {...props} />,
        strong: ({ ...props }) => (
          <strong className="font-bold text-white" {...props} />
        ),
        em: ({ ...props }) => (
          <em className="italic text-gray-400" {...props} />
        ),
        code: ({ ...props }) => (
          <code
            className="bg-gray-700 text-gray-200 px-1 py-0.5 rounded text-sm"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
