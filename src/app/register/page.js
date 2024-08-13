"use client"
import Image from "next/image";
import google from '@/public/google.png'
import { useState } from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userCreated, setUserCreated] = useState(false)
    const [creatingUser, setCreatingUser] = useState(false)
    const [error, setError] = useState(false)

    const handleFormSubmit = async (e) => {    // sending request to our register route
        e.preventDefault();
        setCreatingUser(true)
        const response = await fetch('/api/register', {
             method: 'POST',
             body: JSON.stringify({email, password}),
             headers: {'Content-Type': 'application/json'}
            })
        if (response.ok) {
            setUserCreated(true)
            setEmail('')
            setPassword('')
        } else {
            setError(true)
            setUserCreated(false)
        }
        setCreatingUser(false)
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created <br /> now you can{' '} 
                    <Link className="underline" href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div className="text-center">
                    An error has occured <br /> Please try a bit later
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input 
                   type="email" 
                   placeholder="email" 
                   disabled={creatingUser}
                   value={email} 
                   onChange={e => setEmail(e.target.value)}
                />
                <input 
                   type="password" 
                   placeholder="password" 
                   disabled={creatingUser}
                   value={password} 
                   onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="text-center my-4 text-gray-500">
                    or login with provider
                </div>
                <button 
                   type="button"
                   className="flex items-center justify-center gap-4"
                   onClick={() => signIn('google', { callbackUrl: '/' })}
                >
                    <Image src={google} alt="Google" width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t py-4">
                    Existing account? {' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}