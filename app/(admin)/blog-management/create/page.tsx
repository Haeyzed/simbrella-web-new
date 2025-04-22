"use client"

import { useHasPermission } from "@/lib/auth-utils"
import { BlogForm } from "@/components/blog/blog-form"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function CreateBlogPage() {
    const router = useRouter()
    const canCreate = useHasPermission("blog_create")

    // Redirect if user doesn't have permission
    useEffect(() => {
        if (!canCreate) {
            router.push("/blog-management")
        }
    }, [canCreate, router])

    if (!canCreate) {
        return null
    }

    return (

        <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col space-y-6">
                <BlogForm />
            </div>
        </div>
    )
}

