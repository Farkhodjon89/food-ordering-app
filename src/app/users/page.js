"use client"
import { useEffect, useState } from "react";
import { Tabs } from "../components/layout/Tabs";
import useProfile from "../components/useProfile";
import Link from "next/link";

export default function UsersPage() {
    const {loading, data} = useProfile()
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                setUsers(users)
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            <div>
                {users.length > 0 && users.map(user => (
                     <div 
                      key={user._id} 
                      className="bg-gray-100 mb-2 rounded-lg p-1 flex items-center gap-6 px-4"
                    >
                        <div className="flex gap-4 grow">
                            <div className="text-gray-900">
                               {!!user.name && (<span>{user.name}</span>)}
                               {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={`/users/${user._id}`}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}