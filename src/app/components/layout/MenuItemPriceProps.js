"use client"
import { useState } from "react"
import ChevronDown from "../icons/ChevronDown"
import ChevronUp from "../icons/ChevronUp"

export default function MenuItemPriceProps({ name, props, setProps, addLabel }) {
    const [isOpen, setIsOpen] = useState(false)

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0}]
        })
    }

    function editProp(e, index, prop) {
        const newValue = e.target.value
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }

    function removeProp(index) {
        setProps(prev => prev.filter((v, i) => i !== index))
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
               onClick={() => setIsOpen(prev => !prev)}
               className="inline-flex p-1 border-0 justify-start"
               type="button"
            >
                {isOpen && <ChevronUp />}
                {!isOpen && <ChevronDown />}
                <span className="ml-2">{name}</span>
                <span>({props.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
            {props?.length > 0 && props.map((size, index) => (
                <div className="flex gap-2 items-end" key={index}>
                    <div>
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="Size name" 
                            value={size.name} 
                            onChange={e => editProp(e, index, 'name')}
                        />
                    </div>
                    <div>
                        <label>Extra price</label>
                        <input 
                            type="text" 
                            placeholder="Extra price" 
                            value={size.price} 
                            onChange={e => editProp(e, index, 'price')}
                        />
                    </div>
                    <div>
                        <button 
                            type="button" 
                            className="bg-white mb-2"
                            onClick={() => removeProp(index)}
                        >
                            x
                        </button>
                    </div>
                </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white"
                >
                    {addLabel}
                </button>
            </div>
        </div>
    )
}