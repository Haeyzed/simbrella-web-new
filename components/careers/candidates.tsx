"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/pagination"; // Ensure correct default import
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"; // assuming you have a cn utility
import { ChevronDown } from "lucide-react";

// Dummy candidate data
const candidatesData = [
  {
    id: 1,
    name: "John Doe",
    jobType: "Frontend Developer",
    email: "john@example.com",
    phone: "123-456-7890",
    cv: "john_doe_resume.pdf",
    date: "2025-04-24",
    status: "reviewing",
  },
  {
    id: 2,
    name: "Jane Smith",
    jobType: "Digital Marketer",
    email: "jane@example.com",
    phone: "987-654-3210",
    cv: "jane_smith_cv.docx",
    date: "2025-04-23",
    status: "selected",
  },
  // Add more candidates...
];

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const candidatesPerPage = 5;

  const filteredCandidates = candidatesData.filter((candidate) => {
    const query = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.jobType.toLowerCase().includes(query) ||
      candidate.status.toLowerCase().includes(query)
    );
  });

  const sortedCandidates = filteredCandidates.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const paginatedCandidates = sortedCandidates.slice(
    (currentPage - 1) * candidatesPerPage,
    currentPage * candidatesPerPage
  );

  const toggleSelectAll = () => {
    if (selectedCandidates.length === paginatedCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(paginatedCandidates.map((c) => c.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates((prev) =>
        prev.filter((candidateId) => candidateId !== id)
      );
    } else {
      setSelectedCandidates((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    // Reset selection if page changes
    setSelectedCandidates([]);
  }, [currentPage, searchQuery, sortOrder]);

  return (
    <div className="w-full bg-white p-6 space-y-6 font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Candidates ({filteredCandidates.length})
        </h1>

        <div className="flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by name, email, job type, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 border-orange-300"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Date
            <ChevronDown
              className={cn(
                "transition-transform",
                sortOrder === "asc" ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#030133] text-white">
            <tr>
              <th className="p-4">
                <Checkbox
                  checked={
                    selectedCandidates.length === paginatedCandidates.length
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="p-4 text-left">Candidate Name</th>
              <th className="p-4 text-left">Job Type</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">CV</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-b hover:bg-orange-50 transition-colors"
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedCandidates.includes(candidate.id)}
                    onCheckedChange={() => toggleSelectOne(candidate.id)}
                  />
                </td>
                <td className="p-4">{candidate.name}</td>
                <td className="p-4">{candidate.jobType}</td>
                <td className="p-4">{candidate.email}</td>
                <td className="p-4">{candidate.phone}</td>
                <td className="p-4">
                  <a
                    href={`/uploads/${candidate.cv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 underline"
                  >
                    View CV
                  </a>
                </td>
                <td className="p-4">{candidate.date}</td>
                <td className="p-4 capitalize">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      candidate.status === "reviewing" &&
                        "bg-yellow-100 text-yellow-800",
                      candidate.status === "selected" &&
                        "bg-green-100 text-green-800",
                      candidate.status === "rejected" &&
                        "bg-red-100 text-red-800"
                    )}
                  >
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedCandidates.length === 0 && (
          <div className="text-center p-8 text-gray-500">
            No candidates found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedCandidates.length}
          itemsPerPage={candidatesPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
