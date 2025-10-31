"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Project {
    id: number;
    judul: string;
    tanggal_buat: string;
}

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("project")
                .select("*")
                .order("tanggal_buat", { ascending: false })
                .limit(5);

            if (error) {
                console.error(error);
            } else {
                setProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Proyek Card */}
            <Card className="bg-blue-800 text-white">
                <CardHeader>
                    <CardTitle>Total Proyek</CardTitle>
                    <CardDescription>Jumlah semua proyek yang telah dibuat</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{projects.length}</p>
                </CardContent>
            </Card>

            {/* Proyek Terbaru Card */}
            <Card className="bg-white shadow">
                <CardHeader>
                    <CardTitle>Proyek Terbaru</CardTitle>
                    <CardDescription>3 proyek terakhir yang dibuat</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="space-y-2">
                            {projects.map((project) => (
                                <li key={project.id} className="border-b pb-2">
                                    <p className="font-semibold">{project.judul}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(project.tanggal_buat).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
