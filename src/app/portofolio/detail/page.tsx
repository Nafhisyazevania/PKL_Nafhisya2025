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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <p className="text-gray-900 text-lg font-medium">Proyek tidak ditemukan</p>
                    <Button
                        asChild
                        className="bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                    >
                        <a href="/portofolio">Kembali</a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <div className="mb-12">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 -ml-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                    </Button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Title and Meta */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {project.judul}
                        </h1>
                        
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                <span>{project.tanggal_buat || "-"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FolderGit2 className="w-4 h-4" />
                                <span>{project.jenis_projek || "-"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                <span>{project.fw || "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    {imageUrl ? (
                        <div className="aspect-video overflow-hidden rounded-2xl border border-gray-200">
                            <img
                                src={imageUrl}
                                alt="Dokumentasi Proyek"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="aspect-video flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                            <div className="flex flex-col items-center text-gray-400">
                                <ImageIcon className="w-12 h-12 mb-2" />
                                <p className="text-sm">Tidak ada gambar proyek</p>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Tentang Projek
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {project.deskripsi || "Tidak ada deskripsi"}
                        </p>
                    </div>

                    {/* Project Details */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Tanggal Mulai</p>
                            <p className="font-medium text-gray-900">{project.tanggal_buat || "-"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Tanggal Selesai</p>
                            <p className="font-medium text-gray-900">{project.tanggal_selesai || "-"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Jenis Projek</p>
                            <p className="font-medium text-gray-900">{project.jenis_projek || "-"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Framework/Tools</p>
                            <p className="font-medium text-gray-900">{project.fw || "-"}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
