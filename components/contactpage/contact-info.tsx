"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const dummyContactInfo = [
  {
    id: 1,
    title: "Address",
    value: "No. 1, Simbrella Street, Lagos, Nigeria",
  },
  {
    id: 2,
    title: "Email",
    value: "Email@simbrellang.com",
  },
  {
    id: 3,
    title: "Phone",
    value: "+234 123 4567",
  },
  {
    id: 4,
    title: "LinkedIn",
    value: "https://www.linkedin.com/company/simbrellang",
  },
];

export default function ContactInfoSection() {
  const [contactInfo, setContactInfo] = useState(dummyContactInfo);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    title: string;
    value: string;
  } | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const handleEditClick = (item: {
    id: number;
    title: string;
    value: string;
  }) => {
    setSelectedItem(item);
    setOpenEditDialog(true);
  };

  const handleAddNewClick = () => {
    setSelectedItem({ id: Date.now(), title: "", value: "" });
    setOpenEditDialog(true);
  };

  const handleInputChange = (field: "title" | "value", value: string) => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, [field]: value });
    }
  };

  const handleSave = () => {
    if (!selectedItem) return;

    setContactInfo((prev) => {
      const exists = prev.find((info) => info.id === selectedItem.id);
      if (exists) {
        return prev.map((info) =>
          info.id === selectedItem.id ? selectedItem : info
        );
      } else {
        return [...prev, selectedItem];
      }
    });

    setOpenEditDialog(false);
    setSelectedItem(null);
  };

  const confirmDelete = (id: number) => {
    setDeleteItemId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (deleteItemId !== null) {
      setContactInfo((prev) => prev.filter((info) => info.id !== deleteItemId));
      setDeleteItemId(null);
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="space-y-6 p-6 w-[960px]">
      <section>
        <h2 className="text-lg font-semibold">Manage Contact Information</h2>
        <div className="mt-4 space-y-4">
          {contactInfo.map((info) => (
            <div
              key={info.id}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{info.title}</span>
                <span className="text-sm text-gray-500">{info.value}</span>
              </div>
              <div className="flex gap-2">
                <Button variant={"edit"} onClick={() => handleEditClick(info)}>
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
                <Button
                  variant={"delete"}
                  onClick={() => confirmDelete(info.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Contact Info Button */}
        <div className="mt-6">
          <Button variant={"secondary"} onClick={handleAddNewClick}>
            <Plus className="w-4 h-4" />
            <span>Add New Contact Info</span>
          </Button>
        </div>
      </section>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.id &&
              contactInfo.find((c) => c.id === selectedItem.id)
                ? `Edit ${selectedItem?.title}`
                : "Add New Contact Info"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={selectedItem?.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Title (e.g. Facebook)"
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              value={selectedItem?.value || ""}
              onChange={(e) => handleInputChange("value", e.target.value)}
              placeholder="Value (e.g. https://facebook.com/yourpage)"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant={"secondary"}
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this contact info?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => setOpenDeleteDialog(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
