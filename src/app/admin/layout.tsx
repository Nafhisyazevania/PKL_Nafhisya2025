import SidebarAdmin from "@/components/sidebar/SidebarAdmin";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarAdmin />
            <main className="flex-1 ml-4 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

