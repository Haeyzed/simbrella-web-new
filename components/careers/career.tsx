"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FaBriefcase } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

// Sample jobs
const jobs = [
  {
    id: 1,
    title: "Digital Marketing Intern (Hybrid)",
    status: "open",
  },
  {
    id: 2,
    title: "Digital Marketing Intern (Hybrid)",
    status: "closed",
  },
  {
    id: 3,
    title: "Digital Marketing Intern (Hybrid)",
    status: "open",
  },
];

export default function CareersTab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("open");

  const getFilteredJobs = () => {
    if (activeTab === "all") return jobs;
    return jobs.filter((job) => job.status === activeTab);
  };

  return (
    <div className="w-[960px] px-4 py-8">
      <Tabs defaultValue="open" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger
            value="all"
            className="text-gray-500 data-[state=active]:text-orange-500 cursor-pointer"
          >
            All Jobs
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="text-gray-500 data-[state=active]:text-orange-500 cursor-pointer"
          >
            Open Jobs
          </TabsTrigger>
          <TabsTrigger
            value="closed"
            className="text-gray-500 data-[state=active]:text-orange-500 cursor-pointer"
          >
            Closed Jobs
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4 w-3/5">
            {getFilteredJobs().map((job) => (
              <div
                key={job.id}
                className="bg-[#030133] text-white p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2 font-medium">
                    <FaBriefcase className="w-4 h-4 text-orange-500" />
                    {job.title}
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      job.status === "open" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {job.status === "open" ? "Open" : "Closed"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    router.push(
                      `/career-management/${job.id}?title=${encodeURIComponent(
                        job.title
                      )}&status=${job.status}`
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-orange-300 bg-white text-gray-700 hover:text-orange-500 transition group cursor-pointer"
                >
                  <span className="text-sm">View Application</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:-rotate-45" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button variant="secondary">Post New Job</Button>
      </div>
    </div>
  );
}
