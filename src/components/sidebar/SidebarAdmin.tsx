"use client";

import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    BookUser,
    ChevronLeft,
    CircleUserRound,
    FileText,
    Library,
    LogOut,
} from "lucide-react";

const sections = [
    { name: "Dashboard", href: "/admin/dashboard-admin", icon: <BookUser size={18} /> },
    { name: "Portofolio", href: "/admin/portofolio-admin", icon: <FileText size={18} /> },
];

export default function SidebarAdmin() {
    const router = useRouter();
    const pathname = usePathname();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

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
                setUserName(
                    user.user_metadata?.name || user.email?.split("@")[0] || "Admin"
                );
            }
        };

        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUserName(
                    session.user.user_metadata?.name ||
                    session.user.email?.split("@")[0] ||
                    "Admin"
                );
            } else {
                setUserName(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [router]);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsCollapsed(!isCollapsed);
        setTimeout(() => setIsAnimating(false), 500);
    };

    if (!isMounted) return null;

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

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

                <nav className={cn("flex-1 overflow-y-auto px-3 py-4 space-y-2", isCollapsed && "p-3")}>
                    {sections.map((link) => {
                        const isActive = pathname === link.href;

                        const linkClasses = cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                            isActive
                                ? "bg-blue-500 text-white"
                                : "hover:bg-neutral-800 text-neutral-300",
                            isCollapsed && "justify-center"
                        );

                        return (
                            <Tooltip key={link.name}>
                                <TooltipTrigger asChild>
                                    <Link href={link.href} className={linkClasses}>
                                        {link.icon}
                                        {!isCollapsed && <span>{link.name}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {isCollapsed && (
                                    <TooltipContent
                                        side="right"
                                        className="bg-neutral-900 text-white border-neutral-800"
                                    >
                                        {link.name}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>

                <div className={cn("mt-auto p-4 border-t border-neutral-800", isCollapsed && "p-3")}>
                    <Separator className="bg-neutral-800 mb-4" />
                    <div
                        className={cn(
                            "flex items-center gap-3",
                            isCollapsed
                                ? "flex-col justify-center"
                                : "justify-between bg-neutral-800 p-3 rounded-xl border border-neutral-700"
                        )}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/profile"
                                    className={cn(
                                        "flex items-center gap-3 group",
                                        isCollapsed && "justify-center w-full"
                                    )}
                                >
                                    <CircleUserRound
                                        size={isCollapsed ? 24 : 28}
                                        className="text-neutral-300 shrink-0"
                                    />
                                    {!isCollapsed && (
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="font-semibold text-sm text-white truncate group-hover:text-blue-400 transition-colors">
                                                {userName}
                                            </span>
                                            <span className="text-xs text-neutral-400">Admin</span>
                                        </div>
                                    )}
                                </Link>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent
                                    side="right"
                                    className="bg-neutral-900 text-white border-neutral-800"
                                >
                                    Profil: {userName}
                                </TooltipContent>
                            )}
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size={isCollapsed ? "icon" : "sm"}
                                    onClick={handleLogout}
                                    className={cn(
                                        "shrink-0",
                                        isCollapsed ? "w-8 h-8" : "gap-1.5 px-3 py-1.5 text-xs"
                                    )}
                                    aria-label="Logout"
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
