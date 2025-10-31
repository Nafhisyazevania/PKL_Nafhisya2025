"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
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
    ChevronRight,
    BookUser,
    User,
    FileText,
    Instagram,
    Github,
    Home,
    Library,
} from "lucide-react";

interface SidebarLink {
    name: string;
    href: string;
    icon: React.ReactNode;
    external?: boolean;
}

interface SidebarSection {
    title: string;
    links: SidebarLink[];
}

const sections: SidebarSection[] = [
    {
        title: "Menu",
        links: [
            { name: "Home", href: "/", icon: <Home size={18} /> },
            { name: "Biodata", href: "/biodata", icon: <User size={18} /> },
            { name: "Portofolio", href: "/portofolio", icon: <FileText size={18} /> },
        ],
    },
    {
        title: "Kontak",
        links: [
            {
                name: "Email",
                href: "https://mail.google.com/mail/u/0/?to=nafhisyazevania@gmail.com",
                icon: <Mail size={18} />,
                external: true,
            },
            {
                name: "Instagram",
                href: "https://www.instagram.com/piechaanafhisya",
                icon: <Instagram size={18} />,
                external: true,
            },
            {
                name: "Github",
                href: "https://github.com/nafisyazevania",
                icon: <Github size={18} />,
                external: true,
            },
        ],
    },
];

export default function SidebarPublic() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("sidebar-collapsed-public");
            if (stored === "true") setIsCollapsed(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("sidebar-collapsed-public", String(isCollapsed));
        }
    }, [isCollapsed, isMounted]);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsCollapsed(!isCollapsed);
        setTimeout(() => setIsAnimating(false), 500);
    };

    if (!isMounted) return null;

    return (
        <TooltipProvider delayDuration={0}>
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <Button
                    variant="secondary"
                    size="icon"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? (
                        <ChevronLeft size={20} className="transition-transform duration-300" />
                    ) : (
                        <ChevronRight size={20} className="transition-transform duration-300" />
                    )}
                </Button>
            </div>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                data-collapsed={isCollapsed}
                className={cn(
                    "flex flex-col fixed md:relative bg-neutral-950 text-neutral-200 shadow-xl z-50 md:z-40",
                    "transition-all duration-500 ease-in-out",
                    isCollapsed ? "md:w-[60px]" : "md:w-[250px]",
                    "h-full md:h-auto",
                    isMobileOpen
                        ? "translate-x-0 w-[250px] top-0 left-0 h-full"
                        : "-translate-x-full md:translate-x-0",
                    "md:rounded-2xl"
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
                            Public Site
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleToggle}
                        className="size-8 rounded-lg hover:bg-neutral-800 transition-all hidden md:flex"
                    >
                        <ChevronLeft
                            size={18}
                            className={cn(
                                "transition-transform duration-500",
                                isCollapsed && "rotate-180"
                            )}
                        />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="size-8 rounded-lg hover:bg-neutral-800 transition-all md:hidden"
                    >
                        {isMobileOpen ? (
                            <ChevronLeft size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </Button>
                </div>

                <nav
                    className={cn(
                        "flex-1 overflow-y-auto px-3 py-4 space-y-6",
                        isCollapsed
                    )}
                >
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-2">
                            {!isCollapsed && (
                                <h4 className="px-3 text-xs font-semibold uppercase text-neutral-500">
                                    {section.title}
                                </h4>
                            )}

                            {section.links.map((link) => {
                                const isActive = pathname === link.href;
                                const linkClasses = cn(
                                    "flex items-center gap-3 p-2 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-neutral-800 text-neutral-300",
                                    isCollapsed && "justify-center"
                                );

                                const LinkComp = link.external ? "a" : Link;
                                const linkProps = link.external
                                    ? {
                                            href: link.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                        }
                                    : { href: link.href };

                                return (
                                    <Tooltip key={link.name}>
                                        <TooltipTrigger asChild>
                                            <LinkComp {...linkProps} className={linkClasses}>
                                                {link.icon}
                                                {!isCollapsed && <span>{link.name}</span>}
                                            </LinkComp>
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

                            {index < sections.length - 1 && (
                                <Separator className="bg-neutral-800 my-4" />
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </TooltipProvider>
    );
}
