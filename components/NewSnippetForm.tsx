"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Swift",
  "Kotlin",
  "SQL",
  "HTML",
  "CSS",
  "Shell",
  "Other",
];

export default function NewSnippetForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      code: formData.get("code") as string,
      language: formData.get("language") as string,
      description: formData.get("description") as string,
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create snippet");
      }

      router.refresh();
      router.push("/");
    } catch (err) {
      setError("Failed to create snippet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter snippet title"
        />
      </div>

      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Code
        </label>
        <textarea
          name="code"
          id="code"
          rows={8}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono"
          placeholder="Paste your code here"
        />
      </div>

      <div>
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700"
        >
          Language
        </label>
        <select
          name="language"
          id="language"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang.toLowerCase()}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Add a description (optional)"
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter tags separated by commas (optional)"
        />
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Snippet"}
        </button>
      </div>
    </form>
  );
}
