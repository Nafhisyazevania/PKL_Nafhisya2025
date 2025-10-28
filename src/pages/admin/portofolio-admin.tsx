"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PortofolioAdmin() {
    const [projects, setProjects] = useState<any[]>([]);
    const [form, setForm] = useState({
        judul: "",
        framework: "",
        mulai: "",
        selesai: "",
        status: "",
        deskripsi: "",
    });

    const fetchProjects = async () => {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ judul: "", framework: "", mulai: "", selesai: "", status: "", deskripsi: "" });
        fetchProjects();
    };

    return (
        <div className="p-6 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Tambah Proyek Baru</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                    <Input name="judul" placeholder="Judul proyek" value={form.judul} onChange={handleChange} />
                    <Input name="framework" placeholder="Framework (contoh: React, Next.js)" value={form.framework} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input type="date" name="mulai" value={form.mulai} onChange={handleChange} />
                        <Input type="date" name="selesai" value={form.selesai} onChange={handleChange} />
                    </div>
                    <Input name="status" placeholder="Status (contoh: Selesai / Proses)" value={form.status} onChange={handleChange} />
                    <Textarea name="deskripsi" placeholder="Deskripsi proyek" value={form.deskripsi} onChange={handleChange} />
                    <Button onClick={handleSubmit}>Simpan</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Daftar Proyek</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead>Framework</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Selesai</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deskripsi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.judul}</TableCell>
                                    <TableCell>{p.framework}</TableCell>
                                    <TableCell>{p.mulai}</TableCell>
                                    <TableCell>{p.selesai}</TableCell>
                                    <TableCell>{p.status}</TableCell>
                                    <TableCell>{p.deskripsi}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
