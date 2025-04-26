"use client";

import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags: { id: string; name: string }[];
}

export default function SnippetList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const { data: snippets, isLoading } = useQuery<Snippet[]>({
    queryKey: ["snippets", searchQuery, selectedLanguage, selectedTag],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (selectedTag) params.append("tag", selectedTag);

      const response = await fetch(`/api/snippets?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch snippets");
      return response.json();
    },
  });

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search snippets..."
          className="flex-1 p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
          <option value="bash">Bash</option>
        </select>
      </div>

      <div className="grid gap-6">
        {snippets?.map((snippet) => (
          <div
            key={snippet.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{snippet.title}</h3>
                <p className="text-gray-600">{snippet.description}</p>
              </div>
              <button
                onClick={() => copyToClipboard(snippet.code)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
            </div>

            <div className="mb-4">
              <SyntaxHighlighter
                language={snippet.language.toLowerCase()}
                style={vs2015}
                customStyle={{ padding: "1rem", borderRadius: "0.5rem" }}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>

            <div className="flex gap-2 flex-wrap">
              {snippet.tags.map((tag) => (
                <span
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.name)}
                  className="px-2 py-1 text-sm bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
