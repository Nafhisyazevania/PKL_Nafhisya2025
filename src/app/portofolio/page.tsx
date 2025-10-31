"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import SidebarPublic from "@/components/sidebar/SidebarPublic";
import { useRouter } from "next/navigation";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, CalendarDays, Folder, Image as ImageIcon, } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    const [filteredProject, setFilteredProject] = useState<Project[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");
    const router = useRouter();

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

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        if (value === "all") setFilteredProject(project);
        else setFilteredProject(project.filter((p) => p.jenis_projek === value));
    };
    
    const getBadgeColor = (jenis: string) => {
        switch (jenis.toLowerCase()) {
            case "pembelajaran":
                return "bg-red-500/20 text-red-400 border-red-500/40";
            case "produk":
            case "projek":
                return "bg-blue-500/20 text-blue-400 border-blue-500/40";
            default:
                return "bg-green-500/20 text-green-400 border-green-500/40";
        }
    };

    const getImageUrl = (path: string) => {
        if (!path) return "https://placehold.co/600x400?text=No+Image";
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dokum/${path}`;
    };

    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarPublic />

            <main className="flex-1 ml-4 p-6 bg-neutral-950 rounded-2xl overflow-y-auto custom-scroll">
                <div className="flex flex-col justify-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-400">Projek Saya</h1>
                    <p className="text-gray-400 mt-1">
                        Berikut adalah beberapa projek yang telah saya kerjakan selama PKL.
                    </p>
                </div>

                {/* Dropdown Filter */}
                <div className="flex justify-end mb-6">
                    <Select onValueChange={handleFilterChange} defaultValue="all">
                        <SelectTrigger className="w-[200px] bg-neutral-800 text-white border border-neutral-700">
                            <SelectValue placeholder="Pilih Jenis Projek" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                            <SelectItem value="all">Semua</SelectItem>
                            <SelectItem value="projek">Projek</SelectItem>
                            <SelectItem value="produk">Produk</SelectItem>
                            <SelectItem value="pembelajaran">Pembelajaran</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator className="mb-8 bg-neutral-800" />

                {filteredProject.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
                        {filteredProject.map((item) => (
                            <Card
                                key={item.id}
                                className="relative bg-[#0d1324]/90 border border-blue-900/30 shadow-lg 
                                hover:shadow-blue-500/20 transition-all duration-300 
                                hover:-translate-y-1 hover:border-blue-600/40 flex flex-col h-full"
                            >
                                {/* Gambar */}
                                {imageUrl ? (
                                    <div className="flex justify-center">
                                        <img
                                            src={imageUrl}
                                            alt="Dokumentasi Proyek"
                                            className="rounded-lg border border-blue-900/40 shadow-md shadow-blue-900/30 max-h-[400px] w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center border border-blue-900/40 rounded-lg h-56 bg-[#0d1324]">
                                        <div className="flex flex-col items-center text-neutral-400">
                                            <ImageIcon className="w-10 h-10 mb-2 text-blue-500" />
                                            <p>Tidak ada gambar proyek</p>
                                        </div>
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-blue-100 text-lg font-semibold">
                                        {item.judul}
                                        <Badge
                                            variant="outline"
                                            className={`text-xs border ${getBadgeColor(
                                                item.jenis_projek
                                            )}`}
                                        >
                                            {item.jenis_projek}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-3 text-neutral-300 grow">
                                    <p className="text-sm text-neutral-400 line-clamp-3">
                                        {item.deskripsi}
                                    </p>
                                    <div className="flex items-start gap-2 text-sm text-neutral-400">
                                        <CalendarDays className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span>
                                            {item.tanggal_buat} → {item.tanggal_selesai}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-neutral-400">
                                        <Folder className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span className="warp-break-words">{item.fw}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-end pt-4 border-t border-neutral-800">
                                    <Link href={`/portofolio/detail?id=${item.id}`}>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex gap-1 bg-blue-700 hover:bg-blue-800 text-white"
                                        >
                                            <Info className="w-4 h-4" /> Detail
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">Tidak ada data projek.</p>
                )}
            </main>
        </div>
    );
}
