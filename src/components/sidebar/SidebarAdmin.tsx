"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from 'next/router'

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import {
    Mail,
    ChevronLeft,
    BookUser,
    User,
    FileText,
    Instagram,
    Library,
    Github,
    CircleUserRound,
    LogOut,
} from "lucide-react";

const sections = [
    {
        title: "About",
        links: [
            { name: "Dashboard", href: "/admin/dashboard-admin", icon: <BookUser size={18} /> },
            { name: "Tentang Saya", href: "/admin/biodata-admin", icon: <User size={18} /> },
            { name: "Portofolio", href: "/admin/portofolio-admin", icon: <FileText size={18} /> },
        ],
    },
    {
        title: "Kontak",
        links: [
            { name: "Email", href: "#", icon: <Mail size={18} /> },
            { name: "Instagram", href: "https://www.instagram.com/piechaanafhisya", icon: <Instagram size={18} /> },
            { name: "Github", href: "https://github.com/nafisyazevania", icon: <Github size={18} /> },
        ],
    },
];

export default function SidebarAdmin() {
    const router = useRouter()
    const pathname = router.pathname;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("sidebar-collapsed");
            if (stored === "true") setIsCollapsed(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("sidebar-collapsed", String(isCollapsed));
        }
    }, [isCollapsed, isMounted]);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                setUserEmail(user.email ?? null);
                setUserName((user.user_metadata?.name || user.email?.split("@")[0]) ?? null);
            }
        };

        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUserEmail(session.user.email ?? null);
                setUserName((session.user.user_metadata?.name || session.user.email?.split("@")[0]) ?? null);
            } else {
                setUserEmail(null);
                setUserName(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsCollapsed(!isCollapsed);
        setTimeout(() => setIsAnimating(false), 500);
    };

    if (!isMounted) return null;

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                data-collapsed={isCollapsed}
                className={cn(
                    "flex flex-col fixed md:relative h-screen md:h-[calc(100vh-2rem)] bg-neutral-950 text-neutral-200 shadow-xl z-40",
                    "transition-[width] duration-500 ease-in-out rounded-none md:rounded-2xl",
                    isCollapsed ? "w-[60px]" : "w-[250px]"
                )}
            >
                <div
                    className={cn(
                        "flex items-center justify-between p-4 border-b border-neutral-800",
                        isCollapsed && "justify-center p-3"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "text-lg font-bold flex gap-3 items-center transition-opacity duration-300 ease-in-out",
                                isCollapsed && "opacity-0 hidden"
                            )}
                        >
                            <Library className="text-blue-400" size={24} />
                            Portofolio
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleToggle}
                        className="size-8 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                        <ChevronLeft
                            size={18}
                            className={cn("transition-transform duration-500", isCollapsed && "rotate-180")}
                        />
                    </Button>
                </div>

                <nav className={cn("flex-1 overflow-y-auto px-3 py-4 space-y-4", isCollapsed && "p-3")}>
                    {sections.map((section, i) => (
                        <div key={i} className="space-y-1">
                            <h4
                                className={cn(
                                    "px-3 py-1 text-xs font-semibold uppercase text-neutral-500 transition-all duration-300",
                                    isCollapsed && "text-center"
                                )}
                            >
                                <span className={cn(isCollapsed && "hidden")}>{section.title}</span>
                                <span className={cn(!isCollapsed && "hidden")}>—</span>
                            </h4>

                            {section.links.map((link, j) => {
                                const isActive = pathname === link.href;
                                const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");

                                const linkClasses = cn(
                                    buttonVariants({ variant: "ghost", size: "default" }),
                                    "w-full h-10 flex justify-start items-center gap-3 px-3 rounded-md transition-all duration-300",
                                    "hover:bg-neutral-800 hover:text-white",
                                    isActive && "bg-blue-600 text-white",
                                    isCollapsed && "justify-center p-0"
                                );

                                const content = (
                                    <>
                                        {link.icon}
                                        <span className={cn("transition-opacity duration-300", isCollapsed && "opacity-0 hidden")}>
                                            {link.name}
                                        </span>
                                    </>
                                );

                                return (
                                    <Tooltip key={j}>
                                        <TooltipTrigger asChild>
                                            {isExternal ? (
                                                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                                                    {content}
                                                </a>
                                            ) : (
                                                <Link href={link.href} className={linkClasses}>
                                                    {content}
                                                </Link>
                                            )}
                                        </TooltipTrigger>
                                        {isCollapsed && (
                                            <TooltipContent side="right" className="bg-neutral-900 text-white border-neutral-800">
                                                {link.name}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                <div className={cn("mt-auto p-4 border-t border-neutral-800", isCollapsed && "p-3")}>
                    <Separator className="bg-neutral-800 mb-4" />

                    <div className={cn(
                        "flex items-center gap-3",
                        isCollapsed ? "flex-col justify-center" : "justify-between bg-neutral-800 p-3 rounded-xl border border-neutral-700"
                    )}>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/profile"
                                    className={cn(
                                        "flex items-center gap-3 group",
                                        isCollapsed && "justify-center w-full"
                                    )}
                                >
                                    <CircleUserRound size={isCollapsed ? 24 : 28} className="text-neutral-300 shrink-0" />
                                    {!isCollapsed && (
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="font-semibold text-sm text-white truncate group-hover:text-blue-400 transition-colors">
                                                {userName || "Admin"}
                                            </span>
                                            <span className="text-xs text-neutral-400">
                                                Administrator
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right" className="bg-neutral-900 text-white border-neutral-800">
                                    Profil: {userName || "Admin"}
                                </TooltipContent>
                            )}
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="destructive" // Menggunakan variant destructive untuk logout
                                    size={isCollapsed ? "icon" : "sm"} // Ukuran berubah saat collapsed
                                    onClick={handleLogout}
                                    className={cn(
                                        "shrink-0", // Agar tidak mengecil saat nama panjang
                                        isCollapsed ? "w-8 h-8" : "gap-1.5 px-3 py-1.5 text-xs" // Styling spesifik collapsed/expanded
                                    )}
                                    aria-label="Logout" // Baik untuk aksesibilitas
                                >
                                    <LogOut size={isCollapsed ? 18 : 16} />
                                </Button>
                            </TooltipTrigger>
                        </Tooltip>
                    </div>
                </div>
            </aside>
        </TooltipProvider>
    );
}