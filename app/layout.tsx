import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const headersList = headers();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
