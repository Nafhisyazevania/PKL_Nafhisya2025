"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
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
            <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a] text-blue-300">
                Memuat detail proyek...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-400">
                Proyek tidak ditemukan.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center px-4 py-10">
            {/* Tombol Back */}
            <div className="w-full max-w-3xl mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white hover:text-blue-400 hover:bg-transparent"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl"
            >
                <Card className="border border-blue-800/30 bg-transparent shadow-lg shadow-blue-900/20">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-blue-400">
                            {project.judul}
                        </CardTitle>

                        {/* Tanggal */}
                        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-blue-400" />
                                <span>
                                    <strong>Mulai:</strong> {project.tanggal_buat || "-"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-blue-400" />
                                <span>
                                    <strong>Selesai:</strong> {project.tanggal_selesai || "-"}
                                </span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 mt-4">
                        {/* Gambar Proyek */}
                        {imageUrl ? (
                            <div className="flex justify-center">
                                <img
                                    src={imageUrl}
                                    alt="Dokumentasi Proyek"
                                    className="rounded-xl border border-blue-900/30 shadow-lg shadow-blue-900/30 max-h-[400px] w-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center border border-blue-900/30 rounded-lg h-56">
                                <div className="flex flex-col items-center text-gray-400">
                                    <ImageIcon className="w-10 h-10 mb-2 text-blue-500" />
                                    <p>Tidak ada gambar proyek</p>
                                </div>
                            </div>
                        )}

                        {/* Deskripsi */}
                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-1">
                                Deskripsi
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {project.deskripsi || "-"}
                            </p>
                        </div>

                        {/* Info Projek */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2">
                                <FolderGit2 className="w-5 h-5 text-blue-400" />
                                <span>
                                    <strong>Jenis Projek:</strong> {project.jenis_projek || "-"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-blue-400" />
                                <span>
                                    <strong>Framework:</strong> {project.fw || "-"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
