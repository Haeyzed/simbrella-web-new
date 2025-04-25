"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { User } from "@/types/api";
import { signOut } from "next-auth/react";
import { RiUser3Line, RiSettings4Line, RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";

interface UserProfileDropdownProps {
  user: User;
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const fullName =
    user.full_name || `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const email = user.email || "";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center bg-[#DEE2E6] py-2 rounded-lg shadow-sm gap-2 px-2 cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.profile_image_url || "/placeholder.svg"}
              alt={fullName}
            />
            <AvatarFallback className="bg-primary text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{fullName}</span>
          <ChevronDown className="h-4 w-4 text-secondary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-0 bg-gray-50">
        <div className="p-4 flex flex-col items-center">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage
              src={user.profile_image_url || "/placeholder.svg"}
              alt={fullName}
            />
            <AvatarFallback className="text-lg bg-primary text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-medium text-lg">{fullName}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 text-foreground">
          <Link href="/account-settings">
            <DropdownMenuItem className="py-3 px-4 cursor-pointer">
              <RiUser3Line className="mr-3 h-5 w-5 " />
              <span>Account Settings</span>
            </DropdownMenuItem>
          </Link>

          <Link href="/change-password">
            <DropdownMenuItem className="py-3 px-4 cursor-pointer ">
              <RiSettings4Line className="mr-3 h-5 w-5 " />
              <span>Change Password</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className="py-3 px-4 cursor-pointer "
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <RiLogoutBoxRLine className="mr-3 h-5 w-5 " />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
