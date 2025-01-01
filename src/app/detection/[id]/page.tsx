"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DETECTION_URL, SIGN_IN_URL } from "@/lib/constants";

const DetailPage: React.FC<{ params: { id: number } }> = ({ params }) => {
  const { isAuthenticated, fetchHistory, setDefaultPage } = useAuth();
  const [history, setHistory] = useState<any>();
  const [error, setError] = useState<any>(null);
  const [id, setId] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    // Unwrap params safely
    (async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    })();
  }, [params]);

  useEffect(() => {
    setDefaultPage(`${DETECTION_URL}/${id}`)
  }, []);

  useEffect(() => {
    if (id && id != -1) {
      const fetchData = async () => {
        try {
          const data = await fetchHistory(id);
          data.result = JSON.parse(data.result);
          setHistory(data);
        } catch (err) {
          setError("Failed to fetch history.");
          console.error(err);
        }
      };

      if (isAuthenticated) {
        fetchData();
      } else {
        router.push(SIGN_IN_URL); // Redirect to login if not authenticated
      }
    }
  }, [id, isAuthenticated]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col px-2 py-6 gap-3 text-black">
      {/* Header */}
      <div className="flex justify-center relative text-black">
        <button className="absolute left-0 ps-5" onClick={() => router.back()}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black">
            <path
              d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"
              fill="currentColor" />
          </svg>
        </button>
        <p className="text-black text-lg font-semibold">Diagnosis</p>
      </div>

      {/* Body */}
      <div className="px-5">
        {/* Image and Label */}
        <div className="flex flex-row items-start gap-4">
          <motion.img
            src={history?.imageUrl}
            alt={history?.disease?.name}
            className="rounded-2xl w-2/5 md:w-72 h-auto object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">{history?.disease?.name}</h2>
            <a target="_blank" 
              href={`${history?.disease?.url}`}
              className="text-blue-500"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Range Bars */}
        <div className="mt-6 space-y-4">
          <RangeBar label="Risk" percent={history?.disease?.risk} color="bg-green-400" />
          <RangeBar
            label="Certainty"
            percent={history?.result?.rep_skin_detection?.data.confidence}
            color="bg-blue-400"
          />
        </div>

        {/* Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <div className="text-gray-600 text-justify flex flex-col w-full gap-2 [&>figure]:mx-auto [&>figure]:flex [&>figure]:flex-col 
          [&>figure]:!w-full sm:[&>figure]:!w-1/2 
          [&>figure]:items-center 
          [&>ul]:list-disc [&>ul]:ps-5 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2" 
          dangerouslySetInnerHTML={{ __html: history?.disease?.description }}>
          </div>
        </div>

        {/* Advice */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Advice</h3>
          <div className="text-gray-600 text-justify flex flex-col w-full gap-2 [&>figure]:mx-auto [&>figure]:flex [&>figure]:flex-col 
          [&>figure]:!w-full sm:[&>figure]:!w-1/2  [&>figure]:items-center 
          [&>ul]:list-disc [&>ul]:ps-5 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2"
          dangerouslySetInnerHTML={{ __html: history?.advice }}>
          </div>
        </div>
      </div>
    </div>
  );
};

// Range Bar Component
const RangeBar: React.FC<{ label: string; percent: number; color: string }> = ({
  label,
  percent,
  color,
}) => {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <div className="relative w-full bg-gray-200 rounded-full h-4">
        <motion.div
          className={`h-4 rounded-full ${color}`}
          style={{ width: `${percent * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent * 100}%` }}
          transition={{ duration: 0.8 }}
        >
          {/* Text center */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
            {`${Math.round(percent * 100)}%`}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailPage;
