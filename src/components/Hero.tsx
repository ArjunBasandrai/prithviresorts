"use client";

import { useState } from "react";
import "../app/styles/globals.css";

type Section = "about" | "wedding-palace" | "conference-hall" | "hotel";

const sectionContent: Record<Section, { title: string; description: string }> = {
    about: {
        title: "WELCOME TO PRITHVI RESORTS & HOTELS",
        description: "Experience luxury and elegance at Prithvi Resorts & Hotels.",
    },
    "wedding-palace": {
        title: "YOUR DREAM WEDDING DESTINATION",
        description: "Celebrate your love in our grand and beautiful wedding palace.",
    },
    "conference-hall": {
        title: "PARTY HALL FOR MEMORABLE CELEBRATIONS",
        description: "Perfect for small gatherings, family functions, and kitty parties.",
    },
    hotel: {
        title: "EXPERIENCE COMFORT AT PRITHVI HOTELS",
        description: "Enjoy a luxurious stay with exceptional service and comfort.",
    },
};

export default function Hero() {
    const [activeSection, setActiveSection] = useState<Section>("about");
    const [prevSection, setPrevSection] = useState<Section | null>(null);

    const handleSectionChange = (section: Section) => {
        if (section !== activeSection) {
            setPrevSection(activeSection);
            setTimeout(() => {
                setActiveSection(section);
                setTimeout(() => {
                    setPrevSection(null);
                }, 1);
            }, 200);
        }
    };

    return (
        <div className="w-full h-screen bg-white relative overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-1"
                src="https://www.lechomat.com/app/uploads/2019/11/materasso-web-new.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="absolute top-0 w-full bottom-24 z-2">
                <div className="absolute bg-black/50 w-full h-full flex flex-col items-center justify-center text-white px-4 text-center">
                    {prevSection && (
                        <div className="absolute transition-all duration-[300ms] transform opacity-0 translate-y-8">
                            <p className="text-lg text-primary font-bold mb-5">{sectionContent[prevSection].title}</p>
                            <p className="text-5xl font-bold mt-2 max-w-3xl">{sectionContent[prevSection].description}</p>
                        </div>
                    )}

                    <div
                        key={activeSection}
                        className={`transition-all duration-[600ms] transform ${prevSection ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                            }`}
                    >
                        <p className="text-lg text-primary font-bold mb-5">{sectionContent[activeSection].title}</p>
                        <p className="text-5xl font-bold mt-2 max-w-3xl">{sectionContent[activeSection].description}</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 w-full h-24 flex z-2">
                <button
                    onClick={() => handleSectionChange("about")}
                    className={`relative flex-1 ${activeSection === "about" ? "bg-black/50 text-white" : "bg-white text-black"
                        } border-r border-black/20 flex items-center justify-center transition-colors duration-300`}
                >
                    <span className="relative z-10">About</span>
                    {activeSection !== "about" && (
                        <span className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                </button>
                <button
                    onClick={() => handleSectionChange("wedding-palace")}
                    className={`relative flex-1 ${activeSection === "wedding-palace" ? "bg-black/50 text-white" : "bg-white text-black"
                        } border-r border-black/20 flex items-center justify-center transition-colors duration-300`}
                >
                    <span className="relative z-10">Wedding Palace</span>
                    {activeSection !== "wedding-palace" && (
                        <span className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                </button>
                <button
                    onClick={() => handleSectionChange("conference-hall")}
                    className={`relative flex-1 ${activeSection === "conference-hall" ? "bg-black/50 text-white" : "bg-white text-black"
                        } border-r border-black/20 flex items-center justify-center transition-colors duration-300`}
                >
                    <span className="relative z-10">Conference & Party Hall</span>
                    {activeSection !== "conference-hall" && (
                        <span className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                </button>
                <button
                    onClick={() => handleSectionChange("hotel")}
                    className={`relative flex-1 ${activeSection === "hotel" ? "bg-black/50 text-white" : "bg-white text-black"
                        } flex items-center justify-center transition-colors duration-300`}
                >
                    <span className="relative z-10">Hotel</span>
                    {activeSection !== "hotel" && (
                        <span className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                </button>
            </div>
        </div>
    );
}