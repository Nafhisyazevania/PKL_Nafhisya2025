"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Code,
    Layout,
    Zap,
    Rocket,
    ArrowLeft,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

interface Project {
    id: number;
    judul: string;
    deskripsi: string;
    dokum: string;
    tanggal_buat: string;
}

interface TimelineItem {
    id: number;
    title: string;
    date: string;
}

const timelineData: TimelineItem[] = [
    { id: 1, title: "Pembelajaran", date: "04 Juli 2025 - 22 Juli 2025" },
    { id: 2, title: "Produk PKL", date: "23 Juli 2025 - 23 September 2025" },
    { id: 3, title: "Projek Katering", date: "24 September 2025 – 17 Oktober 2025" },
];

export default function Biodata() {
    const [totalProjek, setTotalProjek] = useState(0);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, count, error } = await supabase
                .from("project")
                .select("*", { count: "exact" });

            if (!error && data) {
                setProjects(data);
                if (count !== null) setTotalProjek(count);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
            <NavigationBar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
                {/* Back Button */}
                <div className="mb-12">
                    <Button
                        asChild
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 -ml-2"
                    >
                        <Link href="/portofolio" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                >
                    {/* Header Profile */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <div className="aspect-square rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800">
                                <Image
                                    src="/pica.jpeg"
                                    alt="Nafhisya Zevania"
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                    Nafhisya Zevania S.E
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    Siswa SMK Negeri 8 Malang · Rekayasa Perangkat Lunak
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-6">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Lokasi</p>
                                    <p className="font-medium text-gray-900 dark:text-white">Karangploso, Ngijo Malang</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Kelas</p>
                                    <p className="font-medium text-gray-900 dark:text-white">12 RPL A / 26</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tempat Magang</p>
                                    <p className="font-medium text-gray-900 dark:text-white">PT. Hummatech</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Periode PKL</p>
                                    <p className="font-medium text-gray-900 dark:text-white">23 Jun - 28 Okt 2025</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Projek</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{totalProjek}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Divisi</p>
                                    <p className="font-medium text-gray-900 dark:text-white">UI/UX Design</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-gray-200 dark:bg-gray-800" />

                    {/* About Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Tentang Saya
                        </h2>
                        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            <p>
                                Perkenalkan nama saya Nafhisya Zevania S.E, seorang siswa
                                SMK Negeri 8 Malang jurusan Rekayasa Perangkat Lunak. Saya memiliki
                                minat yang besar dalam dunia teknologi, khususnya di bidang
                                pengembangan web dan desain antarmuka pengguna.
                            </p>
                            <p>
                                Minat ini berkembang dari latar belakang di SMPN 1 Singosari lewat program KEK,
                                tempat saya pertama kali mengenal HTML, CSS, JavaScript, serta desain kreatif
                                menggunakan Photoshop. Inilah yang menuntun saya mengambil jurusan RPL di SMK.
                            </p>
                        </div>
                    </section>
                    {/* Skills Section */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Keahlian Selama PKL
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: <Zap className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
                                    title: "Wireframing",
                                    desc: "Membuat struktur dasar tampilan dengan efisien",
                                },
                                {
                                    icon: <Layout className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
                                    title: "Prototyping",
                                    desc: "Membangun desain interaktif dengan Figma",
                                },
                                {
                                    icon: <Code className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
                                    title: "User Research",
                                    desc: "Mengidentifikasi kebutuhan dan perilaku pengguna",
                                },
                                {
                                    icon: <Rocket className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
                                    title: "Kolaborasi Frontend",
                                    desc: "Bekerja sama dengan developer untuk hasil maksimal",
                                },
                            ].map((skill, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{skill.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{skill.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16 space-y-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Timeline Kegiatan PKL
                    </h2>

                    <div className="space-y-6">
                        {timelineData.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex gap-4"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-gray-900 dark:bg-white mt-1.5" />
                                    {index < timelineData.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-800 mt-2" />
                                    )}
                                </div>
                                <div className="pb-8">
                                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
