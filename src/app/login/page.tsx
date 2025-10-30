"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Library, AtSign, KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            // Tunggu session tersimpan, lalu redirect
            if (data.session) {
                // Refresh router cache untuk memastikan auth state ter-update
                router.refresh();
                router.push("/admin/dashboard-admin");
            } else {
                setError("Login berhasil tetapi tidak ada session");
                setLoading(false);
            }
        } catch (err) {
            setError("Terjadi kesalahan saat login");
            setLoading(false);
            console.error("Login error:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-900 text-neutral-200 p-4 relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "url(/path/to/your/subtle-dark-pattern.svg)",
                    backgroundSize: "cover",
                }}
            />
            <Card className="relative z-10 bg-neutral-800/30 backdrop-blur-md border border-neutral-700 text-neutral-200 shadow-2xl w-full max-w-sm">
                <CardHeader className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                        <Library className="text-white" size={32} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
                    <CardDescription className="text-sm text-neutral-400">
                        Silahkan login untuk mengakses halaman admin
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="sr-only">
                                Email
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="enter your email address..."
                                    className="w-full bg-neutral-700 border border-neutral-600 p-3 pl-10 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    disabled={loading}
                                />
                                <AtSign
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                                    size={18}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="enter your password..."
                                    className="w-full bg-neutral-700 border border-neutral-600 p-3 pl-10 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    disabled={loading}
                                />
                                <KeyRound
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                                    size={18}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-1xl"
                            size="lg"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Masuk..." : "Masuk"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

