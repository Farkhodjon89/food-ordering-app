"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { CartContext } from './AppProvider'
import Cart from '../icons/Cart'
import Bars2 from '../icons/Bars2'

function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'}>{userName}</Link>
        <button  
          onClick={() => signOut()}
          className="bg-primary border-0 rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
    </>
    )
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Link href='/login'>
          Login
        </Link>
        <Link 
          href='/register' 
          className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    )
  }
}

export const Header = () => {
  const session = useSession()
  const status = session.status
  const userData = session?.data?.user
  let userName = userData?.name || userData?.email
  const { cartProducts } = useContext(CartContext)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  if (userName?.includes(' ')) {
    userName = userName.split(' ')[0]
  }

  return (
    <header>
        <div className='flex items-center md:hidden justify-between'>
          <Link className="text-primary font-semibold text-2xl" href='/'>
             ST PIZZA
          </Link>
          <div className='flex gap-8 items-center'>
            <Link href={'/cart'} className='relative'>
              <Cart />
              <span className='absolute -top-2 -right-3 p-1 rounded-full leading-3 bg-primary text-white text-xs'>
                {cartProducts.length}
              </span>
            </Link>
            <button className='p-1' onClick={() => setMobileNavOpen(prev => !prev)}>
              <Bars2 />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div 
            onClick={() => setMobileNavOpen(false)}
            className='md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'
        >
          <Link href='/'>Home</Link>
          <Link href='/menu'>Menu</Link>
          <Link href='/#about'>About</Link>
          <Link href='/#contact'>Contacts</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
        )}
        
        <div className="hidden md:flex items-center justify-between">
        <nav className="flex gap-8 items-center text-gray-600 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href='/'>
            ST PIZZA
          </Link>
          <Link href='/'>Home</Link>
          <Link href='/menu'>Menu</Link>
          <Link href='/#about'>About</Link>
          <Link href='/#contact'>Contacts</Link>
        </nav>
        <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className='relative'>
            <Cart />
            <span className='absolute -top-2 -right-3 p-1 rounded-full leading-3 bg-primary text-white text-xs'>
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
