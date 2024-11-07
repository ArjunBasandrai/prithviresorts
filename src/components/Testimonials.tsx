"use client";

import "@/app/styles/globals.css";
import { useState, useRef, useEffect } from "react";

export default function Testimonials() {
    const testimonials: [string, string][] = [
        ["It's like an Oasis in the Area. Huge Lawn and a Vast Party Hall provide good opportunity for conducting functions like marriage / reception party etc. We attended a marriage of a relative here and found the place spacious enough for accommodating more than 500 people.", "Sukhvinder"],
        ["The property looks like a Huge Majestic Royal Palace. The rooms are very spacious and the toilets are very clean and hygienic.", "Kamal Sharma"],
        ["Quite spacious and Elegant. Have a nice big outdoor area as well. Easy to find. Visible from highway. Parking available.", "Tamanpreet Singh"],
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [fade, setFade] = useState(true);

    const blockquoteRef = useRef<HTMLQuoteElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const changeTestimonial = (newIndex: number) => {
        setFade(false);
        setTimeout(() => {
            setCurrentTestimonial(newIndex);
            setFade(true);
        }, 400);
    };

    useEffect(() => {
        if (blockquoteRef.current && containerRef.current) {
            containerRef.current.style.height = `${blockquoteRef.current.scrollHeight + 48}px`;
        }
    }, [currentTestimonial]);

    return (
        <>
            <div className="w-full bg-primary px-4 pt-16 pb-20 md:py-32 flex flex-col items-center text-black relative">
                <h1 className="text-2xl md:text-3xl uppercase mb-6 md:mb-12 text-center">What clients are saying</h1>
                <div
                    ref={containerRef}
                    className="w-full flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
                >
                    <div className={`relative w-full flex flex-col items-center md:py-1 text-center transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        <blockquote
                            ref={blockquoteRef}
                            className="max-w-[700px] text-lg md:text-2xl text-white"
                        >
                            {testimonials[currentTestimonial][0]}
                        </blockquote>
                        <p className="max-w-[700px] text-md md:text-lg mt-5 text-white">
                            - {testimonials[currentTestimonial][1]}
                        </p>
                    </div>
                    <div className="flex absolute bottom-[2rem] md:bottom-[4rem] gap-2">
                    {testimonials.map((_, index) => (
                        <div
                        key={index}
                        onClick={() => changeTestimonial(index)}
                        className={`h-2 rounded-full cursor-pointer mt-4 ${index === currentTestimonial ? 'bg-black w-6' : 'bg-black/40 w-2'} trasition-all duration-300`}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
}
