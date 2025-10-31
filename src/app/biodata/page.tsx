"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    MapPin,
    Briefcase,
    CalendarDays,
    FolderGit2,
    Code,
    Layout,
    Zap,
    Rocket,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import SidebarPublic from "@/components/sidebar/SidebarPublic";
import Image from "next/image";

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
    { id: 1, title: "Pembelajaran", date: "07 Juli 2025" },
    { id: 2, title: "Produk", date: "08 Juli 2025" },
    { id: 3, title: "Projek", date: "09 Juli 2025 – 21 Juli 2025" },
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
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarPublic />
            <main className="flex-1 ml-4 p-6 rounded-2xl overflow-y-auto bg-neutral-950">
                <div className="flex flex-col items-center justify-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-5xl"
                    >
                        <Card className="relative bg-neutral-950 border border-blue-900/30 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40 flex flex-col h-full text-white">
                            <CardContent className="p-8">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
                                        <Image
                                            src="/pica.jpeg"
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold">Nafhisya Zevania</h1>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Siswa SMK Negeri 8 Malang · Rekayasa Perangkat Lunak
                                        </p>
                                    </div>
                                </div>

                                <Separator className="my-6 bg-gray-700" />

                                <div className="grid md:grid-cols-2 gap-5 text-sm">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-blue-400" />
                                        <p>Malang, Indonesia</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-5 h-5 text-blue-400" />
                                        <p>Kelas: 12 RPL A / 26</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-5 h-5 text-blue-400" />
                                        <p>Tempat Magang: PT. Hummatech</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CalendarDays className="w-5 h-5 text-blue-400" />
                                        <p>Masa Magang: 23 Juni 2025 - 28 Oktober 2025</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FolderGit2 className="w-5 h-5 text-blue-400" />
                                        <p>Total Projek: {totalProjek}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FolderGit2 className="w-5 h-5 text-blue-400" />
                                        <p>Divisi: UI/UX</p>
                                    </div>
                                </div>

                                <Separator className="my-6 bg-gray-700" />

                                <section>
                                    <h3 className="text-xl font-semibold mb-3 text-blue-400">
                                        Tentang Saya
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Perkenalkan, saya Nafhisya (Pica) dari Malang. Ketertarikan saya pada
                                        teknologi sudah ada sejak kecil, mulai dari bermain game hingga belajar TIK
                                        di SDN Tasikmadu 2. Minat ini berkembang di SMPN 1 Singosari lewat program KEK,
                                        tempat saya pertama kali mengenal HTML, CSS, JavaScript, serta desain kreatif
                                        menggunakan Photoshop dan Roblox. Inilah yang menuntun saya mengambil jurusan RPL di SMK.
                                    </p>
                                </section>
                            </CardContent>
                        </Card>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="mt-10"
                        >
                            <h2 className="text-xl font-semibold mb-5 text-blue-400 text-center">
                                Keahlian Selama PKL
                            </h2>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {[
                                    {
                                        icon: <Zap className="w-6 h-6 text-yellow-400" />,
                                        title: "Wireframing",
                                        desc: "Membuat struktur dasar tampilan dengan efisien.",
                                    },
                                    {
                                        icon: <Layout className="w-6 h-6 text-blue-400" />,
                                        title: "Prototyping",
                                        desc: "Membangun desain interaktif dengan Figma.",
                                    },
                                    {
                                        icon: <Code className="w-6 h-6 text-green-400" />,
                                        title: "User Research",
                                        desc: "Mengidentifikasi kebutuhan dan perilaku pengguna.",
                                    },
                                    {
                                        icon: <Rocket className="w-6 h-6 text-pink-400" />,
                                        title: "Frontend Collaboration",
                                        desc: "Bekerja sama dengan tim developer untuk hasil maksimal.",
                                    },
                                ].map((skill, index) => (
                                    <Card
                                        key={index}
                                        className="bg-[#1e293b]/60 hover:bg-[#273554]/70 border border-white/10 text-white p-5 text-center transition-all duration-300"
                                    >
                                        <CardContent>
                                            <div className="flex flex-col items-center space-y-3">
                                                {skill.icon}
                                                <h3 className="font-semibold">{skill.title}</h3>
                                                <p className="text-gray-400 text-sm">{skill.desc}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Timeline Section */}
                <div className="text-white flex flex-col items-center justify-center my-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-xl font-semibold mb-3 text-blue-400 text-center"
                    >
                        Timeline Kegiatan PKL
                    </motion.h1>

                    <div className="relative w-full max-w-6xl flex justify-between items-center mt-10">
                        <div className="absolute top-1/2 left-0 w-full h-2 bg-blue-600 rounded-full transform -translate-y-1/2" />
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative flex flex-col items-center w-[110px] sm:w-[150px] md:w-[180px]"
                            >
                                <div className="w-6 h-6 rounded-full bg-white border-[6px] border-blue-600 relative z-10" />
                                <div className="mt-5 flex flex-col items-center text-center">
                                    <Card className="bg-[#1e293b] border border-white/10 hover:border-blue-500/80 transition-all duration-300 shadow-lg shadow-blue-500/10 w-full">
                                        <CardContent className="p-3">
                                            <p className="text-sm text-blue-100 font-semibold">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
