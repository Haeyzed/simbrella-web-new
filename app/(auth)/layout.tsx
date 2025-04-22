import type React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import altlogo from "../../public/images/logo-white.png";
import image1 from "../../public/images/adminloginimage1.png";
import image2 from "../../public/images/adminloginimage2.png";
import image3 from "../../public/images/adminloginimage3.png";
import image4 from "../../public/images/adminloginimage4.png";
import image5 from "../../public/images/adminloginimage5.png";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to dashboard if already authenticated
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-[#2d3192] relative hidden lg:block">
        {/* Logo */}
        <div className="absolute top-6 left-16 h-auto">
          <Image
            src={altlogo || "/placeholder.svg"}
            alt="Simbrella Logo"
            className="w-32"
            priority
          />
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-3 gap-4 px-16 mt-10">
          <div className="flex flex-col gap-4 max-w-sm mt-36">
            <Image
              src={image1 || "/placeholder.svg"}
              alt="User 1"
              className="rounded-lg object-cover w-44 h-auto"
            />
            <Image
              src={image2 || "/placeholder.svg"}
              alt="User 1"
              className="rounded-lg object-cover w-42 h-auto"
            />
          </div>
          <div className="flex flex-col gap-4 max-w-sm mt-10">
            <Image
              src={image3 || "/placeholder.svg"}
              alt="User 1"
              className="rounded-lg object-cover w-44 h-auto"
            />
            <Image
              src={image4 || "/placeholder.svg"}
              alt="User 1"
              className="rounded-lg object-cover w-44 h-auto"
            />
          </div>
          <div className="flex flex-col gap-4 max-w-sm mt-24">
            <Image
              src={image5 || "/placeholder.svg"}
              alt="User 1"
              className="rounded-lg object-cover w-44 h-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
