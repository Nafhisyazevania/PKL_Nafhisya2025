import { redirect } from "next/navigation";
import { createClient } from "./supabaseServer";

export const requireAuthentication = async () => {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
        redirect('/login')
    }

    return data.user
}