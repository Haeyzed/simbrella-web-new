"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

//tabs for contact management page
import CareerTab from "@/components/careers/career";
import Candidates from "@/components/careers/candidates";

export default function ContactManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("career");

  return (
    <div className="w-auto mt-10">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between space-y-6 bg-[#EFF4FF]">
          <div className="flex items-center gap-4">
            <button
              className="rounded-full cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft className="7-5 w-7" size={25} />
            </button>
            <h1 className="text-2xl font-semibold">Manage Careers</h1>
          </div>

        </div>

        {/* Tabs and Search */}
        <div className="px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-16">
            <div className="flex space-x-10">
              {["career", "candidate"].map((tabKey) => (
                <div key={tabKey} className="relative">
                  <button
                    className={`py-2 text-sm cursor-pointer ${
                      activeTab === tabKey
                        ? "text-font font-medium"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tabKey)}
                  >
                    {tabKey
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                  {activeTab === tabKey && (
                    <hr className="absolute bottom-0 left-0 w-1/2 rounded border-t-4 border-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white -mt-10">
            {activeTab === "career" && <CareerTab />}
            {activeTab === "candidate" && <Candidates />}
          </div>
        </div>
      </div>
    </div>
  );
}
