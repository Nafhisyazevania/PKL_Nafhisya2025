"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import NavigationBar from "@/components/NavigationBar";
import { motion } from "framer-motion";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CalendarDays,
    Folder,
    Image as ImageIcon,
    Mail,
    Instagram,
    Github,
    ArrowRight,
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
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array foto PKL
    const pklPhotos = [
        { id: 1, src: "/memo1.jpeg", alt: "Moment PKL 1" },
        { id: 2, src: "/memo2.jpeg", alt: "Moment PKL 2" },
        { id: 3, src: "/memo3.jpeg", alt: "Moment PKL 3" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= pklPhotos.length - 1) {
                    return 0;
                }
                return prev + 1;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [pklPhotos.length]);

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
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
            <NavigationBar />

            {/* Hero Section */}
            <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                                    Portfolio PKL 2025
                                </p>
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    Nafhisya Zevania
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
                                    UI/UX Designer
                                </p>
                            </div>
                            <p className="text-m text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                                Saya adalah siswa SMK Negeri 8 Malang, menjalankan PKL di PT.Hummatech. Disana saya sebagai UI/UX Designer.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button
                                    size="lg"
                                    className="bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white rounded-full px-8"
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
                                    className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full px-8"
                                    asChild
                                >
                                    <Link href="/biodata">Selengkapnya</Link>
                                </Button>
                            </div>
                        </motion.div>

                        <div className="relative h-[520px] hidden lg:flex items-center justify-center">
                            <div 
                                className="relative w-[450px] h-[500px]"
                                style={{ perspective: "1200px" }}
                            >
                                {pklPhotos.map((photo, index) => {
                                    const isActive = index === currentIndex;
                                    const isPrev = index < currentIndex;
                                    const isNext = index > currentIndex;
                                    
                                    let position = {};
                                    
                                    if (isActive) {
                                        position = {
                                            x: 0,
                                            y: 0,
                                            scale: 1,
                                            rotateY: 0,
                                            opacity: 1,
                                            zIndex: 30,
                                        };
                                    } else if (isPrev) {
                                        const offset = currentIndex - index;
                                        position = {
                                            x: -80 - (offset * 30),
                                            y: offset * 10,
                                            scale: 0.85 - (offset * 0.05),
                                            rotateY: -45,
                                            opacity: Math.max(0.3, 1 - offset * 0.2),
                                            zIndex: 20 - offset,
                                        };
                                    } else {
                                        const offset = index - currentIndex;
                                        position = {
                                            x: 80 + (offset * 30),
                                            y: offset * 10,
                                            scale: 0.85 - (offset * 0.05),
                                            rotateY: 45,
                                            opacity: Math.max(0.3, 1 - offset * 0.2),
                                            zIndex: 20 - offset,
                                        };
                                    }

                                    return (
                                        <motion.div
                                            key={photo.id}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={position}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.34, 1.56, 0.64, 1],
                                            }}
                                            className="absolute inset-0 flex items-center justify-center"
                                            style={{
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            <div
                                                className={`relative w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white transition-all duration-300 ${
                                                    isActive ? "cursor-default" : "cursor-pointer hover:scale-105"
                                                }`}
                                                onClick={() => !isActive && setCurrentIndex(index)}
                                            >
                                                <img
                                                    src={photo.src}
                                                    alt={photo.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                                {!isActive && (
                                                    <div className="absolute inset-0 bg-black/20 transition-opacity hover:bg-black/10" />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
                                    <button
                                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                                        disabled={currentIndex === 0}
                                        className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Dots */}
                                    <div className="flex gap-2">
                                        {pklPhotos.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`transition-all duration-300 rounded-full ${
                                                    index === currentIndex
                                                        ? "w-8 h-2 bg-gray-900 dark:bg-white"
                                                        : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentIndex((prev) => Math.min(pklPhotos.length - 1, prev + 1))}
                                        disabled={currentIndex === pklPhotos.length - 1}
                                        className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {currentIndex + 1} / {pklPhotos.length}
                                </div>

                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60 -z-10" />
                                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-linear-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-60 -z-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-16">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tentang Saya</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                UI/UX Designer dan Siswa SMK Negeri 8 Malang
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <div className="w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src="/pica.jpeg"
                                        alt="Nafhisya Zevania"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                        Halo! Saya Nafhisya, biasa dipanggil Pica. Saat ini saya siswa kelas 12
                                        jurusan RPL di SMK Negeri 8 Malang dan menjalani PKL di PT. Hummatech
                                        sebagai UI/UX Designer.
                                    </p>
                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Saya suka menciptakan desain yang simple tapi tetap fungsional. Tujuan saya
                                        adalah membuat produk digital yang mudah digunakan dan nyaman dilihat.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Sekolah</p>
                                        <p className="font-medium text-gray-900 dark:text-white">SMK Negeri 8 Malang</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tempat Magang</p>
                                        <p className="font-medium text-gray-900 dark:text-white">PT. Hummatech</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                                        <p className="font-medium text-gray-900 dark:text-white">Karangploso, Malang</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Periode PKL</p>
                                        <p className="font-medium text-gray-900 dark:text-white">23 Juni - 28 Oktober 2025</p>
                                    </div>
                </div>

                                <Button
                                    asChild
                                    className="bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white rounded-full mt-6"
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
            <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-16">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Portfolio</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Projek yang Pernah Saya Kerjakan
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
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
                                            <Card className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 overflow-hidden h-full">
                                                {/* Image */}
                                {item.dokum ? (
                                                    <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                                                    <div className="aspect-video flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                                        <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                                    </div>
                                )}

                                                <CardContent className="p-6 space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
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

                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                        {item.deskripsi}
                                    </p>

                                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2">
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
                                <p className="text-gray-500 dark:text-gray-400">Belum ada projek tersedia.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-12">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Kontak</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Hubungi
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <a
                                href="https://mail.google.com/mail/u/0/?to=nafhisyazevania@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                            >
                                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
                                <p className="font-medium text-gray-900 dark:text-white mb-1">Email</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    nafhisyazevania@gmail.com
                                </p>
                            </a>
                            
                            <a
                                href="https://www.instagram.com/piechaanafhisya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                            >
                                <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
                                <p className="font-medium text-gray-900 dark:text-white mb-1">Instagram</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    @piechaanafhisya
                                </p>
                            </a>
                            
                            <a
                                href="https://github.com/nafisyazevania"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                            >
                                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
                                <p className="font-medium text-gray-900 dark:text-white mb-1">Github</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    nafhisyazevania
                                </p>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © 2025 Nafhisya Zevania
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Dibuat saat PKL di PT. Hummatech
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
