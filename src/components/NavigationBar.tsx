"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavigationBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: "Beranda", id: "hero" },
        { name: "Tentang", id: "about" },
        { name: "Karya", id: "projects" },
        { name: "Kontak", id: "contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-md"
                    : "bg-white/50 backdrop-blur-sm"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/portofolio"
                            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            Nafhisya Zevania
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Button
                                key={link.id}
                                variant="ghost"
                                onClick={() => scrollToSection(link.id)}
                                className="text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                                {link.name}
                            </Button>
                        ))}
                        <Button
                            asChild
                            className="ml-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 shadow-sm"
                        >
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Button
                                key={link.id}
                                variant="ghost"
                                onClick={() => scrollToSection(link.id)}
                                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                                {link.name}
                            </Button>
                        ))}
                        <div className="pt-2 border-t border-gray-200 mt-2">
                            <Button
                                asChild
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-sm"
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

