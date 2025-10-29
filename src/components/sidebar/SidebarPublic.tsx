"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation'

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
    Github,
    Home,
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
            { name: "Profil PKL", href: "/profilpkl", icon: <BookUser size={18} /> },
        ],
    },
    {
        title: "Kontak",
        links: [
            { name: "Email", href: "#", icon: <Mail size={18} /> },
            { name: "Instagram", href: "https://www.instagram.com/piechaanafhisya", icon: <Instagram size={18} />, external: true },
            { name: "Github", href: "https://github.com/nafisyazevania", icon: <Github size={18} />, external: true },
        ],
    },
];

export default function SidebarPublic() {
    const pathname = usePathname();

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

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

    const handleToggleCollapse = () => {
        setIsAnimating(true);
        setIsCollapsed((prev) => !prev);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-neutral-800 text-white transition-all duration-300 z-50 flex flex-col",
                isCollapsed ? "w-16" : "w-64",
                isAnimating && "pointer-events-none"
            )}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-neutral-700">
                {!isCollapsed && (
                    <h2 className="text-xl font-bold truncate">Menu Publik</h2>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleCollapse}
                    className="text-white hover:bg-neutral-700 ml-auto"
                >
                    <ChevronLeft
                        size={20}
                        className={cn(
                            "transition-transform",
                            isCollapsed && "rotate-180"
                        )}
                    />
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                <TooltipProvider>
                    {sections.map((section) => (
                        <div key={section.title}>
                            {!isCollapsed && (
                                <h3 className="text-xs font-semibold text-neutral-400 mb-3 uppercase tracking-wider">
                                    {section.title}
                                </h3>
                            )}
                            <ul className="space-y-2">
                                {section.links.map((link) => {
                                    const isActive = pathname === link.href;
                                    const LinkComponent = link.external ? "a" : Link;
                                    const linkProps = link.external 
                                        ? { href: link.href, target: "_blank", rel: "noopener noreferrer" }
                                        : { href: link.href };

                                    const content = (
                                        <LinkComponent
                                            {...linkProps}
                                            className={cn(
                                                buttonVariants({ variant: "ghost" }),
                                                "w-full justify-start text-white hover:bg-neutral-700",
                                                isActive && "bg-neutral-700",
                                                isCollapsed && "justify-center px-2"
                                            )}
                                        >
                                            {link.icon}
                                            {!isCollapsed && (
                                                <span className="ml-3">{link.name}</span>
                                            )}
                                        </LinkComponent>
                                    );

                                    if (isCollapsed) {
                                        return (
                                            <li key={link.name}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        {content}
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right">
                                                        {link.name}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </li>
                                        );
                                    }

                                    return <li key={link.name}>{content}</li>;
                                })}
                            </ul>
                            {section !== sections[sections.length - 1] && (
                                <Separator className="my-4 bg-neutral-700" />
                            )}
                        </div>
                    ))}
                </TooltipProvider>
            </nav>
        </aside>
    );
}
