"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import NavigationBar from "@/components/NavigationBar";
import { motion } from "framer-motion";

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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Info,
    CalendarDays,
    Folder,
    Image as ImageIcon,
    Mail,
    Instagram,
    Github,
    MapPin,
    Briefcase,
    GraduationCap,
    ArrowRight,
    Sparkles,
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

export default function PortofolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    const getProjects = async () => {
        const { data, error } = await supabase.from("project").select("*");
        if (error) {
            console.error("Error fetching data:", error.message);
        } else if (data) {
            setProjects(data);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const getBadgeColor = (jenis: string) => {
        switch (jenis.toLowerCase()) {
            case "pembelajaran":
                return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
            case "produk":
                return "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100";
            case "projek":
                return "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100";
            default:
                return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <NavigationBar />

            {/* Hero Section */}
            <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600 tracking-wide uppercase">
                                Portfolio 2025
                            </p>
                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
                                Nafhisya Zevania
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 font-light">
                                UI/UX Designer
                            </p>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                            Saya fokus merancang pengalaman digital yang intuitif dan menyenangkan.
                            Saat ini sedang magang di PT. Hummatech sebagai UI/UX Designer.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button
                                size="lg"
                                className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8"
                                onClick={() => {
                                    const element = document.getElementById("projects");
                                    element?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Lihat Karya Saya
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full px-8"
                                asChild
                            >
                                <Link href="/biodata">Selengkapnya</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-16">
                            <p className="text-sm font-medium text-gray-500 mb-2">Tentang Saya</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Pelajar yang sedang eksplorasi dunia desain
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                                    <img 
                                        src="/pica.jpeg" 
                                        alt="Nafhisya Zevania" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                        Halo! Saya Nafhisya, biasa dipanggil Pica. Saat ini saya siswa kelas 12 
                                        jurusan RPL di SMK Negeri 8 Malang dan sedang menjalani magang di PT. Hummatech 
                                        sebagai UI/UX Designer.
                                    </p>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Saya suka menciptakan desain yang simple tapi tetap fungsional. Tujuan saya 
                                        adalah membuat produk digital yang mudah digunakan dan nyaman dilihat.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Sekolah</p>
                                        <p className="font-medium text-gray-900">SMK Negeri 8 Malang</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Tempat Magang</p>
                                        <p className="font-medium text-gray-900">PT. Hummatech</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Lokasi</p>
                                        <p className="font-medium text-gray-900">Malang, Indonesia</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">Periode PKL</p>
                                        <p className="font-medium text-gray-900">Jun - Okt 2025</p>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-full mt-6"
                                >
                                    <Link href="/biodata">
                                        Lihat Profil Lengkap
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-16">
                            <p className="text-sm font-medium text-gray-500 mb-2">Portfolio</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Projek yang Pernah Saya Kerjakan
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Berikut beberapa hasil karya saya selama magang di Hummatech
                            </p>
                        </div>

                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projects.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/portofolio/detail?id=${item.id}`}>
                                            <Card className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden h-full">
                                                {/* Image */}
                                                {item.dokum ? (
                                                    <div className="aspect-video overflow-hidden bg-gray-100">
                                                        <img
                                                            src={
                                                                item.dokum.startsWith("http")
                                                                    ? item.dokum
                                                                    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dokum/${item.dokum}`
                                                            }
                                                            alt={item.judul}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video flex items-center justify-center bg-gray-50">
                                                        <ImageIcon className="w-12 h-12 text-gray-300" />
                                                    </div>
                                                )}

                                                <CardContent className="p-6 space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                                            {item.judul}
                                                        </h3>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-xs shrink-0 transition-colors ${getBadgeColor(
                                                                item.jenis_projek
                                                            )}`}
                                                        >
                                                            {item.jenis_projek}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                        {item.deskripsi}
                                                    </p>

                                                    <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                                                        <span className="flex items-center gap-1">
                                                            <CalendarDays className="w-3.5 h-3.5" />
                                                            {item.tanggal_buat}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Folder className="w-3.5 h-3.5" />
                                                            {item.fw}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500">Belum ada projek tersedia.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-12">
                            <p className="text-sm font-medium text-gray-500 mb-2">Kontak</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Mari Terhubung
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Jangan ragu untuk menghubungi saya melalui platform berikut
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <a
                                href="https://mail.google.com/mail/u/0/?to=nafhisyazevania@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all"
                            >
                                <Mail className="w-6 h-6 text-gray-700 mb-3" />
                                <p className="font-medium text-gray-900 mb-1">Email</p>
                                <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    nafhisyazevania@gmail.com
                                </p>
                            </a>
                            
                            <a
                                href="https://www.instagram.com/piechaanafhisya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all"
                            >
                                <Instagram className="w-6 h-6 text-gray-700 mb-3" />
                                <p className="font-medium text-gray-900 mb-1">Instagram</p>
                                <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    @piechaanafhisya
                                </p>
                            </a>
                            
                            <a
                                href="https://github.com/nafisyazevania"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all"
                            >
                                <Github className="w-6 h-6 text-gray-700 mb-3" />
                                <p className="font-medium text-gray-900 mb-1">Github</p>
                                <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    nafisyazevania
                                </p>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © 2025 Nafhisya Zevania
                        </p>
                        <p className="text-sm text-gray-500">
                            Dibuat saat PKL di PT. Hummatech
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
