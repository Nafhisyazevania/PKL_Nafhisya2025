"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Folder, Info, Pencil, Trash2, FolderOpen } from "lucide-react";
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
    const [project, setProject] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const getProject = async () => {
        const { data, error } = await supabase.from("project").select("*");
        if (!error && data) setProject(data);
    };

    useEffect(() => {
        getProject();
    }, []);

    const handleDelete = async (id: number) => {
        setLoading(true);
        await supabase.from("project").delete().eq("id", id);
        setProject((prev) => prev.filter((item) => item.id !== id));
        setLoading(false);
    };

    const badgeColor = (jenis: string) => {
        if (jenis.toLowerCase().includes("pembelajaran"))
            return "bg-red-600/20 text-red-400 border border-red-600/30";
        if (jenis.toLowerCase().includes("projek"))
            return "bg-blue-600/20 text-blue-400 border border-blue-600/30";
        if (jenis.toLowerCase().includes("produk"))
            return "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30";
        return "bg-green-600/20 text-green-400 border border-green-600/30";
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 container mx-auto px-4 sm:px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-400">CRUD Portofolio</h1>
                    <Link href="/admin/portofolio-admin/create">
                        <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
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
                                className="relative bg-[#0d1324]/90 border border-blue-900/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:translate-y-1 hover:border-blue-600/40"
                            >
                                {/* Gambar */}
                                {item.dokum && (
                                    <div className="h-40 overflow-hidden px-5">
                                        <img
                                            src={
                                                item.dokum.startsWith("http")
                                                    ? item.dokum
                                                    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dokum/${item.dokum}`
                                            }
                                            alt={item.judul}
                                            className="rounded-lg w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-blue-100 text-lg font-semibold">
                                        <span className="truncate max-w-40">{item.judul}</span>
                                        <Badge className={`${badgeColor(item.jenis_projek)} text-xs`}>
                                            {item.jenis_projek}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3 text-neutral-300">
                                    <p className="text-sm text-neutral-400 line-clamp-3">
                                        {item.deskripsi.length > 200
                                            ? item.deskripsi.slice(0, 200) + "..."
                                            : item.deskripsi}
                                    </p>

                                    <div className="flex justify-between text-xs text-neutral-400 mt-4">
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="w-4 h-4 text-blue-400" />
                                            <span>{item.tanggal_buat}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Folder className="w-4 h-4 text-blue-400" />
                                            <span>{item.fw}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between pt-4 border-t border-neutral-800">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/portofolio-admin/detail?id=${item.id}`}>
                                            <Button variant="secondary" size="sm" className="flex gap-1 bg-blue-700 hover:bg-blue-800 text-white">
                                                <Info className="w-4 h-4" /> Detail
                                            </Button>
                                        </Link>

                                        <Link href={`/admin/portofolio-admin/edit?id=${item.id}`}>
                                            <Button variant="outline" size="sm" className="flex gap-1 bg-neutral-950 border-blue-400 text-blue-300 hover:bg-blue-100/40">
                                                <Pencil className="w-4 h-4" /> Edit
                                            </Button>
                                        </Link>
                                    </div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm" className="flex gap-1 bg-red-600 hover:bg-red-700">
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-[#0a0f1a] border border-blue-900/40 text-gray-200">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-red-400">Hapus Proyek Ini?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-gray-400">
                                                    Yakin ingin menghapus{" "}
                                                    <span className="text-blue-300 font-semibold">{item.judul}</span>? Data ini tidak bisa dikembalikan.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="bg-gray-700 hover:bg-gray-800 text-white">
                                                    Batal
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    disabled={loading}
                                                    onClick={() => handleDelete(item.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    {loading ? "Menghapus..." : "Hapus"}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
                                Tambah Sekarang
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
