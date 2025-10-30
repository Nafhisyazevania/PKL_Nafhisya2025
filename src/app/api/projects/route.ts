import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
    const { data, error } = await supabaseServer.from("projek").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { judul, dokumentasi, framework, mulai, selesai, status, deskripsi } = body;
    const { data, error } = await supabaseServer
        .from("projek")
        .insert([{ judul, dokumentasi, framework, mulai, selesai, status, deskripsi }])
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data[0]);
}

