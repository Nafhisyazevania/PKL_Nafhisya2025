"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import SidebarPublic from "@/components/sidebar/SidebarPublic";
import IPorjek from "@/types/projek";

export default function Portofolio() {
    const [projects, setProjects] = useState<IPorjek[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("projek")
                .select("*")
                .returns<IPorjek[]>();
            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjects(data || []);
            }
        };
        fetchData();
    }, []);

    const filtered = projects.filter((p) =>
        (p.judul || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <SidebarPublic />
            <h1 className="text-3xl font-bold mb-6 text-center">Daftar Proyek</h1>
            <div className="mb-6 max-w-md mx-auto">
                <Input
                    placeholder="Cari proyek..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                    <div key={p.id} className="border rounded-xl shadow p-4">
                        <h2 className="text-xl font-semibold mb-2">{p.judul}</h2>
                        <p className="text-sm text-gray-600 mb-3">{p.deskripsi}</p>
                        <p className="text-sm">Status: {p.status}</p>
                        <p className="text-sm mb-3">
                            {p.mulai} - {p.selesai || 'Sekarang'}
                        </p>
                        {Array.isArray(p.framework) && (
                            <div className="flex flex-wrap gap-2">
                                {p.framework.map((fw, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        {fw.url_logo && (
                                            <img
                                                src={fw.url_logo}
                                                alt={`Logo ${fw.nama}`}
                                                className="w-5 h-5 rounded"
                                            />
                                        )}
                                        <span className="text-sm">{fw.nama}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

