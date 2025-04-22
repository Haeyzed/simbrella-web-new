"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import sampleImg from "@/public/images/aboutHeroImage.png"; // Replace with dynamic

export default function AboutSection() {
  const [isEditBannerOpen, setEditBannerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    title: string;
    description: string;
    datePublished: string;
    image: StaticImageData;
  } | null>(null);
  const [isEditItemOpen, setEditItemOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const aboutItems = [
    {
      id: 1,
      title: "Who we are",
      description:
        "Simbrella is a technology solutions company with a focus on developing digital products and services...",
      datePublished: "2024-04-20",
      image: sampleImg,
    },
    {
      id: 2,
      title: "Our Mission",
      description:
        "Simbrella designs and delivers software platforms tailored to meet various business needs...",
      datePublished: "2024-04-20",
      image: sampleImg,
    },
    {
      id: 3,
      title: "Our Vision",
      description:
        "We aim to empower customers through intuitive, scalable, and mobile-first solutions...",
      datePublished: "2024-04-20",
      image: sampleImg,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* === Banner Section === */}
      <section>
        <p className="text-sm font-medium mt-1">Banner Image</p>
        <div className="mt-2 mb-16 relative w-full max-w-4xl">
          <Image src={sampleImg} alt="Banner" className="w-full rounded-md" />
          <button
            onClick={() => setEditBannerOpen(true)}
            className=" flex space-x-2 absolute top-3 right-3 px-3 py-2 text-xs rounded-lg border-2 bg-white border-orange-200 hover:bg-secondary hover:text-white cursor-pointer"
          >
            <Pencil className="w-4 h-4" /> <span>Edit Image</span>
          </button>
        </div>
      </section>

      {/* === About Items === */}
      <div className="space-y-6">
        {aboutItems.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex items-start gap-6">
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-md"
              />

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Published{" "}
                  {format(new Date(item.datePublished), "do MMM yyyy")}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setEditItemOpen(true);
                  }}
                  className="flex space-x-2 text-xs px-3 py-2 bg-gray-100 border-1 border-orange-200 rounded-lg hover:bg-secondary hover:text-white cursor-pointer"
                >
                  <Pencil className="w-4 h-4" /> <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setDeleteConfirmOpen(true);
                  }}
                  className="flex space-x-2 text-xs px-3 py-2 bg-grey-100 border-1 border-orange-200 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            {index !== aboutItems.length - 1 && (
              <hr className="border-gray-200" />
            )}
          </div>
        ))}
      </div>

      {/* === Edit Banner Dialog === */}
      <Dialog open={isEditBannerOpen} onOpenChange={setEditBannerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Banner Image</DialogTitle>
          </DialogHeader>
          <input
            type="file"
            accept="image/*"
            className="w-full p-4 border-2 border-dashed border-orange-300 rounded hover:bg-orange-50 cursor-pointer"
          />
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setEditBannerOpen(false)}
              className="text-sm px-3 py-1 rounded bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button className="text-sm px-3 py-1 rounded bg-secondary text-white cursor-pointer">
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* === Edit Item Dialog === */}
      <Dialog open={isEditItemOpen} onOpenChange={setEditItemOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit About Item</DialogTitle>
          </DialogHeader>

          {/* Title Input */}
          <input
            type="text"
            defaultValue={selectedItem?.title}
            className="w-full mb-3 border border-gray-300 rounded p-2"
            placeholder="Title"
          />

          {/* Image Preview */}
          {selectedItem?.image && (
            <div className="mb-3">
              <p className="text-sm mb-1">Current Image</p>
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-48 object-cover rounded-md"
              />
            </div>
          )}

          {/* Optionally: Image Upload Input (optional if editing image is supported) */}
          <input
            type="file"
            accept="image/*"
            className="w-full mb-3 border-2 border-dashed border-orange-300 rounded p-2 cursor-pointer hover:bg-orange-50"
          />

          {/* Description Input */}
          <textarea
            defaultValue={selectedItem?.description}
            className="w-full min-h-[120px] border border-gray-300 rounded p-2"
            placeholder="Description"
          />

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setEditItemOpen(false)}
              className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button className="px-3 py-1 bg-secondary text-white rounded cursor-pointer">
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


