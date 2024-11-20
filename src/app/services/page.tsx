"use client";

import "@/app/styles/globals.css";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the type for each service
interface Service {
  title: string;
  image: string;
}

export default function Services() {
  const services: Service[] = [
    { title: "Wedding Palace", image: "/decor.jpg" },
    { title: "Birthday Palace", image: "/outdoor_decor.jpg" },
    { title: "Conference Hall", image: "/stage.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false); // Tracks dragging state
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const prevTranslate = useRef<number>(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef<number>(window?.innerWidth);

  // Update slideWidth on mount and when window resizes
  useEffect(() => {
    const updateSlideWidth = () => {
      slideWidth.current = window.innerWidth;
      // Update the previous and current translate values based on the new slide width
      prevTranslate.current = currentIndex * -slideWidth.current;
      currentTranslate.current = prevTranslate.current;
      setSliderPosition(true);
    };

    updateSlideWidth();

    window.addEventListener('resize', updateSlideWidth);
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [currentIndex]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    isDragging.current = true;
    setIsDraggingState(true); // Update state to trigger style changes
    startX.current = getPositionX(e);
    if (slidesRef.current) {
      slidesRef.current.style.transition = 'none'; // Disable transition during dragging
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging.current) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX.current;
    currentTranslate.current = prevTranslate.current + diff;

    // Clamp the translate value to prevent over-scrolling
    const maxTranslate = 0;
    const minTranslate = -((services.length - 1) * slideWidth.current);
    currentTranslate.current = Math.max(Math.min(currentTranslate.current, maxTranslate), minTranslate);

    setSliderPosition();
  };

  const handleDragEnd = (): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false); // Revert state to remove style changes
    const movedBy = currentTranslate.current - prevTranslate.current;

    // Determine if we should move to the next or previous slide
    if (movedBy < -100 && currentIndex < services.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Snap back to the current slide
      currentTranslate.current = prevTranslate.current;
      setSliderPosition(true);
    }
  };

  // Type guard function to determine if event is a TouchEvent
  const isTouchEvent = (
    e: React.MouseEvent | React.TouchEvent
  ): e is React.TouchEvent => {
    return 'touches' in e;
  };

  const getPositionX = (e: React.MouseEvent | React.TouchEvent): number => {
    if (isTouchEvent(e)) {
      return e.touches[0].clientX;
    } else {
      return e.clientX;
    }
  };

  const setSliderPosition = (withTransition: boolean = false): void => {
    if (slidesRef.current) {
      if (withTransition) {
        slidesRef.current.style.transition = 'transform 0.3s ease-out';
      } else {
        slidesRef.current.style.transition = 'none';
      }
      slidesRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div
        className={`flex h-full ${isDraggingState ? 'dragging' : ''}`} // Add 'dragging' class during drag
        ref={slidesRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => isDragging.current && handleDragEnd()}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ touchAction: 'pan-y' }} // Prevents vertical scrolling during horizontal swipe
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-full h-full flex-shrink-0 relative slide`}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div
              className={`absolute top-0 w-full h-screen z-2 overlay ${
                isDraggingState ? 'overlay-dragging' : ''
              }`}
            >
              {/* Slide Content */}
              <div className="flex w-full h-[85%]">
                <div className="w-[15%] p-4 flex justify-center items-center">
                  <p className="text-white flex">
                    <span className="text-xl">{`0${index + 1}/`}</span>
                    <span className="text-5xl -mt-3">{`0${services.length}`}</span>
                  </p>
                </div>
                <div className="w-[85%] p-20 flex items-center">
                  <div>
                    <h2
                      className={`text-7xl title ${
                        isDraggingState ? 'title-dragging' : ''
                      }`}
                    >
                      {service.title}
                    </h2>
                    <Link
                      href="/"
                      className="block text-xl ml-2 mt-6 hover:text-primary transition-all duration-300 text-white"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add CSS styles */}
      <style jsx>{`
        .overlay {
          background-color: rgba(0, 0, 0, 0.75);
          transition: background-color 0.3s ease-out;
        }
        .overlay-dragging {
          background-color: #ffffff;
        }
        .title {
          color: #ffffff;
          transition: color 0.3s ease-out;
        }
        .title-dragging {
          color: #000000;
        }
        .dragging .overlay {
          /* Already handled by 'overlay-dragging' class */
        }
      `}</style>
    </div>
  );
}
