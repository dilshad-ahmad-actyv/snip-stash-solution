"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
