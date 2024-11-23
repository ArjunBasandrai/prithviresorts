"use client";

import "@/app/styles/globals.css";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const slideWidth = useRef<number>(0);
  const [isSlideWidthReady, setIsSlideWidthReady] = useState<boolean>(false);

  useEffect(() => {
    const updateSlideWidth = () => {
      slideWidth.current = window.innerWidth;
    };

    updateSlideWidth();
    setIsSlideWidthReady(true);

    window.addEventListener('resize', updateSlideWidth);
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, []);

  if (!isSlideWidthReady) {
    return null;
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
    isDragging.current = true;
    setIsDraggingState(true);
    startX.current = getPositionX(e);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging.current) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX.current;
    const maxDragOffset = currentIndex * slideWidth.current;
    const minDragOffset = -((services.length - 1 - currentIndex) * slideWidth.current);
    const clampedDragOffset = Math.max(Math.min(diff, maxDragOffset), minDragOffset);
    setDragOffset(clampedDragOffset);
  };

  const handleDragEnd = (): void => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);
    const movedBy = dragOffset;

    if (movedBy < -100 && currentIndex < services.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setDragOffset(0);
  };

  const isTouchEvent = (e: React.MouseEvent | React.TouchEvent): e is React.TouchEvent => {
    return 'touches' in e;
  };

  const getPositionX = (e: React.MouseEvent | React.TouchEvent): number => {
    if (isTouchEvent(e)) {
      return e.touches[0].clientX;
    } else {
      return e.clientX;
    }
  };

  const transitionDuration = isDraggingState ? '0.3s' : '0.1s';

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div
        className={`flex h-full relative ${isDraggingState ? 'cursor-grabbing bg-white' : 'cursor-grab bg-black'}`}
        ref={slidesRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => isDragging.current && handleDragEnd()}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ touchAction: 'pan-y' }}
      >

        {services.map((service, index) => {
          const baseTranslateX = (index - currentIndex) * slideWidth.current;
          const distanceFromCurrent = index - currentIndex;
          const absDistance = Math.abs(distanceFromCurrent);
          const translationAmount = absDistance * 550;
          let additionalTranslateX = 0;
          if (isDraggingState) {
            if (distanceFromCurrent > 0) {
              additionalTranslateX = -translationAmount;
            } else if (distanceFromCurrent < 0) {
              additionalTranslateX = translationAmount;
            } else {
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
                className={`w-full h-full object-cover transition-all duration-100 ${isDraggingState ? 'opacity-0' : 'opacity-100'}`}
                draggable={false}
              />
              <div
                className={`absolute top-0 w-full h-screen z-2 overlay ${isDraggingState ? 'overlay-dragging' : ''
                  }`}
              >
                <div className="flex w-full h-[85%] unselectable">
                  <div className="w-[15%] p-4 flex justify-center items-center">
                    <p className={`text-white flex transition-all duration-100 ${isDraggingState ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="text-xl">{`0${index + 1}/`}</span>
                      <span className="text-5xl -mt-3">{`0${services.length}`}</span>
                    </p>
                  </div>
                  <div className="w-[85%] p-20 flex items-center">
                    <div>
                      <p className="text-xl text-black mb-16 flex items-center">
                        <span
                          className={`block h-[0.8px] w-16 bg-black mr-6 origin-left transform transition-transform duration-[500ms] ${isDraggingState ? 'scale-x-100' : 'scale-x-0'
                            }`}
                        ></span>
                        <span
                          className={`-mt-2 transition-opacity duration-300 ${isDraggingState ? 'opacity-100' : 'opacity-0'
                            }`}
                        >{`0${index + 1}`}</span>
                      </p>
                      <h2
                        className={`text-7xl title ${isDraggingState ? 'title-dragging' : ''
                          }`}
                      >
                        {service.title}
                      </h2>
                      <Link
                        href="/"
                        className="block text-lg ml-2 mt-6 text-white hover:text-xl hover:text-primary transition-all duration-300"
                      >
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
      <div className="absolute bottom-0 flex w-full h-[20%] z-2">
        <div className="w-[45%]"></div>
        <div className="w-[55%]">
          <div className="w-full h-full pt-4 pl-20 flex border-l-[0.5px] border-white/10">
            {services.map((service, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-1 h-full p-5 cursor-pointer ${index === currentIndex ? 'text-white' : 'text-white/70'
                    } ${index === currentIndex ? 'border-b-2 border-white' : ''
                    }`}>
                  <p className="text-md mb-4">
                    0{index + 1}
                  </p>
                  <p className="text-md max-w-40">
                    {service.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          background-color: rgba(0, 0, 0, 0.75);
          transition: background-color 0.8s ease-out;
        }
        .overlay-dragging {
          background-color: transparent;
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
