"use client"
import Link from "next/link";
import { Tabs } from "../components/layout/Tabs";
import useProfile from "../components/useProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MenuItemsPage() {
    const { data: profileData, loading: profileLoading } = useProfile()
    const [menuItems, setMenuItems] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchMenuItems()
    }, [])

    const fetchMenuItems = async () => {
        await fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }

    const handleDeleteMenuItem = async (e, item) => {
        e.stopPropagation()
        await fetch('/api/menu-items', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
        fetchMenuItems()
    }

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            <div className="mt-8">
              <Link href={'/menu-items/new'} className="button text-center">
                Create new menu item
              </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8 mb-2">Edit menu item:</h2>
                <div className="grid grid-cols-2 gap-4">
                {menuItems.length > 0 && menuItems.map(item => (
                    <button 
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                      onClick={() => router.push(`/menu-items/edit/${item._id}`)}
                      key={item._id} 
                      className="mb-1 bg-gray-200"
                    >
                        <span>{item.name.toLowerCase()}</span>
                        <span onClick={(e) => handleDeleteMenuItem(e, item)}>x</span>
                    </button>
                ))}
                </div>
            </div>
        </section>
    )
}