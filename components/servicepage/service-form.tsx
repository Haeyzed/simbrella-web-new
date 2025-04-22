"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/tiptap-texteditor";
import { useRouter } from "next/navigation";
import { ChevronLeft, FileImage } from "lucide-react";

export default function CreateServiceForm() {
  const router = useRouter();
  const isEdit = false;

  // State management
  const [image, setImage] = useState<File | null>(null);
  const [longTitle, setLongTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
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
      longTitle,
      shortTitle,
      shortDesc,
      longDesc,
    });

    // Submit to backend here
    // await yourApiCall({ image, longTitle, shortTitle, shortDesc, longDesc });

    setIsSubmitting(false);
  };

  return (
    <div className="w-full space-y-6 bg-[#EFF4FF] font-poppins">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="rounded-full cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" size={20} />
        </button>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Items on services page" : "Add New Service"}
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
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="mt-2 text-sm text-[#FF9B21] font-medium cursor-pointer"
            >
              Select file
            </label>
          </div>
        </div>

        {/* Titles */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">Long title*</label>
          <Input
            placeholder="Enter long title (e.g., Comprehensive Digital Marketing)"
            value={longTitle}
            onChange={(e) => setLongTitle(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">Short title*</label>
          <Input
            placeholder="Enter short title (e.g., Digital Marketing)"
            value={shortTitle}
            onChange={(e) => setShortTitle(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Short description*
          </label>
          <TiptapEditor
            content={shortDesc}
            onChange={(content) => setShortDesc(content)}
          />
        </div>

        {/* Long Description */}
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">
            Detailed description*
          </label>
          <TiptapEditor
            content={longDesc}
            onChange={(content) => setLongDesc(content)}
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
