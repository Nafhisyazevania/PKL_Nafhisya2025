"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    CalendarDays,
    Upload,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProjectForm {
    judul: string;
    deskripsi: string;
    tanggal_buat: string;
    tanggal_selesai: string;
    jenis_projek: string;
    fw: string;
    dokum?: string;
}

export default function CreateProject() {
    const router = useRouter();

    const [project, setProject] = useState<ProjectForm>({
        judul: "",
        deskripsi: "",
        tanggal_buat: "",
        tanggal_selesai: "",
        jenis_projek: "",
        fw: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showBackDialog, setShowBackDialog] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            setSaving(true);

            let imageUrl = "";
            if (imageFile) {
                const fileExt = imageFile.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `project/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("dokum")
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from("dokum").getPublicUrl(filePath);
                imageUrl = data.publicUrl;
            }

            const { error } = await supabase.from("project").insert([
                {
                    judul: project.judul,
                    deskripsi: project.deskripsi,
                    tanggal_buat: project.tanggal_buat,
                    tanggal_selesai: project.tanggal_selesai,
                    jenis_projek: project.jenis_projek,
                    fw: project.fw,
                    dokum: imageUrl,
                },
            ]);

            if (error) throw error;

            setShowSaveDialog(true);
        } catch (error: any) {
            console.error("Error:", error.message);
            alert("Gagal menyimpan proyek: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8 py-16 flex justify-center relative">
            {/* Tombol Kembali */}
            <AlertDialog open={showBackDialog} onOpenChange={setShowBackDialog}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-blue-400 hover:bg-transparent transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Kembali</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-neutral-950 border border-blue-800 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-blue-400 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            Yakin ingin kembali?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                            Semua data yang belum disimpan akan hilang.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-blue-700 bg-neutral-950 text-blue-300 hover:bg-blue-800 hover:text-white">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => router.back()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Ya, kembali
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Form Card */}
            <div className="w-full max-w-2xl">
                <CardTitle className="text-2xl font-bold text-blue-400 flex items-center gap-2 mb-6 justify-center">
                    <Upload className="w-5 h-5" />
                    Tambah Proyek Baru
                </CardTitle>

                <Card className="bg-[#111827]/80 border border-blue-900/40 backdrop-blur-md shadow-lg shadow-blue-500/10">
                    <CardContent className="space-y-6 text-white p-6 sm:p-8">
                        <div>
                            <Label htmlFor="judul">Judul Proyek</Label>
                            <Input
                                id="judul"
                                name="judul"
                                value={project.judul}
                                onChange={handleChange}
                                placeholder="Masukkan judul proyek"
                                className="mt-2 bg-[#0d1324] border-blue-800/50 text-white placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                name="deskripsi"
                                value={project.deskripsi}
                                onChange={handleChange}
                                placeholder="Tuliskan deskripsi proyek"
                                className="mt-2 bg-[#0d1324] border-blue-800/50 text-white placeholder:text-gray-400"
                                rows={4}
                            />
                        </div>

                        {/* Tanggal */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="tanggal_buat">Tanggal Mulai</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <CalendarDays className="w-4 h-4 text-blue-400" />
                                    <Input
                                        type="date"
                                        id="tanggal_buat"
                                        name="tanggal_buat"
                                        value={project.tanggal_buat}
                                        onChange={handleChange}
                                        className="bg-[#0d1324] border-blue-800/50 text-white [&::-webkit-calendar-picker-indicator]:invert w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <CalendarDays className="w-4 h-4 text-blue-400" />
                                    <Input
                                        type="date"
                                        id="tanggal_selesai"
                                        name="tanggal_selesai"
                                        value={project.tanggal_selesai}
                                        onChange={handleChange}
                                        className="bg-[#0d1324] border-blue-800/50 text-white [&::-webkit-calendar-picker-indicator]:invert w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Jenis & Framework */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="jenis_projek">Jenis Projek</Label>
                                <Input
                                    id="jenis_projek"
                                    name="jenis_projek"
                                    value={project.jenis_projek}
                                    onChange={handleChange}
                                    placeholder="Contoh: Website, Mobile App"
                                    className="mt-2 bg-[#0d1324] border-blue-800/50 text-white placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <Label htmlFor="fw">Framework</Label>
                                <Input
                                    id="fw"
                                    name="fw"
                                    value={project.fw}
                                    onChange={handleChange}
                                    placeholder="Contoh: Next.js, Flutter, React"
                                    className="mt-2 bg-[#0d1324] border-blue-800/50 text-white placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Upload Gambar */}
                        <div>
                            <Label htmlFor="dokum">Upload Gambar (Dokum)</Label>
                            <Input
                                id="dokum"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-2 cursor-pointer bg-[#0d1324] border-blue-800/50 text-white file:bg-blue-700 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:hover:bg-blue-800"
                            />
                            {imageFile && (
                                <p className="text-sm text-blue-400 mt-1">
                                    {imageFile.name} siap diupload
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 p-6 sm:p-8">
                        <Button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md shadow-blue-500/20"
                        >
                            {saving ? "Menyimpan..." : "Simpan Proyek"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* ✅ Popup Notifikasi Berhasil */}
            <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <AlertDialogContent className="bg-neutral-950 border border-blue-800 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            Proyek Berhasil Disimpan!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                            Data proyek baru telah berhasil ditambahkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => router.push("/admin/portofolio-admin")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
