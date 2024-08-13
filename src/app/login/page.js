"use client"
import { useState } from "react"
import {signIn} from "next-auth/react";
import Image from "next/image"
import google from '@/public/google.png'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoginInProgress(true)

        await signIn('credentials', {email, password, callbackUrl: '/'})

        setLoginInProgress(false)
    }   

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input 
                   type="email" 
                   placeholder="email" 
                   disabled={loginInProgress}
                   value={email} 
                   name="email"
                   onChange={e => setEmail(e.target.value)}
                />
                <input 
                   type="password" 
                   placeholder="password" 
                   disabled={loginInProgress}
                   value={password} 
                   name="password"
                   onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="text-center my-4 text-gray-500">
                    or login with provider
                </div>
                <button
                   type="button"
                   onClick={() => signIn('google', {callbackUrl: '/' })}
                   className="flex items-center justify-center gap-4"
                >
                    <Image src={google} alt="Google" width={24} height={24} />
                    Login with Google
                </button>
            </form>
        </section>
    )
}