import Image from "next/image"
import pizza from '@/public/pizza.png'
import Right from "../icons/Right"
 
export const Hero = () => {
  return (
    <section className="hero md:mt-8">
        <div className="py-8 md:py-12">
           <h1 className="text-4xl font-semibold">
             Everything<br /> is better<br /> with a <span className="text-primary">Pizza</span>
           </h1>
           <p className="my-6 text-gray-500 text-sm">
             Pizza is the missing piece that makes
             everyday complete, a simple yet delicious
             joy in life
           </p>
           <div className="flex gap-4 text-sm">
            <button className="bg-primary items-center uppercase text-white flex
             gap-2 px-4 py-2 rounded-full justify-center border-0">
                Order now
                <Right />
            </button>
            <button className="flex items-center gap-2
             border-0 px-4 font-semibold gap- py-2 text-gray-600">
                Learn more
                <Right />
            </button>
           </div>
        </div>
        <div className="relative hidden md:block">
          <Image src={pizza} alt='pizza' layout="fill" objectFit="contain" />
        </div>
    </section>
  )
}
