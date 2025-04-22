//danjuma's implementation using dummy datas

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface HeroImage {
  id: string;
  image_url: string;
}

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  images: HeroImage[];
  is_active: boolean;
  published_at: string;
  isEditing?: boolean; // NEW
}

const dummyHeroSections: HeroSection[] = [
  {
    id: "1",
    title: "First Company in the World to launch a Fintech Mobile Services",
    subtitle:
      "We are serving over 25 companies in 20 countries worldwide and this number is growing with new launches every quarter.",
    published_at: "25/11/24",
    is_active: true,
    images: [
      { id: "img1", image_url: "/images/meeting-1.jpg" },
      { id: "img2", image_url: "/images/meeting-2.jpg" },
      { id: "img3", image_url: "/images/woman.jpg" },
    ],
    isEditing: false,
  },
];

export function HeroSectionTab() {
  const [heroSections, setHeroSections] =
    useState<HeroSection[]>(dummyHeroSections);
  const router = useRouter();

  const handleToggle = (id: string) => {
    setHeroSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, is_active: !section.is_active }
          : section
      )
    );
    toast("Status Updated", {
      description: "Hero section active status changed",
    });
  };

  const handleEditToggle = (id: string) => {
    setHeroSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, isEditing: !section.isEditing }
          : section
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Hero Section</h2>
        <button
          className="p-3 border-2 rounded-lg border-orange-200 text-xs text-secondary hover:bg-secondary hover:text-white cursor-pointer"
          onClick={() => router.push("/homepage-management/create")}
        >
          Create Hero Section
        </button>
      </div>

      {heroSections.map((hero) => (
        <div
          key={hero.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg p-6"
        >
          {hero.isEditing ? (
            // Editable form
            <>
              {/* LEFT SIDE - Editable Text */}
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-sm text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={hero.title}
                    onChange={(e) =>
                      setHeroSections((prev) =>
                        prev.map((h) =>
                          h.id === hero.id ? { ...h, title: e.target.value } : h
                        )
                      )
                    }
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-sm text-gray-700">
                    Subtitle
                  </label>
                  <textarea
                    value={hero.subtitle}
                    onChange={(e) =>
                      setHeroSections((prev) =>
                        prev.map((h) =>
                          h.id === hero.id
                            ? { ...h, subtitle: e.target.value }
                            : h
                        )
                      )
                    }
                    rows={4}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-sm text-gray-700">
                    Published Date
                  </label>
                  <input
                    type="text"
                    value={hero.published_at}
                    onChange={(e) =>
                      setHeroSections((prev) =>
                        prev.map((h) =>
                          h.id === hero.id
                            ? { ...h, published_at: e.target.value }
                            : h
                        )
                      )
                    }
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* RIGHT SIDE - Image Upload & Toggle */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {hero.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-full aspect-video rounded-md overflow-hidden border"
                    >
                      <Image
                        src={img.image_url}
                        alt="hero"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() =>
                          setHeroSections((prev) =>
                            prev.map((h) =>
                              h.id === hero.id
                                ? {
                                    ...h,
                                    images: h.images.filter(
                                      (i) => i.id !== img.id
                                    ),
                                  }
                                : h
                            )
                          )
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-semibold text-sm text-gray-700 mb-1">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const newImages: HeroImage[] = Array.from(files).map(
                          (file, idx) => ({
                            id: `${hero.id}-new-${idx}`,
                            image_url: URL.createObjectURL(file), // TEMP for preview
                          })
                        );
                        setHeroSections((prev) =>
                          prev.map((h) =>
                            h.id === hero.id
                              ? { ...h, images: [...h.images, ...newImages] }
                              : h
                          )
                        );
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-orange-500 text-sm border border-orange-300 px-4 py-1.5 rounded-md hover:bg-orange-50 transition">
                    + Add More Images
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Active</span>
                    <Switch
                      checked={hero.is_active}
                      onCheckedChange={() => handleToggle(hero.id)}
                      className="data-[state=checked]:bg-[#FF9B21]"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 pt-4">
                <Button
                  className="bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => {
                    toast("Changes Saved", {
                      description: `Hero section ${hero.id} updated.`,
                    });
                    handleEditToggle(hero.id);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            // Read-only view
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-normal text-font">Title</h3>
                  <p className="text-sm text-font">{hero.title}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-normal text-font">
                    Sub title
                  </h4>
                  <p className="text-sm text-font">{hero.subtitle}</p>
                </div>
                <p className="text-xs text-font pt-2">
                  Published {hero.published_at}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active</span>
                  <Switch
                    checked={hero.is_active}
                    onCheckedChange={() => handleToggle(hero.id)}
                    className="w-11 h-4 rounded-full border-2 transition-colors
                      data-[state=unchecked]:bg-gray-100 
                      data-[state=unchecked]:border-gray-200
                      data-[state=unchecked]:border-1
                      data-[state=checked]:bg-secondary
                      data-[state=checked]:border-secondary
                      [&>span]:h-5 [&>span]:w-5 
                      [&>span]:data-[state=unchecked]:translate-x-0.5
                      [&>span]:data-[state=checked]:translate-x-5
                      [&>span]:data-[state=checked]:bg-white
                      [&>span]:data-[state=unchecked]:bg-secondary"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {hero.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-full aspect-video rounded-md overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img.image_url || "/placeholder.svg"}
                        alt="Carousel"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    className="text-secondary text-sm border-1 border-orange-200 px-4 py-1.5 rounded-md hover:bg-secondary hover:text-white transition cursor-pointer"
                    onClick={() => handleEditToggle(hero.id)}
                  >
                    Edit this Hero
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

//Hayzed's previous implementation for the HeroSectionTab component in case of cross referencing.

// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import type { HeroSection } from "@/types/api"
// import Image from "next/image"
// import { ChevronLeft } from "lucide-react"

// interface HeroSectionTabProps {
//   heroSection: HeroSection | null
//   // Using underscore prefix to indicate intentionally unused variable
//   _canEdit?: boolean
//   onUpdate: () => void
// }

// export function HeroSectionTab({ heroSection, onUpdate }: HeroSectionTabProps) {
//   const [activeSubTab, setActiveSubTab] = useState("view")

//   const renderHeroContent = () => {
//     if (activeSubTab === "view") {
//       return (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {heroSection?.images && heroSection.images.length === 0 ? (
//                 <div className="col-span-3 text-center py-10 text-gray-500">No hero images found</div>
//             ) : (
//                 heroSection?.images?.map((image) => (
//                     <div
//                         key={image.id}
//                         className="bg-white rounded-md shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center"
//                     >
//                       <div className="flex items-start justify-end w-full mb-4">
//                         <button className="h-8 px-3 text-gray-600 border-gray-300">
//                           <svg
//                               width="15"
//                               height="15"
//                               viewBox="0 0 15 15"
//                               fill="none"
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="mr-1"
//                           >
//                             <path
//                                 d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
//                                 fill="currentColor"
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                             ></path>
//                           </svg>
//                           Edit
//                         </button>
//                       </div>

//                       <Image
//                           src={image.image_url || "/placeholder.svg?height=80&width=150"}
//                           alt="Hero Image"
//                           width={150}
//                           height={80}
//                           className="object-contain"
//                       />
//                     </div>
//                 ))
//             )}
//           </div>
//       )
//     } else {
//       // Upload hero image form
//       return (
//           <div className="space-y-6">
//             <form
//                 onSubmit={(e) => {
//                   e.preventDefault()
//                   toast("Success", {
//                     description: "Hero section updated successfully",
//                   })
//                   setActiveSubTab("view")
//                   onUpdate()
//                 }}
//             >
//               {/* Form content would go here */}
//               <Button type="submit" className="bg-[#FF9B21] hover:bg-[#e88c1d] text-white">
//                 Publish
//               </Button>
//             </form>
//           </div>
//       )
//     }
//   }

//   return (
//       <div className="space-y-6">
//         {activeSubTab === "view" ? (
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-semibold">Hero Section</h2>

//               <button  className="p-3 border-2 rounded-lg border-orange-200 text-xs text-secondary hover:bg-secondary hover:text-white cursor-pointer" onClick={() => setActiveSubTab("edit")}>
//                 Edit Hero Section
//               </button>
//             </div>
//         ) : (
//             <div className="flex items-center gap-4">
//               <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setActiveSubTab("view")}>
//                 <ChevronLeft className="h-5 w-5" />
//               </Button>
//               <h2 className="text-2xl font-semibold">Edit Hero Section</h2>
//             </div>
//         )}

//         {renderHeroContent()}
//       </div>
//   )
// }
