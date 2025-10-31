"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CalendarDays,
    Code2,
    FolderGit2,
    Image as ImageIcon,
    ChevronLeft,
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

            if (error) {
                console.error(error.message);
            } else if (data) {
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
            }
            setLoading(false);
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-blue-200">
                Memuat detail proyek...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-200">
                Proyek tidak ditemukan.
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-10 text-gray-100 relative">
            <div className="absolute top-6 left-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white hover:text-blue-400 hover:bg-transparent transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Button>
            </div>

            <div className="flex flex-col items-center mt-12">
                <CardTitle className="text-3xl md:text-4xl font-bold text-blue-400 text-center mb-8">
                    {project.judul}
                </CardTitle>

                <Card className="bg-neutral-950 border-0">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300 gap-2">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-blue-400" />
                                <span>
                                    <strong>Mulai:</strong> {project.tanggal_buat || "-"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-blue-400" />
                                <span>
                                    <strong>Selesai:</strong> {project.tanggal_selesai || "-"}
                                </span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-2">
                        {imageUrl ? (
                            <div className="flex justify-center">
                                <img
                                    src={imageUrl}
                                    alt="Dokumentasi Proyek"
                                    className="max-h-[400px] w-full object-contain rounded-xl border border-blue-900/40 shadow-md shadow-blue-900/20 transition-transform hover:scale-[1.02] duration-300"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-56 border border-blue-900/40 rounded-lg">
                                <div className="flex flex-col items-center text-neutral-300">
                                    <ImageIcon className="w-10 h-10 mb-2 text-blue-500" />
                                    <p>Tidak ada gambar proyek</p>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-200 gap-2">
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

                        <div>
                            <h3 className="text-lg font-semibold text-blue-300 mb-2 text-center sm:text-left">
                                Deskripsi
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-justify">
                                {project.deskripsi || "-"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
