"use client"
import InfoBox from "@/app/components/layout/InfoBox";
import { Tabs } from "@/app/components/layout/Tabs";
import UserForm from "@/app/components/layout/UserForm";
import useProfile from "@/app/components/useProfile";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {
    const session = useSession()
    const [saved, setSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const { loading, data } = useProfile()
    const [user, setUser] = useState(null)
    const { id } = useParams()
 
    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
            res.json().then(user => {
                setUser(user)
            })
        })
    }, [])

    const handleSaveButtonClick = async (e, data) => {
        e.preventDefault()
        setSaved(false)
        setIsSaving(true)

        const { ok } = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...data, _id: id})
        })

        if (ok) setSaved(true)
        setIsSaving(false)
    }

    if (loading) {
        return 'Loading user info'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            <div className="mt-8">
                {saved && <InfoBox bgcolor="bg-green-200">User saved!</InfoBox>}
                {isSaving && <InfoBox>Saving...</InfoBox>}
                <UserForm session={session} user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    )
}