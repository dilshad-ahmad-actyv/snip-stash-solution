"use client";

import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import debounce from "lodash/debounce";
import {
  MagnifyingGlassIcon as SearchIcon,
  CodeBracketIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchQuery(value);
    }, 500),
    []
  );

  const { data: snippets, isLoading } = useQuery<Snippet[]>({
    queryKey: ["snippets", debouncedSearchQuery, selectedLanguage, selectedTag],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearchQuery) params.append("search", debouncedSearchQuery);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (selectedTag) params.append("tag", selectedTag);

      const response = await fetch(`/api/snippets?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch snippets");
      return response.json();
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search snippets..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {snippets?.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {snippet.title}
                  </h3>
                  {snippet.description && (
                    <p className="text-gray-600 text-sm">
                      {snippet.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => copyToClipboard(snippet.code)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <CodeBracketIcon className="h-4 w-4 mr-2" />
                  Copy
                </button>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <SyntaxHighlighter
                  language={snippet.language.toLowerCase()}
                  style={vs2015}
                  customStyle={{
                    padding: "1rem",
                    margin: 0,
                    borderRadius: "0.5rem",
                  }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <TagIcon className="h-4 w-4 text-gray-400" />
                {snippet.tags.map((tag) => (
                  <span
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.name)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {snippets?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No snippets found</p>
        </div>
      )}
    </div>
  );
}
