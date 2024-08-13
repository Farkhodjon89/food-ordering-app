"use client"
import { useState, useEffect } from "react"

export default function useProfile() {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data)
                setLoading(false)
            })
        })
    }, [])

    return { data, loading }

}