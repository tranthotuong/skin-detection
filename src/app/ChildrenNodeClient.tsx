"use client";

import React from "react";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { useAuth } from "@/context/AuthContext";
import CameraAndUpload from "@/components/camera-and-upload/page";

export default function ChildrenNodeClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isCamera } = useAuth();

    return (
        <>
            {
                isCamera ? (
                    <CameraAndUpload />
                ) : (
                    <div className="w-full h-full">{children}</div>
                )
            }
        </>
    );
}
