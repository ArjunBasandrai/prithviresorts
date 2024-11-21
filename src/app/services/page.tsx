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
    { title: "Conference & Party Hall", image: "/outdoor_decor.jpg" },
    { title: "Hotel Rooms", image: "/stage.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false); // Tracks dragging state
  const [dragOffset, setDragOffset] = useState<number>(0); // Tracks the drag offset
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef<number>(0); // Initialize without accessing 'window'
  const [isSlideWidthReady, setIsSlideWidthReady] = useState<boolean>(false); // Track when slideWidth is ready

  // Update slideWidth on mount and when window resizes
  useEffect(() => {
    const updateSlideWidth = () => {
      slideWidth.current = window.innerWidth;
    };

    updateSlideWidth();
    setIsSlideWidthReady(true); // Indicate that slideWidth is now ready

    window.addEventListener('resize', updateSlideWidth);
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, []);

  // Wait until slideWidth is ready before rendering
  if (!isSlideWidthReady) {
    return null; // Or a loading indicator
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    isDragging.current = true;
    setIsDraggingState(true); // Update state to trigger style changes
    startX.current = getPositionX(e);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging.current) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX.current;

    // Clamp the drag offset to prevent over-scrolling
    const maxDragOffset = currentIndex * slideWidth.current;
    const minDragOffset = -((services.length - 1 - currentIndex) * slideWidth.current);
    const clampedDragOffset = Math.max(Math.min(diff, maxDragOffset), minDragOffset);

    setDragOffset(clampedDragOffset);
  };

  const handleDragEnd = (): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false); // Revert state to remove style changes
    const movedBy = dragOffset;

    // Determine if we should move to the next or previous slide
    if (movedBy < -100 && currentIndex < services.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    // Reset drag offset
    setDragOffset(0);
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

  // Compute the transition duration based on the dragging state
  const transitionDuration = isDraggingState ? '0.3s' : '0.1s';

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div
        className={`flex h-full relative`}
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
        {services.map((service, index) => {
          // Compute the base translateX for each slide
          const baseTranslateX = (index - currentIndex) * slideWidth.current;

          // Compute the additional translation for each slide
          const distanceFromCurrent = index - currentIndex;
          const absDistance = Math.abs(distanceFromCurrent);
          const translationAmount = absDistance * 550; // Adjust as needed
          let additionalTranslateX = 0;
          if (isDraggingState) {
            if (distanceFromCurrent > 0) {
              // Slide is to the right
              additionalTranslateX = -translationAmount;
            } else if (distanceFromCurrent < 0) {
              // Slide is to the left
              additionalTranslateX = translationAmount;
            } else {
              // current slide, no additional translation
              additionalTranslateX = 0;
            }
          }

          const totalTranslateX = baseTranslateX + dragOffset + additionalTranslateX;

          const slideStyle: React.CSSProperties = {
            transform: `translateX(${totalTranslateX}px)`,
            transition: `transform ${transitionDuration} ease-out`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          };

          return (
            <div
              key={index}
              className={`w-full h-full flex-shrink-0 relative slide`}
              style={slideStyle}
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
                <div className="flex w-full h-[85%] unselectable">
                  <div className="w-[15%] p-4 flex justify-center items-center">
                    <p className="text-white flex">
                      <span className="text-xl">{`0${index + 1}/`}</span>
                      <span className="text-5xl -mt-3">{`0${services.length}`}</span>
                    </p>
                  </div>
                  <div className="w-[85%] p-20 flex items-center">
                    <div>
                      <p className="text-xl text-black mb-16 flex items-center">
                        <span
                          className={`
                            block h-[0.8px] w-16 bg-black mr-6 origin-left transform transition-transform duration-[500ms]
                            ${isDraggingState ? 'scale-x-100' : 'scale-x-0'}
                          `}
                        ></span>
                        <span
                          className={`-mt-2 transition-opacity duration-300 ${
                            isDraggingState ? 'opacity-100' : 'opacity-0'
                          }`}
                        >{`0${index + 1}`}</span>
                      </p>

                      <h2
                        className={`text-7xl title ${
                          isDraggingState ? 'title-dragging' : ''
                        }`}
                      >
                        {service.title}
                      </h2>
                      <Link
                        href="/"
                        className="block text-lg ml-2 mt-6 text-white hover:text-xl hover:text-primary transition-all duration-300">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Add CSS styles */}
      <style jsx>{`
        .overlay {
          background-color: rgba(0, 0, 0, 0.75);
          transition: background-color 1s ease-out;
        }
        .overlay-dragging {
          background-color: #ffffff;
          transition: background-color 0.1s ease-out;
        }
        .title {
          color: #ffffff;
          transition: color 0.3s ease-out;
        }
        .title-dragging {
          color: #000000;
        }
        .unselectable {
          user-select: none;
        }
      `}</style>
    </div>
  );
}
