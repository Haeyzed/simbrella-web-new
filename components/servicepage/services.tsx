"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Search } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import Pagination from "@/components/pagination";
import sampleImg from "@/public/images/serviceHeroImage.png";

const dummyServices = [
  {
    id: 1,
    title: "Business Consulting",
    summary: "Fully digital loan management...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 2,
    title: "Financial Advisory",
    summary: "Get tailored financial advice...",
    image: "/images/sample.jpg",
    status: "draft",
  },
  {
    id: 3,
    title: "Tech Integration",
    summary: "We help integrate modern systems...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 4,
    title: "Market Analysis",
    summary: "Detailed market reports...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 5,
    title: "Strategy Consulting",
    summary: "Strategic planning and advisory...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 6,
    title: "Risk Assessment",
    summary: "Risk profiling and mitigation...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 7,
    title: "IT Security",
    summary: "Cybersecurity solutions for growth...",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 8,
    title: "Brand Development",
    summary: "Build and launch your brand...",
    image: "/images/sample.jpg",
    status: "published",
  },
];

const ServiceItem = ({ service }: { service: (typeof dummyServices)[0] }) => (
  <div className="flex gap-4 py-4">
    <div className="w-[120px] h-[100px] overflow-hidden rounded-lg">
      <img
        src={service.image}
        alt={service.title}
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mt-1">
        {service.summary}
      </p>
      <span className="text-orange-500 text-sm cursor-pointer">
        ...Read more
      </span>
    </div>
    <div className="flex flex-col items-end justify-between">
      <div className="flex gap-2">
        <Button
          variant="edit"
        >
          <Pencil className="w-3 h-3 mr-1" /> Edit
        </Button>
        <Button
          variant="delete"
        >
          <Trash2 className="w-3 h-3 mr-1" /> Delete
        </Button>
      </div>
    </div>
  </div>
);

export default function ServicesTab() {
  const [search, setSearch] = useState("");
  const [isEditBannerOpen, setEditBannerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("published");
  const [publishedPage, setPublishedPage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);
  const itemsPerPage = 5;

  const handleTabChange = (value: string) => setCurrentTab(value);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  const filteredServices = dummyServices.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const published = filteredServices.filter((s) => s.status === "published");
  const draft = filteredServices.filter((s) => s.status === "draft");

  const getPaginatedData = (data: typeof dummyServices, page: number) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const PaginationWrapper = ({
    currentPage,
    totalItems,
    onPageChange,
  }: {
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const showingFrom = (currentPage - 1) * itemsPerPage + 1;
    const showingTo = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex items-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    );
  };

  const paginatedPublished = getPaginatedData(published, publishedPage);
  const paginatedDraft = getPaginatedData(draft, draftPage);

  return (
    <div className="lg:w-[960px] mx-auto py-8 px-6">
      <Tabs
        defaultValue="published"
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger
              value="published"
              className="data-[state=active]:text-secondary cursor-pointer"
            >
              All Published ({published.length})
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="data-[state=active]:text-secondary cursor-pointer"
            >
              Drafts ({draft.length})
            </TabsTrigger>
          </TabsList>
          <form
            onSubmit={handleSearch}
            className="relative w-full md:w-[300px]"
          >
            <Input
              placeholder="Search services..."
              className="pl-10 pr-4 h-10 w-full rounded-md border border-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </form>
        </div>

        <TabsContent value="published" className="mt-6">
          <section>
            <p className="text-sm font-medium mt-1">Banner Image</p>
            <div className="mt-2 mb-10 relative w-full max-w-4xl">
              <Image
                src={sampleImg}
                alt="Banner"
                className="w-full rounded-md"
              />
              <button
                onClick={() => setEditBannerOpen(true)}
                className="flex absolute top-3 right-3 px-3 py-2 text-xs rounded-lg border-2 bg-white border-orange-200 hover:bg-secondary hover:text-white cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-1" /> <span>Edit Image</span>
              </button>
            </div>
          </section>

          {paginatedPublished.length > 0 ? (
            paginatedPublished.map((service) => (
              <div key={service.id}>
                <ServiceItem service={service} />
                <hr className="my-4 border-gray-200" />
              </div>
            ))
          ) : (
            <p>No published services found.</p>
          )}

          <PaginationWrapper
            currentPage={publishedPage}
            totalItems={published.length}
            onPageChange={setPublishedPage}
          />
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          {paginatedDraft.length > 0 ? (
            paginatedDraft.map((service) => (
              <div key={service.id}>
                <ServiceItem service={service} />
                <hr className="my-4 border-gray-200" />
              </div>
            ))
          ) : (
            <p>No draft services found.</p>
          )}

          <PaginationWrapper
            currentPage={draftPage}
            totalItems={draft.length}
            onPageChange={setDraftPage}
          />
        </TabsContent>
      </Tabs>

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
              className="text-sm px-3 py-1 rounded bg-gray-200"
            >
              Cancel
            </button>
            <button className="text-sm px-3 py-1 rounded bg-secondary text-white">
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
