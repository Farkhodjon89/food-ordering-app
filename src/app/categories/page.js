"use client"
import { useEffect, useState } from "react";
import { Tabs } from "../components/layout/Tabs";
import useProfile from "../components/useProfile";
import InfoBox from "../components/layout/InfoBox";

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('')
    const [creatingCategory, setCreatingCategory] = useState(false)
    const [updatingCategory, setUpdatingCategory] = useState(false)
    const [created, setCreated] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)
    const {loading: profileLoading, data: profileData } = useProfile()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        await fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    const handleDeleteCategory = async (e, category) => {
        e.stopPropagation()
        await fetch('/api/categories', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        })
        fetchCategories()
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        editedCategory ? setUpdatingCategory(true) : setCreatingCategory(true)
        setCreated(false)
        setUpdated(false)
        const data = { name: categoryName }
        if (editedCategory) {
            data._id = editedCategory._id
        }
        const response = await fetch('/api/categories', {
            method: editedCategory ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        setCategoryName('')
        fetchCategories()
        setEditedCategory(null)
        if (response.ok) {
            editedCategory ? setUpdated(true) : setCreated(true)
        }
        editedCategory ? setUpdatingCategory(false) : setCreatingCategory(false)
    }
 
    if (profileLoading) {
        return 'Loading profile...'
    }

    if (!profileData.admin) {
        return 'Not an admin'
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <Tabs isAdmin={true} />
            {created && <InfoBox bgcolor="bg-green-200">Category created!</InfoBox>}
            {updated && <InfoBox bgcolor="bg-green-200">Updated category!</InfoBox>}
            {creatingCategory && <InfoBox>Creating...</InfoBox>}
            {updatingCategory && <InfoBox>Updating...</InfoBox>}
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                       <label>
                        {editedCategory ? 'Update category' : 'Create category'}
                        {editedCategory && (
                            <>: <b>{editedCategory.name}</b></>
                        )}
                       </label>
                       <input 
                          type="text" 
                          value={categoryName}
                          onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button type="submit" className="border border-primary">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => {
                            setEditedCategory(null)
                            setCategoryName('')
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-4 text-sm text-gray-500">Edit category:</h2>
                {categories.length > 0 && categories.map(c => (
                    <button 
                      key={c._id} 
                      onClick={() => {
                        setEditedCategory(c)
                        setCategoryName(c.name)
                      }}
                      className="border rounded-xl 
                      p-2 px-4 flex justify-between gap-1 cursor-pointer mb-2"
                    >
                        <span>{c.name}</span>
                        <span onClick={(e) => handleDeleteCategory(e, c)}>x</span>
                    </button>
                ))}
            </div>
        </section>
    )
}