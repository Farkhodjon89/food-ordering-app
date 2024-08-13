"use client"
import { useEffect, useState } from "react"
import EditableLink from "./EditableImage"
import MenuItemPriceProps from "./MenuItemPriceProps"

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState('')
    const [name, setName] = useState(menuItem?.name || '')
    const [description, setDescription] = useState(menuItem?.description || '')
    const [price, setPrice] = useState(menuItem?.price || '')
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [category, setCategory] = useState(menuItem?.category || '')
    const [ingredients, setIngredients] = useState(menuItem?.ingredients || [])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }, [])

    return (
        <form onSubmit={e => onSubmit(e, {
            image, name, description, price, sizes, ingredients, category
            })} className="mt-8">
                <div className="md:flex gap-4 items-start">
                    <div>
                        <EditableLink link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input 
                          type="text" 
                          value={name} 
                          onChange={e => setName(e.target.value)} 
                        />
                        <label>Description</label>
                        <input 
                          type="text"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                        />
                        <label>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            {categories?.length > 0 && categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label>Price</label>
                        <input
                          type="text" 
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                        />
                        <MenuItemPriceProps
                           name='Sizes' 
                           props={sizes} 
                           setProps={setSizes} 
                           addLabel='Add item size'
                        />
                        <MenuItemPriceProps 
                          name='Ingredients' 
                          props={ingredients}
                          setProps={setIngredients}
                          addLabel='Add ingerient prices'
                        />
                        <button type="submit">Save</button>
                    </div>
                </div>
        </form>
    )
}