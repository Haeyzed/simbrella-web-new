import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaEye, FaCalendarAlt } from "react-icons/fa";
import viewIcon from "../public/images/viewIcon.png";
import BlogImage from "../public/images/adminblogimage.png";

interface BlogPost {
  id: number;
  image: StaticImageData | string;
  title: string;
  description: string;
  views: string;
  frequency: string;
}

export default function BlogPost() {
  // Mock blog data with TypeScript typing
  const blogs: BlogPost[] = [
    {
      id: 1,
      image: BlogImage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      views: "1.5k",
      frequency: "WEEKLY",
    },
    {
      id: 2,
      image: BlogImage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      views: "1.2k",
      frequency: "WEEKLY",
    },
    {
      id: 3,
      image: BlogImage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      views: "1.2k",
      frequency: "WEEKLY",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-8 bg-secondary rounded-sm mr-2"></div>
          <h2 className="text-sm font-medium text-[#3b3b3b]">Top Blog Posts</h2>
        </div>
        <Link
          href="/admin/blog-management?tab=tab1"
          className="text-sm font-medium text-secondary hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Blog Cards */}
      {blogs.map((blog, index) => (
        <div key={blog.id}>
          <div className="flex justify-center items-start mb-2">
            {/* Blog Image - Using Next.js Image component */}
            <div className="w-1/3 pr-4">
              <Image
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto rounded-lg object-cover"
                placeholder="blur"
              />
            </div>

            {/* Blog Content */}
            <div className="w-2/3">
              <h3 className="text-xs font-normal text-gray-800">
                {blog.title.length > 80
                  ? `${blog.title.substring(0, 80)}...`
                  : blog.title}
              </h3>
              <p className="text-xs text-gray-600 font-light mt-2">
                {blog.description.length > 80
                  ? `${blog.description.substring(0, 80)}...`
                  : blog.description}
              </p>
              <div className="flex items-center text-xs text-gray-500 mt-3 space-x-6">
                <div className="flex items-center space-x-1">
                  <Image
                    src={viewIcon}
                    alt="Views icon"
                    className="text-gray-400"
                    width={16}
                    height={16}
                  />
                  <span>{blog.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{blog.frequency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add horizontal line after every blog except the last one */}
          {index < blogs.length - 1 && (
            <hr className="border-t border-gray-200 mb-2" />
          )}
        </div>
      ))}
    </div>
  );
};


