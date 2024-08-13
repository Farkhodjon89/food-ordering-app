import { useContext, useState } from 'react'
import { CartContext } from '../layout/AppProvider'
import { MenuItemTile } from './MenuItemTile'
import Image from 'next/image'
import pizza from '@/public/pizza.png'

export const MenuItem = (menuItem) => {
  const { name, sizes, description, price, ingedients } = menuItem
  const [showPopup, setShowPopup] = useState(false)
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const { addToCart } = useContext(CartContext)

  const handleAddToCartButtonClick = () => {
    const hasOptions = sizes?.length > 0 || ingedients?.length > 0
    if (hasOptions && !showPopup) {
      setShowPopup(true)
      return
    }
    addToCart(menuItem, selectedSize, selectedExtras)
    onHidePopup()
  }

  const handleExtraThingClick = (e, extraThing) => {
    const checked = e.target.checked
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing])
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name)
      })
    }
  }

  let selectedPrice = price
  if (selectedSize) {
    selectedPrice += selectedSize.price
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price
    }
  }

  const onHidePopup = () => {
    setShowPopup(false)
  }

  const onContentClick = (e) => {
    e.stopPropagation()
  }
  
  return (
    <>
      {showPopup && (
        <div 
          onClick={onHidePopup} 
          className='fixed inset-0 bg-black/80 flex justify-center items-center'
        >
          <div onClick={onContentClick} className='bg-white p-4 rounded-lg max-w-md'>
             <Image src={pizza} alt={name} width={300} height={50} />
             <h2 className='text-center text-lg font-bold mb-2'>{name}</h2>
             <p className='text-center mb-2'>{description}</p>
             {sizes?.length > 0 && (
              <div className='py-2'>
                <h3 className='text-center text-gray-700'>Pick your size</h3>
                {sizes.map(size => (
                  <label key={size._id} className='flex items-center gap-1 p-4 border rounded-md mb-1'>
                    <input 
                      type='radio' 
                      onChange={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                      name={size} /> 
                      {size.name} 
                      ${price + size.price}
                  </label>
                ))}
              </div>
             )}
             {ingedients?.length > 0 && (
                <div className='py-2'>
                  <h3 className='text-center text-gray-800'>Any extras?</h3>
                  {ingedients.map(ingedient => (
                  <label key={ingedient._id} className='flex items-center gap-1 p-4 border rounded-md mb-1'>
                    <input 
                      type='checkbox' 
                      onClick={(e) => handleExtraThingClick(e, ingedient)}
                      name={ingedient.name} /> 
                      {ingedient.name} 
                      +${ingedient.price}
                  </label>
                  ))}
                </div>
             )}
             <button 
               type='button' 
               onClick={handleAddToCartButtonClick}
               className='bg-primary text-white border-0 sticky bottom-2'
             >
               Add to cart {selectedPrice}
             </button>
             <button className='mt-2' onClick={onHidePopup}>Cancel</button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
    
  )
}
