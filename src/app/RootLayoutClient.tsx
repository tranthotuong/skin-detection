"use client";

import React from "react";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { AuthProvider } from "@/context/AuthContext";
import ChildrenNodeClient from "./ChildrenNodeClient";

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
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().then(() => {
            console.log("Service Worker unregistered successfully.");
          });
        });
      });
    }
  }, []);

  return (
    <AuthProvider>
      <div className="text-white flex flex-col h-screen">
        <ChildrenNodeClient>{children}</ChildrenNodeClient>
      </div>
    </AuthProvider>
  );
}
