import React from "react"
import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"
import OverviewCard from "@/components/overview-card"
import BlogPost from "@/components/blogpost"
import RecentActivity from "@/components/recentactivity"

export default function Dashboard() {
  // Static data for dashboard cards
  const dashboardData = {
    messages: { total: 1245, read: 932, unread: 313 },
    blogs: { total: 42, published: 36, draft: 6 },
    services: { total: 18, published: 15, draft: 3 },
  };

  return (
    <div className="sm:w-[100%] w-auto p-6 space-y-6 bg-[#EFF4FF] font-poppins">
      <h1 className="text-2xl font-medium text-black mt-10">Dashboard</h1>

      {/* Statistics Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Total Messages"
          value={dashboardData.messages.total}
          details={[
            { label: "Read", value: dashboardData.messages.read },
            { label: "Unread", value: dashboardData.messages.unread },
          ]}
          link="/admin/messages"
        />
        <OverviewCard
          title="Total Blog Posts"
          value={dashboardData.blogs.total}
          details={[
            { label: "Published", value: dashboardData.blogs.published },
            { label: "Draft", value: dashboardData.blogs.draft },
          ]}
          link="/admin/blog-management"
        />
        <OverviewCard
          title="Total Services"
          value={dashboardData.services.total}
          details={[
            { label: "Published", value: dashboardData.services.published },
            { label: "Draft", value: dashboardData.services.draft },
          ]}
          link="/admin/service-management"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BarChart />
        <PieChart />
      </div>

      {/* Blog and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BlogPost />
        <RecentActivity />
      </div>
    </div>
  );
};

