"use client";

import Link from "next/link";
import { useState } from "react";
import "../app/styles/globals.css";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-16 lg:space-x-20 xl:space-x-28">
                    <Link href="/" className="text-white hover:text-primary font-medium text-md transition-all duration-[300ms]">
                        Home
                    </Link>
                    <Link href="/about" className="text-white hover:text-primary font-medium text-md transition-all duration-[300ms]">
                        About
                    </Link>
                    <Link href="/services" className="text-white hover:text-primary font-medium text-md transition-all duration-[300ms]">
                        Services
                    </Link>
                    <Link href="/contact" className="text-white hover:text-primary font-medium text-md transition-all duration-[300ms]">
                        Contact
                    </Link>
                </div>

                <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <div
                className={`fixed inset-0 bg-white/95 text-black transform z-50 transition-all duration-[400ms] ease-out
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button onClick={toggleMobileMenu} className={`absolute top-0 right-6 my-8 p-2 focus:outline-none bg-gray-200/60 rounded-md transition-all duration-1200 ${isMobileMenuOpen ? "block" : "hidden"}`}>
                    <svg className="w-6 h-6 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div className="h-full w-full flex flex-col justify-center items-center font-medium text-lg text-black">
                    <Link href="/" onClick={toggleMobileMenu} className="hover:text-primary transition-all duration-300 mb-12">
                        Home
                    </Link>
                    <Link href="/about" onClick={toggleMobileMenu} className="hover:text-primary transition-all duration-300 mb-12">
                        About
                    </Link>
                    <Link href="/services" onClick={toggleMobileMenu} className="hover:text-primary transition-all duration-300 mb-12">
                        Services
                    </Link>
                    <Link href="/contact" onClick={toggleMobileMenu} className="hover:text-primary transition-all duration-300 mb-12">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}
