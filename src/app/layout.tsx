import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Source_Sans_3 } from 'next/font/google';
import { Theme } from "@radix-ui/themes";

import RootLayoutClient from "./RootLayoutClient";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sourceSans = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: "/web.manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background antialiased !${sourceSans.className}`}
      >
        <Theme>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Theme>
      </body>
    </html>
  );
}
