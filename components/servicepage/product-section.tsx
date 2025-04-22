"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ProductSectionTab() {
  const [products, setProducts] = useState<{ id: number; title: string; description?: string }[]>([
    { id: 1, title: "BNPL" },
    { id: 2, title: "Mobile Wallet" },
    { id: 3, title: "BNPL" },
    { id: 4, title: "BNPL" },
    { id: 5, title: "DaaS" },
    { id: 6, title: "DaaS" },
  ]);

  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddProduct = () => {
    if (!newProductTitle.trim()) return;

    setProducts([
      ...products,
      {
        id: products.length + 1,
        title: newProductTitle.trim(),
        description: newProductDescription.trim(),
      },
    ]);

    setNewProductTitle("");
    setNewProductDescription("");
    setDialogOpen(false);
  };

  return (
    <div className="lg:w-[960px] mx-auto py-10 px-4">
      <h2 className="text-lg font-semibold mb-6">Manage Our Product Section</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#2596FF] text-white font-medium hover:bg-[#1480e3] p-6 rounded-md flex items-center justify-center"
          >
            {product.title}
          </div>
        ))}
      </div>

      {/* Add New Product Button + Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="hover:bg-secondary bg-white text-secondary border-2 border-orange-200 hover:text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Enter product title"
              value={newProductTitle}
              onChange={(e) => setNewProductTitle(e.target.value)}
            />
            <Input
              placeholder="Enter product description/summary"
              value={newProductTitle}
              onChange={(e) => setNewProductDescription(e.target.value)}
            />

            <Button
              onClick={handleAddProduct}
              className="w-full bg-primary text-white"
            >
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
