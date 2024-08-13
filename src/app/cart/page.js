"use client"
import { useContext, useEffect, useState } from "react";
import { SectionHeaders } from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../components/layout/AppProvider";
import Image from "next/image";
import pizza from '@/public/pizza.png'
import Trash from "../components/icons/Trash";
import AddressInputs from "../components/layout/AddressInputs";
import useProfile from "../components/useProfile";

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    let subtotal = 0
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p)
    }
    const [address, setAddress] = useState({})
    const { data: profileData} = useProfile()

    useEffect(() => {
        if (profileData?.city) {
            const { streetAddress, city, country, postalCode, phone } = profileData
            const addressFromProfile = { streetAddress, city, country, postalCode, phone }
            setAddress(addressFromProfile)
        }
    }, [profileData])

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({...prevAddress, [propName]: value}))
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in the shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 border-b py-2">
                            <div>
                                <Image src={pizza} alt='' width={80} height={80} />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm">
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map((extra, i) => (
                                            <div key={i}>{extra.name} ${extra.price}</div>
                                        ))} 
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                $ {cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button 
                                  type="button"
                                  onClick={() => removeCartProduct(index)}
                                  className="p-2"
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    )) 
                    }
                    <div className="py-2 text-right pr-16">
                        <span className="text-gray-500">Subtotal:</span> 
                        <span className="text-lg font-semibold pl-2">${subtotal}</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form>
                        <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
                        <button type="submit">Pay ${subtotal}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}