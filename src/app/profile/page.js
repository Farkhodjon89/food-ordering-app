"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import InfoBox from "../components/layout/InfoBox"
import { Tabs } from "../components/layout/Tabs"
import UserForm from "../components/layout/UserForm"

export default function ProfilePage() {
    const session = useSession()
    const {status} = session
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [saved, setSaved] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data)
                    setIsAdmin(data?.admin)
                })
            })
        }
    }, [session, status])

    if (status === 'loading') {
        return <h1>Loading...</h1>
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const handleProfileInfoUpdate = async (e, data) => {
        e.preventDefault();
        setSaved(false)
        setIsSaving(true)

        const { ok } = await fetch('/api/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })

        if (ok) setSaved(true)
        setIsSaving(false)
    }

    return (
        <section className="mt-8">
            <Tabs isAdmin={isAdmin} />
            <div className="mx-auto max-w-lg">
                {saved && <InfoBox bgcolor="bg-green-200">Profile saved!</InfoBox>}
                {isSaving && <InfoBox>Saving...</InfoBox>}
                {<UserForm session={session} user={user} onSave={handleProfileInfoUpdate} />}
            </div>
        </section>
    )
}