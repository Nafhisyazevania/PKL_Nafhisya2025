"use client";

import SidebarPublic from "@/components/sidebar/SidebarPublic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Biodata() {
    return (
        <div className="flex h-screen bg-neutral-900 p-4">
            <SidebarPublic />
            <main className="flex-1 ml-4 p-6 bg-linear-to-b from-[#0f172a] to-[#1e293b] rounded-2xl overflow-y-auto">
                <div className="text-white flex flex-col items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-lg"
                    >
                        <Card className="bg-[#1e293b]/60 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-xl">
                            <CardHeader className="flex flex-col items-center">
                                <CardTitle className="text-2xl font-bold">
                                    Nafhisya Zevania
                                </CardTitle>
                                <p className="text-gray-400 text-sm mt-1">
                                    Siswa SMK Negeri 8 Malang · Software Engineering
                                </p>
                            </CardHeader>

                            <Separator className="my-4 bg-gray-700" />

                            <CardContent className="space-y-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <p>nafhisya@example.com</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-green-400" />
                                    <p>+62 812 3456 7890</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-red-400" />
                                    <p>Malang, Indonesia</p>
                                </div>

                                <Separator className="my-4 bg-gray-700" />

                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-blue-300">
                                        Tentang Saya
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Saya adalah pribadi yang ceria, suka berorganisasi, dan
                                        tertarik di bidang desain serta pemrograman. Saat ini saya
                                        sedang mengembangkan keterampilan saya di dunia IT dengan
                                        fokus pada pengembangan web dan aplikasi.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
