"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from("projek").select("*").eq("id", id).single();
            setProject(data);
        };
        if (id) fetchData();
    }, [id]);

    if (!project) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{project.judul}</CardTitle>
                    <Badge>{project.status}</Badge>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">{project.deskripsi}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                        <b>Mulai:</b> {project.mulai} | <b>Selesai:</b> {project.selesai}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.framework &&
                            Object.keys(project.framework).map((key) => (
                                <Badge key={key} variant="outline">
                                    {project.framework[key]}
                                </Badge>
                            ))}
                    </div>
                    {project.dokumentasi && (
                        <Image
                            src={`data:image/png;base64,${project.dokumentasi}`}
                            alt="Dokumentasi"
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
