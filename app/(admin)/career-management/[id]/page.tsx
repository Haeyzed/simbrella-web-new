"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import jobImage from "@/public/images/jobImage.jpg"; // replace  with dynamic image
import {
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function JobDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const status = searchParams.get("status");

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* back navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          className="rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="7-5 w-7" size={25} />
        </button>
        <h1 className="text-2xl font-semibold">Career Management</h1>
      </div>

      <div className="bg-white p-6">
        {/* Top Section */}

        <h1 className="font-semibold text-lg mb-4">{title}</h1>
        <div className="flex justify-between items-start gap-8">
          <img
            src={jobImage.src}
            alt="Job"
            className="w-3/5 h-64 mb-10 object-cover rounded"
          />

          <div className="flex-1 space-y-4">
            <Button variant="secondary" className="px-16">Edit Job Post</Button>
            <p
              className={`text-sm font-bold pl-2 ${
                status === "open" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status === "open" ? "Open" : "Closed"}
            </p>
            <div className="text-sm space-y-1 pl-2 text-gray-600">
              <p>
                <strong>Job Views:</strong> 231
              </p>
              <p>
                <strong>Created:</strong> 19th November 2024
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex gap-10 text-font p-4 bg-gray-100 rounded">
          {/* Left: Description */}
          <div className="w-3/5 space-y-6 text-sm">
            <div>
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p className="text-font">
                Candidates will get a chance to learn important skills and gain
                professional experience by working on digital marketing
                campaigns with our team.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Students day to day:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Assist with social media campaigns</li>
                <li>Assist with email campaigns</li>
                <li>Assist with SEO</li>
                <li>Assist with development projects</li>
                <li>Proofread web content</li>
                <li>Collect and analyze marketing data</li>
                <li>Attend client meetings</li>
                <li>Manage and update company database</li>
                <li>Design and produce sales materials</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Ideal candidate skillset:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Studying Business, Marketing or related area</li>
                <li>Experience using Adobe Photoshop</li>
                <li>Strong communication skills</li>
                <li>Basic understanding of digital marketing</li>
                <li>Strong time management and organizational skills</li>
              </ul>
            </div>
          </div>

          {/* Right: Additional Info */}
          <div className="w-1/3 space-y-6">
            <div className="text-sm text-font space-y-2">
              <h4 className="font-semibold">Additional Work Information</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Remote/Hybrid</li>
                <li>No 22, SimbrellaNG street, Lagos</li>
                <li>Expected salary in Naira</li>
              </ul>
            </div>

            <div className="">
              <p className="text-sm font-semibold">Apply via email:</p>
              <a
                href="mailto:careers@thisbranding.com"
                className="text-blue-600 hover:underline text-sm"
              >
                careers@simbrellang.com
              </a>
            </div>

            <div className="flex gap-3 text-black text-xl">
              <FaXTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
