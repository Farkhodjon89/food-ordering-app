import Link from "next/link";
import { Hero } from "./components/layout/Hero";
import { HomeMenu } from "./components/layout/HomeMenu";
import { SectionHeaders } from "./components/layout/SectionHeaders";

export default function Home() {
  return (
     <>
       <Hero />
       <HomeMenu />
       <section className="text-center my-16" id="about">
          <SectionHeaders subHeader='Our story' mainHeader='About Us' />
       
       <div className="text-gray-500 max-w-md mx-auto text-center mt-4 flex-col gap-4">
          <p>
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
          </p>
          <p>
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
           lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
          </p>
       </div>
       </section>
       <section className="text-center my-16" id="contact">
        <SectionHeaders subHeader='Don`t hesitate' mainHeader='Contact Us' />
        <div className="mt-8">
           <Link className="text-4xl underline text-gray-500" href='tel:+45 654 345'>+45 654 345</Link>
        </div>
       </section>
     </>
  );
}
