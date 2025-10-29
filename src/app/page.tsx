import SidebarPublic from "@/components/sidebar/SidebarPublic";

export default function Home() {
  return (
    <div className="flex h-screen bg-neutral-900 p-4">
      <SidebarPublic />
      <main className="flex-1 ml-4 p-6 bg-gray-100 rounded-2xl overflow-y-auto">
        <div className="flex flex-col justify-center items-center min-h-full">
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat Datang di Website Publik
          </h1>
          <p className="text-gray-600 mt-2">
            Semua orang bisa melihat halaman ini tanpa login.
          </p>
        </div>
      </main>
    </div>
  );
}

