"use client"
import InfoBox from "@/app/components/layout/InfoBox"
import MenuItemForm from "@/app/components/layout/MenuItemForm"
import { Tabs } from "@/app/components/layout/Tabs"
import useProfile from "@/app/components/useProfile"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function NewMenuItemPage() {
    const { data, loading } = useProfile()
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [redirectToItems, setRedirectToItems] = useState(false)

    const handleFormSubmit = async (e, data) => {
        e.preventDefault()
        setIsSaving(true)
        setSaved(false)
        const response = await fetch('/api/menu-items', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            setSaved(true)
        }
        setRedirectToItems(true)
    }

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            {saved && <InfoBox bgcolor="bg-green-200">Saved!</InfoBox>}
            {isSaving && <InfoBox>Saving...</InfoBox>}
            <div>
                <Link href={'/menu-items'} className="button text-center mt-4">
                    <span>Show all menu-items</span>
                </Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={null} />
        </section>
    )
}