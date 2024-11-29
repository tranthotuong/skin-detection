"use client";

import React from "react";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <AuthProvider>
      <div className="text-white flex flex-col h-screen">
        <div className="w-full h-full">{children}</div>
      </div>
    </AuthProvider>
  );
}
