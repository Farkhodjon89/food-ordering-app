import pizza from '@/public/pizza.png'
import Image from "next/image"
import AddToCartButton from './AddToCartButton'

export const MenuItemTile = ({ onAddToCart, ...item }) => {
    const {name, description, price, sizes, ingredients} = item
    const hasSizesOrExtras = sizes?.length > 0 || ingredients?.length > 0

    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center
        hover:bg-white hover:shadow-md hover:shadow-black/50 transition-all"
        >
        <div className='text-center'>
          <Image src={pizza} alt="pizza" width={200} height={200} className='mx-auto'/>
        </div>
        <h4 className="font-semibold my-2">{name}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
        <AddToCartButton price={price} onClick={onAddToCart} hasSizesOrExtras={hasSizesOrExtras} />
      </div>
    )
}