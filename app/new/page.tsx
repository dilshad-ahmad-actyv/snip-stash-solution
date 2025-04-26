import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NewSnippetForm from "@/components/NewSnippetForm";

export default async function NewSnippetPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Snippet</h1>
        <NewSnippetForm />
      </div>
    </main>
  );
}
