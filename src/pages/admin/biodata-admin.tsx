
import SidebarPublic from "@/components/sidebar/SidebarAdmin";

export default function BiodataAdmin() {
    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarPublic />
            <main className="flex-1 ml-4 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
                <div className="flex flex-col justify-center items-center min-h-full">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Biodata
                    </h1>
                </div>

            </main>
        </div>
    );
}