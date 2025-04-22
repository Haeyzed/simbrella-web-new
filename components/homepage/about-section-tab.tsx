"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PiPencilSimpleLineBold } from "react-icons/pi"
import type { AboutSection } from "@/types/api"
import Image from "next/image"
import { DrawerDialog } from "@/components/ui/drawer-dialog"
import { AboutSectionForm } from "@/components/homepage/about-section-form"
import AboutSectionImage from "@/public/images/aboutImg.png" //static image

interface AboutSectionTabProps {
  aboutSection: AboutSection | null
  canEdit: boolean
  onUpdate: () => void
}

export function AboutSectionTab({ aboutSection, canEdit, onUpdate }: AboutSectionTabProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false)
    onUpdate()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">About Section</h2>

      {aboutSection ? (
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Image
                src={
                  AboutSectionImage ||
                  "/placeholder.svg?height=300&width=300"
                }
                alt="About Us"
                width={300}
                height={300}
                className="rounded-md w-full h-auto object-cover"
              />
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {aboutSection.title || "Who we are"}
                </h3>

                {canEdit && (
                  <button
                    className="flex text-xs items-center space-x-3 px-3 py-1 bg-white border-[1px] border-orange-200 hover:bg-secondary text-gray-800 hover:text-white rounded-lg cursor-pointer"
                    onClick={() => setIsEditDialogOpen(true)}
                  >
                    <PiPencilSimpleLineBold />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <p className="text-gray-700 mb-4">{aboutSection.summary}</p>

              <div className="text-sm text-gray-500">
                Published{" "}
                {aboutSection.created_at?.substring(0, 10) || "25/11/24"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No about section found
          {canEdit && (
            <div className="mt-4">
              <Button
                className="bg-[#FF9B21] hover:bg-[#e88c1d] text-white"
                onClick={() => setIsEditDialogOpen(true)}
              >
                Create About Section
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Edit About Section Dialog */}
      <DrawerDialog
        trigger={<></>}
        title={aboutSection ? "Edit About Section" : "Create About Section"}
        description="Update the about section on your homepage"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <AboutSectionForm
          aboutSection={aboutSection}
          onSuccess={handleEditSuccess}
        />
      </DrawerDialog>
    </div>
  );
}

