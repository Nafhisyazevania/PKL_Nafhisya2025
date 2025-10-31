"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    CalendarDays,
    Code2,
    FolderGit2,
    Image as ImageIcon,
} from "lucide-react";

interface ProjectDetail {
    id: string;
    judul: string;
    deskripsi: string;
    tanggal_buat: string;
    tanggal_selesai: string;
    jenis_projek: string;
    fw: string;
    dokum?: string;
}

export default function DetailProject() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            const { data, error } = await supabase
                .from("project")
                .select("*")
                .eq("id", id)
                .single();

            if (!error && data) {
                setProject(data);
                if (data.dokum) {
                    if (data.dokum.startsWith("http")) {
                        setImageUrl(data.dokum);
                    } else {
                        const { data: publicUrlData } = supabase.storage
                            .from("dokum")
                            .getPublicUrl(data.dokum);
                        setImageUrl(publicUrlData.publicUrl);
                    }
                }
            } else {
                console.error(error);
            }
            setLoading(false);
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-900 border-t-blue-500 mx-auto mb-3"></div>
                    <p className="text-blue-300 text-sm">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617] text-blue-200">
                <div className="text-center space-y-4">
                    <p className="text-base font-medium">Proyek tidak ditemukan</p>
                    <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm px-4 py-2"
                    >
                        <a href="/portofolio">Kembali</a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
            <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {/* Tombol Kembali */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-blue-400 hover:text-white hover:bg-blue-900/40 -ml-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                    </Button>
                </div>

                {/* Konten Detail */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                >
                    {/* Judul dan Info */}
                    <div className="space-y-3 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 warp-break-words">
                            {project.judul}
                        </h1>

                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs sm:text-sm text-blue-300">
                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-blue-500" />
                                <span>{project.tanggal_buat || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FolderGit2 className="w-4 h-4 text-blue-500" />
                                <span>{project.jenis_projek || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Code2 className="w-4 h-4 text-blue-500" />
                                <span>{project.fw || "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Gambar */}
                    {imageUrl ? (
                        <div className="aspect-video overflow-hidden rounded-xl border border-blue-900/60 shadow-md shadow-blue-900/20">
                            <img
                                src={imageUrl}
                                alt="Dokumentasi Proyek"
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                            />
                        </div>
                    ) : (
                        <div className="aspect-video flex items-center justify-center rounded-xl border border-blue-900/60 bg-blue-950/30">
                            <div className="flex flex-col items-center text-blue-400">
                                <ImageIcon className="w-10 h-10 mb-2" />
                                <p className="text-xs sm:text-sm">Tidak ada gambar proyek</p>
                            </div>
                        </div>
                    )}

                    {/* Deskripsi */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-blue-400">
                            Tentang Projek
                        </h2>
                        <p className="text-sm sm:text-base text-blue-100 leading-relaxed text-justify">
                            {project.deskripsi || "Tidak ada deskripsi"}
                        </p>
                    </div>

                    {/* Detail Tambahan */}
                    <Card className="bg-blue-950/20 border border-blue-900/50 rounded-xl">
                        <CardHeader>
                            <h3 className="text-base sm:text-lg font-semibold text-blue-300">
                                Detail Projek
                            </h3>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-1">
                                <p className="text-xs text-blue-300/80">Tanggal Mulai</p>
                                <p className="font-medium text-sm sm:text-base text-white">
                                    {project.tanggal_buat || "-"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-blue-300/80">Tanggal Selesai</p>
                                <p className="font-medium text-sm sm:text-base text-white">
                                    {project.tanggal_selesai || "-"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-blue-300/80">Jenis Projek</p>
                                <p className="font-medium text-sm sm:text-base text-white">
                                    {project.jenis_projek || "-"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-blue-300/80">Framework/Tools</p>
                                <p className="font-medium text-sm sm:text-base text-white">
                                    {project.fw || "-"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
    );
}
