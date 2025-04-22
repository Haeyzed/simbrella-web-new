"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Recentactivityimage from "../public/images/recentimage.png"; // Adjust the path as necessary

interface Activity {
  id: number;
  image: StaticImageData; // Type for imported images
  title: string;
  description: string;
  time: string;
}

export default function RecentActivity ()  {
  const [hasNotification, setHasNotification] = useState<boolean>(true);

  // Mock activity data with proper typing
  const activities: Activity[] = [
    {
      id: 1,
      image: Recentactivityimage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      time: "2 minutes ago",
    },
    {
      id: 2,
      image: Recentactivityimage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      time: "2 minutes ago",
    },
    {
      id: 3,
      image: Recentactivityimage,
      title:
        "Simbrella Nigeria participated in innovative products with a micro finance bank",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      time: "2 minutes ago",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-8 bg-secondary rounded-sm mr-2"></div>
          <h2 className="text-sm font-medium text-gray-800">Recent Activity</h2>
        </div>
      </div>

      {/* Activity Cards */}
      {activities.map((activity, index) => (
        <div key={activity.id}>
          <div className="flex items-start mb-2">
            {/* Blog Image - Using Next.js Image component */}
            <div className="w-1/6 pr-4 relative">
              <Image
                src={activity.image}
                alt={activity.title}
                className="w-full h-auto rounded-lg object-cover"
                placeholder="blur" // Optional blur-up effect
              />
              {hasNotification && (
                <span
                  className="absolute -top-3 -right-3 bg-[#F62C72] text-white text-xs font-bold w-3 h-3 rounded-full border-2 border-white flex items-center justify-center"
                  aria-label="New notification"
                ></span>
              )}
            </div>

            {/* Activity Content */}
            <div className="w-5/6">
              <div className="flex items-center mb-2">
                <h3 className="text-xs font-normal text-gray-800">
                  {activity.title.length > 80
                    ? `${activity.title.substring(0, 80)}...`
                    : activity.title}
                </h3>
              </div>
              <p className="text-xs font-light text-gray-600 mb-4">
                {activity.description.length > 80
                  ? `${activity.description.substring(0, 80)}...`
                  : activity.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="text-xs italic">
                  Blog updated {activity.time}
                </span>
                <a
                  href="#"
                  className="text-orange-500 font-medium hover:underline"
                  aria-label={`View details for ${activity.title}`}
                >
                  View Details
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal line except after the last item */}
          {index < activities.length - 1 && (
            <hr className="border-t border-gray-200 mb-4" />
          )}
        </div>
      ))}
    </div>
  );
};


