"use client";

import "@/app/styles/globals.css";
import { useState, useRef, useEffect } from "react";

function TestimonialCard({ testimonial }: { testimonial: [string, string] }) {
    return (
        <div className="flex-1 bg-white max-w-80 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 h-full pt-8">
            <p className="text-gray-500 px-4 md:px-8 py-6 md:pt-16 md:pb-10 text-md md:text-xl text-left h-full flex items-center">
                {testimonial[0]}
            </p>
            <p className="text-black/90 text-md md:text-xl px-8 py-10 text-center">
                - {testimonial[1]}
            </p>
        </div>
    );
}

export default function Testimonials() {
    const testimonials: [string, string][] = [
        [
            "Spacious and very beautiful. Has AC, which is always a bonus. Inside and out was decorated well. We used this for my sisters wedding. Easy access from NH44 which is always good aswell.",
            "Arshdeep Singh",
        ],
        [
            "The property looks like a Huge Majestic Royal Palace. The rooms are very spacious and the toilets are very clean and hygienic.",
            "Kamal Sharma",
        ],
        [
            "Quite spacious and Elegant. Have a nice big outdoor area as well. Easy to find. Visible from highway. Parking available.",
            "Tamanpreet Singh",
        ],
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const isInitialRender = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let debounceTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const scrollLeft = container.scrollLeft;
                const containerCenter = scrollLeft + container.offsetWidth / 2;

                const closestIndex = cardRefs.current.reduce((closest, card, index) => {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    return Math.abs(cardCenter - containerCenter) <
                        Math.abs(
                            cardRefs.current[closest].offsetLeft +
                                cardRefs.current[closest].offsetWidth / 2 -
                                containerCenter
                        )
                        ? index
                        : closest;
                }, 0);

                if (closestIndex !== activeIndex) {
                    setActiveIndex(closestIndex);
                }
            }, 100);
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
            clearTimeout(debounceTimeout);
        };
    }, [activeIndex]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        scrollToCard(activeIndex);
    }, []);

    const scrollToCard = (index: number) => {
        if (cardRefs.current[index] && containerRef.current) {
            const card = cardRefs.current[index];
            const container = containerRef.current;

            const containerWidth = container.offsetWidth;
            const cardWidth = card.offsetWidth;
            const cardOffsetLeft = card.offsetLeft;

            const scrollLeft = cardOffsetLeft - (containerWidth - cardWidth) / 2;

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });

            setActiveIndex(index);
        }
    };

    return (
        <>
            <section className="w-full text-center py-24 md:px-12 bg-primary overflow-hidden">
                <h1 className="text-4xl md:text-5xl uppercase mx-14 md:mx-0">What our clients are saying</h1>
                <div
                    ref={containerRef}
                    className="flex mt-16 md:gap-8 gap-2 justify-start md:justify-center overflow-x-auto snap-x snap-mandatory md:overflow-visible w-full hide-scrollbar"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="hidden md:block">
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) {
                                    cardRefs.current[index] = el;
                                }
                            }}
                            className={`flex-shrink-0 md:hidden ${
                                index === 0
                                    ? "pl-2"
                                    : index === testimonials.length - 1
                                    ? "pr-2"
                                    : ""
                            } snap-center md:flex-1 w-[80%] md:w-auto`}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 md:hidden">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`h-2 w-2 rounded-full mx-1 ${
                                activeIndex === index ? "bg-gray-800" : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
