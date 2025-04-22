"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search, Edit, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useHasPermission } from "@/lib/auth-utils";
import { getBlogPosts } from "@/actions/blog";
import type { BlogPost } from "@/types/api";
import Link from "next/link";
import { toast } from "sonner";
import Pagination from "@/components/pagination";
import { BlogDeleteDialog } from "@/components/blog/blog-delete-dialog";

export default function BlogManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Check permissions
  const canCreate = useHasPermission("blog_create");
  const canUpdate = useHasPermission("blog_update");
  const canDelete = useHasPermission("blog_delete");

  // Fetch blog posts
  useEffect(() => {
    async function fetchBlogPosts() {
      setIsLoading(true);
      try {
        const status =
          activeTab === "all"
            ? "published"
            : activeTab === "drafts"
            ? "draft"
            : "published";
        const orderBy = activeTab === "top" ? "views" : "created_at";

        const response = await getBlogPosts(
          currentPage,
          10,
          searchQuery,
          status,
          orderBy,
          "desc"
        );

        if (response.success && response.data) {
          setBlogPosts(response.data);
          if (response.meta) {
            setTotalPages(response.meta.last_page);
            setTotalItems(response.meta.total);
          }
        } else {
          toast("Error", {
            description: "Failed to load blog posts",
          });
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast("Error", {
          description: "Failed to load blog posts",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, [activeTab, currentPage, searchQuery]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle post deletion success
  const handleDeleteSuccess = (deletedId: number) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== deletedId));
    toast("Success", {
      description: "Blog post deleted successfully",
    });
  };

  return (
    <div className="pl-6 sm:pl-2 lg:pr-6 sm:pr-2 py-1 w-auto mt-10">
      <div className="flex flex-col space-y-6">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between space-y-6 bg-[#EFF4FF]">
          <div className="flex items-center gap-4">
            <button
              className="rounded-full cursor-pointer"
              onClick={() => router.back()}
            >
              <ChevronLeft className="7-5 w-7" size={25} />
            </button>
            <h1 className="text-2xl font-semibold">Manage your Blogs Posts</h1>
          </div>

          {canCreate && (
            <Button
              className="bg-[#FF9B21] hover:bg-[#e88c1d] text-white cursor-pointer"
              onClick={() => router.push("/blog-management/create")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add new Posts
            </Button>
          )}
        </div>
        <div className="bg-white px-6 py-6">
          {/* Tabs and search */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-16 ">
            <div className="flex space-x-10">
              {/* All Published Posts */}
              <div className="relative">
                <button
                  className={`py-2 text-sm cursor-pointer ${
                    activeTab === "all"
                      ? "text-font font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Published Posts
                </button>
                {activeTab === "all" && (
                  <hr className="absolute bottom-0 left-0 w-1/2 rounded border-t-4 border-secondary" />
                )}
              </div>

              {/* Drafts */}
              <div className="relative">
                <button
                  className={`py-2 text-sm cursor-pointer ${
                    activeTab === "drafts"
                      ? "text-font font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("drafts")}
                >
                  Drafts
                </button>
                {activeTab === "drafts" && (
                  <hr className="absolute bottom-0 left-0 w-1/2 rounded border-t-4 border-secondary" />
                )}
              </div>

              {/* Top Performing Posts */}
              <div className="relative">
                <button
                  className={`py-2 text-sm cursor-pointer ${
                    activeTab === "top"
                      ? "text-font font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("top")}
                >
                  Top Performing Posts
                </button>
                {activeTab === "top" && (
                  <hr className="absolute bottom-0 left-0 w-1/2 rounded border-t-4 border-secondary" />
                )}
              </div>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Search for blogs"
                className="pl-10 pr-4 h-10 w-full md:w-[300px] rounded-md border border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>
          {/* Blog posts list */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-10">Loading...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No blog posts found
              </div>
            ) : (
              blogPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <div className="flex">
                    <div className="flex lg:space-x-6 sm:space-x-3 mb-6">
                      <div className="w-2/12 sm:w-auto">
                        <Image
                          src={
                            post.banner_image_url || "/images/newsletter.png"
                          }
                          alt={post.title}
                          width={150}
                          height={120}
                          className="w-[150px] h-[120px] object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-10/12 flex sm:flex-col justify-between items-start">
                        <div className="w-3/5 sm:w-full">
                          <h3 className="text-sm font-semibold text-gray-800 mb-4">
                            {post.title}
                          </h3>
                          <div className="font-poppins text-xs font-light text-gray-600 mt-2 sm:hidden md:block">
                            {post.body
                              ?.substring(0, 200)
                              .replace(/<[^>]*>/g, "")}
                            ...
                          </div>
                          {post.body && post.body.length > 200 && (
                            <span className="text-[#FF9B21] text-xs font-light cursor-pointer ml-1">
                              <Link href={`/blog-management/${post.id}`}>
                                Read more
                              </Link>
                            </span>
                          )}
                          <div className="flex items-center space-x-4 mt-4 text-xs font-normal text-gray-500">
                            <span className="flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-1"
                              >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              {post.views || 0} views
                            </span>
                            {post.status === "draft" ? (
                              <span className="text-red-600">
                                {post.status}
                              </span>
                            ) : (
                              <span>{post.status}</span>
                            )}
                            <span>
                              {post.formatted_created_at ||
                                post.created_at?.substring(0, 10)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* //action buttons   */}
                      <div className="w-4/12 -mt-6">
                        <div className="w-2/5 sm:w-full sm:mt-6 mx-auto flex space-x-4 text-xs lg:ml-16">
                          {canUpdate && (
                            <button
                              className="flex items-center space-x-2 px-3 py-1 bg-white border-[1px] border-orange-200 hover:bg-secondary text-font font-normal hover:text-white rounded-lg cursor-pointer"
                              onClick={() =>
                                router.push(`/blog-management/${post.id}/edit`)
                              }
                            >
                              <Edit size="sm" className="h-4 w-4" />
                              <span>
                                {post.status === "draft"
                                  ? "Continue Editing"
                                  : "Edit"}
                              </span>
                            </button>
                          )}
                          {canDelete && (
                            <BlogDeleteDialog
                              blogId={post.id}
                              blogTitle={post.title}
                              onSuccess={() => handleDeleteSuccess(post.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < blogPosts.length - 1 && (
                    <hr className="border-t border-gray-300 my-4" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
