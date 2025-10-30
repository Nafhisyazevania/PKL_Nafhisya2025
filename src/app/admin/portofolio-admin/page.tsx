"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    PlusCircle,
    Pencil,
    Trash2,
    CalendarDays,
    Folder,
    Info,
    FolderOpen,
} from "lucide-react";

interface Project {
    id: number;
    judul: string;
    tanggal_buat: string;
    tanggal_selesai: string;
    jenis_projek: string;
    fw: string;
    dokum: string;
    deskripsi: string;
}

export default function PortofolioAdminPage() {
    const [project, setProject] = useState<Project[]>([]);

    const getProject = async () => {
        const { data, error } = await supabase.from("project").select("*");
        if (error) {
            console.error("Error fetching data:", error.message);
        } else if (data) {
            setProject(data);
        }
    };

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="flex flex-col text-neutral-100">
            <div className="flex-1 container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
                        CRUD Portofolio
                    </h1>
                    <Link href='/admin/portofolio-admin/create'>
                        <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                            <PlusCircle className="w-4 h-4" />
                            Tambah Proyek
                        </Button>
                    </Link>
                </div>

                <Separator className="mb-8 bg-neutral-800" />

                {project.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {project.map((item) => (
                            <Card
                                key={item.id}
                                className="relative bg-linear-to-b from-[#0d0f18] via-[#0c1324] to-[#0a0f1f] border-blue-900/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-1 hover:border-blue-600/40"
                            >
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-blue-100 text-lg font-semibold">
                                        {item.judul}
                                        <Badge variant="outline" className="text-xs border-blue-400 text-blue-300">
                                            {item.jenis_projek}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3 text-neutral-300">
                                    <p className="text-sm text-neutral-400 line-clamp-3">{item.deskripsi}</p>
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <CalendarDays className="w-4 h-4 text-blue-400" />
                                        <span>
                                            {item.tanggal_buat} → {item.tanggal_selesai}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <Folder className="w-4 h-4 text-blue-400" />
                                        <span>{item.fw}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between pt-4 border-t border-neutral-800">
                                    <div className="flex gap-2">
                                        <Link href={`id/detail`}>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex gap-1 bg-blue-700 hover:bg-blue-800 text-white"
                                            >
                                                <Info className="w-4 h-4" /> Detail
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/portofolio-admin/${item.id}/edit`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex gap-1 border-blue-400 text-blue-300 hover:bg-blue-900/40"
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Button>
                                        </Link>
                                    </div>
                                    <Link href={`/admin/portofolio-admin/${item.id}/delete`}>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex gap-1 bg-red-600 hover:bg-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 text-neutral-400">
                        <FolderOpen className="w-12 h-12 mb-3 text-blue-500" />
                        <p className="text-lg">Belum ada data proyek</p>
                        <Link href="/admin/portofolio-admin/create">
                            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white flex gap-2 shadow-blue-500/30 shadow-md">
                                <PlusCircle className="w-4 h-4" /> Tambah Sekarang
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
