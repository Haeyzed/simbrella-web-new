"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

export default function MilestoneTab() {
  const [open, setOpen] = useState(false);

  const [mainDescription, setMainDescription] = useState(
    "Explore simbrella journey, defined by transformative milestones, showcasing our unwavering commitment to excellence and innovation."
  );

  const [milestones, setMilestones] = useState([
    {
      title: "Projects",
      value: "+69",
      caption: "Number of Projects Completed",
    },
    { title: "Customer", value: "+25", caption: "Happy Customer" },
    {
      title: "Satisfaction",
      value: "+97%",
      caption: "Increased Customer satisfaction",
    },
    { title: "Report", value: "+3", caption: "Year of Experiences" },
  ]);

  const handleSave = () => {
    setOpen(false);
    // optionally save to backend here
  };

  return (
    <div className="bg-[#f7f9fc] px-6 py-10 rounded-md">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-semibold">Manage Our Milestone Section</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-sm border-orange-200 hover:bg-[#e88c1d] hover:text-white cursor-pointer"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Milestone Section</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Main description"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
              />

              {milestones.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      setMilestones((prev) => {
                        const updated = [...prev];
                        updated[index].title = e.target.value;
                        return updated;
                      })
                    }
                  />
                  <Input
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) =>
                      setMilestones((prev) => {
                        const updated = [...prev];
                        updated[index].value = e.target.value;
                        return updated;
                      })
                    }
                  />
                  <Input
                    placeholder="Caption"
                    value={item.caption}
                    onChange={(e) =>
                      setMilestones((prev) => {
                        const updated = [...prev];
                        updated[index].caption = e.target.value;
                        return updated;
                      })
                    }
                  />
                </div>
              ))}

              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-secondary text-white hover:bg-[#e88c1d]"
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-gray-600 mb-8 max-w-3xl">{mainDescription}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 cursor-pointer">
        {milestones.map((milestone, index) => (
          <div key={index} className="text-center">
            <h3 className="text-lg font-semibold">{milestone.title}</h3>
            <p className="text-xl font-bold mt-1">{milestone.value}</p>
            <p className="text-sm text-gray-500 mt-1">{milestone.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
