"use client";

import type * as React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/tiptap-texteditor";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import type { BlogPost } from "@/types/api";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BlogFormProps {
  blogPost?: BlogPost;
  isEdit?: boolean;
}

export function BlogForm({ blogPost, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    blogPost?.banner_image_url || null
  );
  const [relatedImages, setRelatedImages] = useState<File[]>([]);
  const [relatedImagesPreview, setRelatedImagesPreview] = useState<string[]>(
    blogPost?.images?.map((img) => img.image_url) || []
  );
  const [editorContent, setEditorContent] = useState(blogPost?.body || "");

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const relatedImagesInputRef = useRef<HTMLInputElement>(null);

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRelatedImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setRelatedImages((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setRelatedImagesPreview((prev) => [
            ...prev,
            event.target?.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent, type: "banner" | "related") => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-[#FF9B21]");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-[#FF9B21]");
  };

  const handleDrop = (e: React.DragEvent, type: "banner" | "related") => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-[#FF9B21]");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (type === "banner") {
        const file = e.dataTransfer.files[0];
        setBannerImage(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          setBannerImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const files = Array.from(e.dataTransfer.files);
        setRelatedImages((prev) => [...prev, ...files]);

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            setRelatedImagesPreview((prev) => [
              ...prev,
              event.target?.result as string,
            ]);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    status: "draft" | "published"
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      if (bannerImage) {
        formData.set("banner_image", bannerImage);
      }

      if (relatedImages.length > 0) {
        relatedImages.forEach((file) => {
          formData.append("related_images[]", file);
        });
      }

      formData.set("body", editorContent);
      formData.set("status", status);

      let response;
      if (isEdit && blogPost) {
        response = await updateBlogPost(blogPost.id, null, formData);
      } else {
        response = await createBlogPost(null, formData);
      }

      if (response.success) {
        toast("Success", {
          description:
            response.message ||
            `Blog post ${isEdit ? "updated" : "created"} successfully`,
        });
        router.push("/blog-management");
      } else {
        toast("Error", {
          description:
            response.message ||
            `Failed to ${isEdit ? "update" : "create"} blog post`,
        });
      }
    } catch (error) {
      console.error(
        `Error ${isEdit ? "updating" : "creating"} blog post:`,
        error
      );
      toast("Error", {
        description: `Failed to ${isEdit ? "update" : "create"} blog post`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    toast("Preview", {
      description: "Preview functionality not implemented yet",
    });
  };

  return (
    <div className="w-full space-y-6 bg-[#EFF4FF] font-poppins">
      <div className="flex flex-col space-y-6 mt-10">
        <div className="flex items-center gap-4">
          <button className="rounded-full" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" size={20} />
          </button>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Blog Post" : "Add New Posts"}
          </h1>
        </div>
        <div className="bg-white lg:w-[955px] p-6">
          <form onSubmit={(e) => handleSubmit(e, "published")}>
            {/* Banner Image Upload */}
            <div className="mb-6 w-3/5">
              <label className="block text-sm font-medium mb-2">
                Up Load Banner image*
              </label>
              <div
                className={`h-20 border-2 border-dashed border-orange-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors`}
                onDragOver={(e) => handleDragOver(e, "banner")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "banner")}
                onClick={() => bannerInputRef.current?.click()}
              >
                {bannerImagePreview ? (
                  <div className="relative w-full">
                    <Image
                      src={bannerImagePreview || "/placeholder.svg"}
                      alt="Banner preview"
                      className="max-h-48 mx-auto object-contain"
                      width={400}
                      height={200}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 mx-auto flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBannerImage(null);
                        setBannerImagePreview(null);
                      }}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-[#FF9B21] mb-2" />
                    <p className="text-[#FF9B21] font-medium">Upload a file</p>
                    <p className="text-gray-500 text-sm">or drag and drop</p>
                  </>
                )}
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerImageChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">not more than 500kb</p>
            </div>

            {/* Story Title */}
            <div className="mb-6 w-3/5">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Story title*
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={blogPost?.title || ""}
                required
                className="w-full border-gray-300 rounded-md"
                placeholder="Enter your story title"
              />
            </div>

            {/* Sub-title */}
            <div className="mb-6 w-3/5">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium mb-2"
              >
                Sub-title
              </label>
              <Input
                id="subtitle"
                name="subtitle"
                defaultValue={blogPost?.subtitle || ""}
                className="w-full border-gray-300 rounded-md"
                placeholder="Enter your story sub-title"
              />
            </div>

            {/* Story Body with Tiptap Editor */}
            <div className="mb-6 w-3/5">
              <label htmlFor="body" className="block text-sm font-medium mb-2">
                Story body*
              </label>
              <div className="border border-gray-300 rounded-md">
                <TiptapEditor
                  content={editorContent}
                  onChange={(content) => setEditorContent(content)}
                />
              </div>
            </div>

            {/* Related Images */}
            <div className="mb-6 w-3/5">
              <label className="block text-sm font-medium mb-2">
                Upload other Related Images Image (optional)
              </label>
              <div
                className={`h-20 border-2 border-dashed border-orange-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors`}
                onDragOver={(e) => handleDragOver(e, "related")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "related")}
                onClick={() => relatedImagesInputRef.current?.click()}
              >
                {relatedImagesPreview.length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {relatedImagesPreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={preview || "/placeholder.svg"}
                            alt={`Related image ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                            width={100}
                            height={100}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRelatedImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                              setRelatedImagesPreview((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mx-auto flex items-center"
                    >
                      Add More Images
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-[#FF9B21] mb-2" />
                    <p className="text-[#FF9B21] font-medium">Upload a file</p>
                    <p className="text-gray-500 text-sm">or drag and drop</p>
                  </>
                )}
                <input
                  ref={relatedImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleRelatedImagesChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Note : minimum of 5 images not more than 500kb
              </p>
            </div>

            {/* Caption */}
            <div className="mb-16 w-3/5">
              <label
                htmlFor="caption"
                className="block text-sm font-medium mb-2"
              >
                Caption (Optional)
              </label>
              <Textarea
                id="caption"
                name="caption"
                defaultValue={blogPost?.caption || ""}
                className="w-full border-gray-300 rounded-lg"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                disabled={isSubmitting}
                className="bg-zinc-700 text-white cursor-pointer"
              >
                Preview
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => handleSubmit(e, "draft")}
                disabled={isSubmitting}
                className="bg-white border-orange-200 text-font hover:bg-secondary hover:text-white cursor-pointer"
              >
                Save to draft
              </Button>
              <Button
                type="submit"
                className="bg-[#FF9B21] hover:bg-white hover:text-secondary hover:border-secondary hover:border-1 text-white cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
