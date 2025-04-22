"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const generatePageNumbers = (): (number | string)[] => {
      const maxVisible = 5; // Maximum number of visible page numbers
        const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex md:flex-row md:items-center md:justify-between mt-6 px-2 text-sm gap-4">
      <div className="flex items-center flex-wrap gap-3">
        {/* Page Buttons + Arrows */}
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-1 text-black disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={clsx(
                  "w-8 h-8 rounded-md text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black hover:bg-gray-400"
                )}
              >
                {page}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-1 text-black disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Text Info */}
      <div className="text-gray-700">
        Showing {startItem} - {endItem} of {totalItems}
      </div>
    </div>
  );
};

export default Pagination;
