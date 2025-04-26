"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center px-2 py-2 text-gray-900 hover:text-blue-600"
            >
              <span className="text-xl font-bold">SnipStash</span>
            </Link>
          </div>

          <div className="flex items-center">
            {session ? (
              <>
                <Link
                  href="/new"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/new"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  New Snippet
                </Link>
                <button
                  onClick={() => signOut()}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/auth/login"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/auth/register"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
