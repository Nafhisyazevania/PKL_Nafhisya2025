
import { supabase } from '@/lib/supabaseClient' // Masih perlu untuk logout
import { useRouter } from 'next/router' // Masih perlu untuk logout
import SidebarAdmin from '@/components/sidebar/SidebarAdmin'

export default function DashboardAdmin() {

    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarAdmin />
            <main className="flex-1 ml-4 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
                <div className="flex flex-col justify-center items-center min-h-full">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Selamat Datang di Website Admin
                    </h1>
                </div>
            </main>
        </div>
    )
}