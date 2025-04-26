import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SnippetList from "@/components/SnippetList";

export const metadata: Metadata = {
  title: "SnipStash - Your Code Snippet Manager",
  description:
    "Organize and manage your code snippets with smart categorization",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Link
          href="/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Snippet
        </Link>
      </div>
      <SnippetList />
    </main>
  );
}
