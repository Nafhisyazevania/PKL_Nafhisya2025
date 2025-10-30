import SidebarAdmin from "@/components/sidebar/SidebarAdmin";
import { requireAuthentication } from "@/lib/require-utils";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAuthentication();
    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarAdmin />
            <main className="flex-1 ml-4 p-6 bg-neutral-950 rounded-2xl overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

