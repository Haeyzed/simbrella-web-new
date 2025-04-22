"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProductSection } from "@/actions/sections";
import type { ProductSection } from "@/types/api";
import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { ProductSectionForm } from "@/components/homepage/product-section-form";
import { DrawerAlertDialog } from "@/components/ui/drawer-alert-dialog";
import { PiPencilSimpleLineBold, PiTrash } from "react-icons/pi";

interface ProductSectionTabProps {
  products: ProductSection[];
  canEdit: boolean;
  onUpdate: () => void;
}

export function ProductSectionTab({
  products,
  canEdit,
  onUpdate,
}: ProductSectionTabProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductSection | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (product: ProductSection) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (productId: number) => {
    try {
      const response = await deleteProductSection(productId);

      if (response.success) {
        toast("Success", {
          description: "Product deleted successfully",
        });
        onUpdate();
      } else {
        toast("Error", {
          description: response.error || "Failed to delete product",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast("Error", {
        description: "Failed to delete product",
      });
    }
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    onUpdate();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No products found
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-[#2D2D8D] text-white rounded-md p-6"
            >
              <div className="flex flex-col gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">
                    {product.title || "Daas"}
                  </h3>
                  <p className="text-sm">
                    {product.summary ||
                      "Data as a service is a complex approach aimed at monetization of MNO's Big Data relying on advanced techniques in analyzing telco usage. A user friendly and fast ecosystem is built for various providers of goods and services be equipped with access to valuable data for making lending decisions."}
                  </p>
                </div>

                <div className="flex items-start justify-between">
                  {canEdit && (
                    <div className="flex gap-2 mx-auto mt-4">
                      <button
                        className="flex text-xs items-center space-x-3 px-3 py-2 bg-white border-[1px] border-orange-200 hover:bg-secondary text-gray-800 hover:text-white rounded-lg cursor-pointer"
                        onClick={() => handleEdit(product)}
                      >
                        <PiPencilSimpleLineBold />
                        Edit
                      </button>
                      <button className="flex text-xs items-center space-x-3 px-3 py-2 bg-white border-[1px] border-orange-200 hover:bg-red-700 text-gray-800 hover:text-white rounded-lg cursor-pointer">
                        <PiTrash />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {canEdit && (
        <DrawerDialog
          trigger={
            <Button className="bg-secondary hover:bg-[#e88c1d] text-white cursor-pointer mt-4 mb-6">
              Add New Product
            </Button>
          }
          title="Add New Product"
          description="Create a new product to display on the homepage"
          open={isEditDialogOpen && !selectedProduct}
          onOpenChange={(open) => {
            if (!selectedProduct) setIsEditDialogOpen(open);
          }}
        >
          <ProductSectionForm onSuccess={handleEditSuccess} />
        </DrawerDialog>
      )}

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <DrawerDialog
          trigger={<></>}
          title="Edit Product"
          description="Update product details"
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <ProductSectionForm
            product={selectedProduct}
            onSuccess={handleEditSuccess}
          />
        </DrawerDialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedProduct && (
        <DrawerAlertDialog
          trigger={<></>}
          title="Delete Product"
          description={`Are you sure you want to delete "${selectedProduct.title}"? This action cannot be undone.`}
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={() => {
            handleDelete(selectedProduct.id);
            setIsDeleteDialogOpen(false);
          }}
          variant="destructive"
        />
      )}
    </div>
  );
}
