'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

interface SupabaseContextType {
    user: User | null
    session: Session | null
    loading: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
    user: null,
    session: null,
    loading: true,
})

export const useSupabase = () => useContext(SupabaseContext)

export function SupabaseProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (!error) {
                setSession(data.session)
                setUser(data.session?.user ?? null)
            }
            setLoading(false)
        }
        init()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    return (
        <SupabaseContext.Provider value={{ user, session, loading }}>
            {children}
        </SupabaseContext.Provider>
    )
}
