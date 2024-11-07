"use client";

import { useRef, useEffect } from "react";
import "../app/styles/globals.css";

import { useDispatch } from 'react-redux';
import { setGalleryTop } from '@/store/store';

function DiamondIcon() {
    return (
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#dcbc7f">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <path d="M12.8001 21.5382C12.5087 21.7065 12.3629 21.7906 12.208 21.8235C12.0709 21.8527 11.9293 21.8527 11.7922 21.8235C11.6373 21.7906 11.4915 21.7065 11.2001 21.5382L4.13984 17.462C3.8484 17.2937 3.70268 17.2096 3.5967 17.0919C3.50293 16.9877 3.43209 16.865 3.38879 16.7318C3.33984 16.5811 3.33984 16.4129 3.33984 16.0763V7.92385C3.33984 7.58732 3.33984 7.41905 3.38879 7.26842C3.43209 7.13514 3.50293 7.01245 3.5967 6.9083C3.70268 6.7906 3.8484 6.70647 4.13984 6.5382L11.2001 2.46196C11.4915 2.2937 11.6373 2.20957 11.7922 2.17664C11.9293 2.1475 12.0709 2.1475 12.208 2.17664C12.3629 2.20957 12.5087 2.2937 12.8001 2.46196L19.8604 6.5382C20.1518 6.70647 20.2975 6.7906 20.4035 6.9083C20.4973 7.01245 20.5681 7.13514 20.6114 7.26842C20.6604 7.41905 20.6604 7.58732 20.6604 7.92384V16.0763C20.6604 16.4129 20.6604 16.5811 20.6114 16.7318C20.5681 16.865 20.4973 16.9877 20.4035 17.0919C20.2975 17.2096 20.1518 17.2937 19.8604 17.462L12.8001 21.5382Z" strokeWidth="2" strokeLinejoin="round" />
            </g>
        </svg>
    );
}

export default function Benefits() {
    const cardStyles = "px-4 md:py-4";

    const dispatch = useDispatch();
    const benefitsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (benefitsRef.current) {
            const bottom = benefitsRef.current.getBoundingClientRect().bottom + window.scrollY;
            dispatch(setGalleryTop(bottom));
            console.log(bottom);
        }
    }
    , []);

    return (
        <>
            <div ref={benefitsRef} className="py-16 md:pt-24 md:pb-20 md:px-48 flex flex-col md:flex-row w-full md:gap-2">
                <div className={`w-full md:w-3/5 ${cardStyles} text-3xl font-bold pb-16 md:m-0`}>
                    <h2>Here&apos;s Why Our Guests Love Booking with Us</h2>
                </div>
                <div className={`w-full ${cardStyles}`}>
                    <div>
                        <p className="text-primary mb-3"><DiamondIcon /></p>
                        <h5 className="text-xl font-bold mb-4">Prime Location</h5>
                        <p className="text-lg text-black/60 mb-12">Located right on the Grand Trunk Road, our venue combines convenience with a tranquil setting, making it ideal for both local and out-of-town guests.</p>
                    </div>
                    <div>
                        <p className="text-primary mb-3"><DiamondIcon /></p>
                        <h5 className="text-xl font-bold mb-4">Exceptional Hospitality</h5>
                        <p className="text-lg text-black/60 mb-12">Our dedicated team ensures every event is seamless and memorable, providing personalized attention to meet your unique needs.</p>

                    </div>
                </div>
                <div className={`w-full ${cardStyles}`}>
                    <div>
                        <p className="text-primary mb-3"><DiamondIcon /></p>
                        <h5 className="text-xl font-bold mb-4">Versatile Event Spaces</h5>
                        <p className="text-lg text-black/60 mb-12">With lush green outdoors spanning 3 acres and a large banquet hall with a Roman touch stage, we offer flexible venues suitable for gatherings of 500 to 2,000 guests.</p>

                    </div>
                    <div>
                        <p className="text-primary mb-3"><DiamondIcon /></p>
                        <h5 className="text-xl font-bold mb-4">Commitment to Quality and Safety</h5>
                        <p className="text-lg text-black/60">We prioritize high standards in cleanliness and safety, ensuring that every aspect of your event is handled with care and professionalism.</p>
                    </div>
                </div>
            </div>
        </>
    );
}