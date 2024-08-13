"use client"
import Image from "next/image"
import sallad1 from '@/public/sallad1.png'
import sallad2 from '@/public/sallad2.png'
import { MenuItem } from "../menu/MenuItem"
import { SectionHeaders } from "./SectionHeaders"
import { useEffect, useState } from "react"

export const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems)
      })
    })
  }, [])

  return (
    <section>
        <div className="absolute left-0 right-0 w-full justify-start">
          <div className="absolute left-0 text-left -top-[70px] -z-10">
              <Image src={sallad1} alt='sallad' width={109} height={189} />
          </div>
          <div className="absolute right-0 -top-[100px] -z-10">
              <Image src={sallad2} alt='sallad' width={107} height={195} />
          </div>
        </div>
        <div className="text-center mb-4">
          <SectionHeaders subHeader='Checkout' mainHeader='Our best sellers' />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
            {bestSellers?.length > 0 && bestSellers.map(item => (
              <MenuItem {...item} key={item._id} />
            ))}
        </div>
    </section>
  )
}
