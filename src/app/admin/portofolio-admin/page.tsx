"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Folder, Info, Pencil, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const getProjects = async () => {
        const { data, error } = await supabase.from("project").select("*");
        if (!error && data) setProjects(data);
    };

    useEffect(() => {
        getProjects();
    }, []);

    const handleDelete = async (id: number) => {
        setLoading(true);
        await supabase.from("project").delete().eq("id", id);
        setProjects((prev) => prev.filter((item) => item.id !== id));
        setLoading(false);
    };

    const getBadgeColor = (jenis: string) => {
        switch (jenis.toLowerCase()) {
            case "pembelajaran":
                return "bg-amber-50/10 text-amber-400 border border-amber-600/30 hover:bg-amber-400/10";
            case "produk":
                return "bg-violet-50/10 text-violet-400 border border-violet-600/30 hover:bg-violet-400/10";
            case "projek":
                return "bg-sky-50/10 text-sky-400 border border-sky-600/30 hover:bg-sky-400/10";
            default:
                return "bg-emerald-50/10 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-400/10";
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-8 md:px-6 md:py-10 text-gray-100">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Proyek</h1>
                        <p className="text-gray-400 text-sm">
                            Kelola semua proyek Anda di sini
                        </p>
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

                <Separator className="mb-8 bg-blue-900/40" />

                {/* Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map((item) => (
                            <Card
                                key={item.id}
                                className="group bg-neutral border border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden rounded-2xl"
                            >
                                {/* Image */}
                                {item.dokum ? (
                                    <div className="aspect-video overflow-hidden bg-gray-800">
                                        <img
                                            src={
                                                item.dokum.startsWith("http")
                                                    ? item.dokum
                                                    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dokum/${item.dokum}`
                                            }
                                            alt={item.judul}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video flex items-center justify-center bg-gray-800">
                                        <ImageIcon className="w-10 h-10 text-gray-500" />
                                    </div>
                                )}

                                <CardContent className="p-5 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold text-white group-hover:text-gray-200 transition-colors truncate">
                                            {item.judul}
                                        </h3>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs shrink-0 ${getBadgeColor(item.jenis_projek)}`}
                                        >
                                            {item.jenis_projek}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                        {item.deskripsi}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="w-3.5 h-3.5 text-blue-400" />
                                            {item.tanggal_buat}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Folder className="w-3.5 h-3.5 text-blue-400" />
                                            {item.fw}
                                        </span>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 border-t border-gray-800 pt-4">
                                    <div className="grid grid-cols-2 gap-2 sm:flex sm:w-auto w-full">
                                        <Link href={`/admin/portofolio-admin/detail?id=${item.id}`}>
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 w-full"
                                            >
                                                <Info className="w-4 h-4" /> Detail
                                            </Button>
                                        </Link>

                                        <Link href={`/admin/portofolio-admin/edit?id=${item.id}`}>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-blue-400 text-blue-400 bg-neutral hover:text-blue-300 hover:bg-blue-400/10 flex items-center gap-1 w-full"
                                            >
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Button>
                                        </Link>
                                    </div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                // [UBAH] Tombol Hapus dibuat w-full di mobile dan w-auto di sm
                                                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 w-full sm:w-auto"
                                            >
                                                <Trash2 className="w-4 h-4" /> Hapus
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-gray-900 border border-gray-700 text-gray-200">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Hapus Proyek?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Proyek <span className="font-semibold">{item.judul}</span> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300">
                                                    Batal
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">Belum ada projek tersedia.</div>
                )}
            </div>
        </div>
    );
}