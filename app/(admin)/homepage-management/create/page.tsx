"use client"

import { useHasPermission } from "@/lib/auth-utils"
import { HeroSectionForm } from "@/components/homepage/hero-section-form"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function CreateHeroPage() {
    const router = useRouter()
    const canCreate = useHasPermission("hero_create")

    // Redirect if user doesn't have permission
    useEffect(() => {
        if (!canCreate) {
            router.push("/homepage-management")
        }
    }, [canCreate, router])

    if (!canCreate) {
        return null
    }

    return (

        <div className="container mx-auto py-6 px-4">
            <div className="flex flex-col space-y-6">
                <HeroSectionForm />
            </div>
        </div>
    )
}