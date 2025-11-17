"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Project {
    id: number;
    judul: string;
    created_at: string;
    status?: string;
}

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [totalProjects, setTotalProjects] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);

        const { count, error: countError } = await supabase
            .from("project")
            .select("*", { count: "exact", head: true });

        if (countError) console.error(countError);
        else setTotalProjects(count || 0);

        const { data, error } = await supabase
            .from("project")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(2);

        if (error) console.error(error);
        else setProjects(data || []);

        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();

        const channel = supabase
            .channel("realtime-projects")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "project" },
                () => fetchProjects()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-6 min-h-screen p-4 md:p-6 text-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Admin</h1>
                    <p className="text-gray-400">Kelola dan pantau semua proyek Anda</p>
                </div>
                <Button
                    asChild
                    className="bg-blue-700 hover:bg-blue-800 text-white shadow w-full md:w-auto"
                >
                    <Link href="/admin/portofolio-admin/create">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Proyek
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-neutral border border-blue-900/30 text-white shadow-lg">
                    <CardHeader>
                        <CardTitle>Total Proyek</CardTitle>
                        <CardDescription className="text-gray-400">
                            Jumlah semua proyek yang telah dibuat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl md:text-5xl font-bold">{totalProjects}</p>
                    </CardContent>
                </Card>

                <Card className="bg-neutral border border-blue-900/30 shadow-lg text-gray-100">
                    <CardHeader>
                        <CardTitle>Proyek Terbaru</CardTitle>
                        <CardDescription className="text-gray-400">
                            2 proyek terakhir yang dibuat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center items-center h-24">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
                            </div>
                        ) : projects.length === 0 ? (
                            <p className="text-gray-400">Belum ada proyek.</p>
                        ) : (
                            <ul className="space-y-4">
                                {projects.map((project) => (
                                    <li
                                        key={project.id}
                                        className="flex items-center justify-between border-b border-blue-900/30 pb-2"
                                    >
                                        <div>
                                            <p className="font-semibold text-white">
                                                {project.judul}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(
                                                    project.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-6 text-right">
                            <Button
                                asChild
                                variant="outline"
                                className="border-blue-400 text-blue-400 bg-neutral hover:text-white hover:bg-blue-900"
                            >
                                <Link href="/admin/portofolio-admin">Lihat Semua</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}