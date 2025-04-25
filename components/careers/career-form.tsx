"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/tiptap-texteditor";
import { useRouter } from "next/navigation";
import { ChevronLeft, FileImage } from "lucide-react";

export default function CareerForm() {
  const router = useRouter();
  const isEdit = false;

  const [image, setImage] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [dayToDayActivity, setDayToDayActivity] = useState("");
  const [skillSet, setSkillSet] = useState("");
  const [workType, setWorkType] = useState("");
  const [salary, setSalary] = useState("");
  const [benefits, setBenefits] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    console.log({
      image,
      jobTitle,
      dayToDayActivity,
      skillSet,
      workType,
      salary,
      benefits,
    });

    // Submit to backend here
    // await yourApiCall({ image, jobTitle, dayToDayActivity, skillSet, workType, salary, benefits });

    setIsSubmitting(false);
  };

  return (
    <div className="w-full space-y-6 bg-[#EFF4FF] font-poppins">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" size={20} />
        </button>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Job Posting" : "Create New Job"}
        </h1>
      </div>

      {/* Form Content */}
      <div className="bg-white lg:w-[955px] p-6">
        {/* Image Upload */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Upload Image*
          </label>
          <div className="border-2 border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center text-sm text-gray-500 cursor-pointer hover:bg-orange-50 transition-colors">
            <FileImage className="w-6 h-6 mb-2 text-orange-400" />
            <span>Click to upload or drag and drop</span>
            <p className="mt-2 text-xs">PNG, JPG (Max. 500kb)</p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="career-image-upload"
            />
            <label
              htmlFor="career-image-upload"
              className="mt-2 text-sm text-[#FF9B21] font-medium cursor-pointer"
            >
              Select file
            </label>
          </div>
        </div>

        {/* Job Title */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">Job Title*</label>
          <Input
            placeholder="Enter Job Title (e.g., Marketing Intern)"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Day to Day Activity */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Job Description / Activity (Day to Day)*
          </label>
          <TiptapEditor
            content={dayToDayActivity}
            onChange={(content) => setDayToDayActivity(content)}
          />
        </div>

        {/* Skillset */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Ideal Candidate Skillset*
          </label>
          <TiptapEditor
            content={skillSet}
            onChange={(content) => setSkillSet(content)}
          />
        </div>

        {/* Work Information Fields */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">Work Type*</label>
          <Input
            placeholder="Enter work type (e.g., Remote, Hybrid)"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Expected Salary Currency*
          </label>
          <Input
            placeholder="Enter salary (e.g., USD 2000/month)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Benefits & Others*
          </label>
          <Input
            placeholder="Enter benefits (e.g., Health Insurance, Gym Membership)"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            className="bg-white border-orange-200 text-gray-700 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          <Button
            className="bg-[#FF9B21] hover:bg-[#e88c1d] text-white"
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
