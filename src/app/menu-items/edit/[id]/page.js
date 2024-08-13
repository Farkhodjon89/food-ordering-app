"use client"
import InfoBox from "@/app/components/layout/InfoBox"
import MenuItemForm from "@/app/components/layout/MenuItemForm"
import { Tabs } from "@/app/components/layout/Tabs"
import useProfile from "@/app/components/useProfile"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditMenuItemPage() {
    const { id } = useParams()
    const { data, loading } = useProfile()
    const [menuItem, setMenuItem] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [redirectToItems, setRedirectToItems] = useState(false)

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(item => item._id === id)
                setMenuItem(item)
            })
        })
    }, [])

    const handleFormSubmit = async (e, data) => {
        e.preventDefault()
        data = {...data, _id: id}
        setIsSaving(true)
        setSaved(false)
        const response = await fetch('/api/menu-items', {
            method: 'PUT',
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            {/* <div className="max-w-md mx-auto mt-4">
                <button onClick={handleDeleteClick}>Delete this menu item</button>
            </div> */}
        </section>
    )
}