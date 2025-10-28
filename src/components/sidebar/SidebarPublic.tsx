"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import SidebarPublic from "@/components/sidebar/SidebarPublic";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Framework {
    nama: string;
    url_logo: string;
}

interface Project {
    id: string;
    judul: string;
    status: string;
    framework: Framework[] | null;
    deskripsi: string;
    mulai: string;
    selesai: string;
}

export default function Portofolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from("projek").select("*");
            if (error) console.error(error);
            else setProjects(data || []);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filtered = projects.filter((p) =>
        p.judul?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Sidebar di kiri */}
            <SidebarPublic />

            {/* Konten utama */}
            <main className="flex-1 ml-0 md:ml-[250px] p-6 md:p-10 transition-all">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 text-center md:text-left">
                        Daftar Proyek
                    </h1>

                    {/* Input pencarian */}
                    <div className="mb-8 max-w-md">
                        <Input
                            placeholder="Cari proyek..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="animate-spin text-blue-500" size={32} />
                        </div>
                    ) : filtered.length === 0 ? (
                        <p className="text-center text-neutral-500 dark:text-neutral-400">
                            Tidak ada proyek ditemukan.
                        </p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((p) => (
                                <Card
                                    key={p.id}
                                    className="hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                            {p.judul}
                                        </CardTitle>
                                        <Badge
                                            className={
                                                p.status === "Selesai"
                                                    ? "bg-green-600 text-white"
                                                    : "bg-yellow-500 text-white"
                                            }
                                        >
                                            {p.status}
                                        </Badge>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                                            {p.deskripsi}
                                        </p>
                                        <p className="text-xs text-neutral-500 mb-4">
                                            {p.mulai} — {p.selesai}
                                        </p>

                                        {/* Framework */}
                                        {Array.isArray(p.framework) && p.framework.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {p.framework.map((fw, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-full px-3 py-1"
                                                    >
                                                        {fw.url_logo && (
                                                            <img
                                                                src={fw.url_logo}
                                                                alt={fw.nama}
                                                                className="w-5 h-5 rounded-full"
                                                            />
                                                        )}
                                                        <span className="text-xs text-neutral-800 dark:text-neutral-200">
                                                            {fw.nama}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
