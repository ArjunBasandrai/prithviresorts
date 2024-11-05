"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [galleryTop, setGalleryTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const progress = useMotionValue(0);
  const imageWidth = useTransform(progress, [0, 1], ['100%', '50%']);
  const headingOpacity = useTransform(progress, [0.2, 1], [0, 1]);
  const headingX = useTransform(progress, [0.2, 1], ['100%', '0%']);
  const headingFontSize = useTransform(progress, [0.2, 1], ['1.25rem', '5rem']);
  const imageScale = useTransform(progress, [0, 1], [1, 0.95]);
  const imageBorderRadius = useTransform(progress, [0, 1], ['0px', '24px']);

  useEffect(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      setGalleryTop(top);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (galleryTop > 0) {
        const startAnimation = galleryTop;
        const endAnimation = galleryTop + 500;
        const newProgress = Math.min(
          Math.max((currentScrollY - startAnimation) / (endAnimation - startAnimation), 0),
          1
        );
        progress.set(newProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [galleryTop, progress]);

  return (
    <>
      <div>
        <div ref={galleryRef} className='sticky top-0 overflow-hidden min-h-screen'>
          <div className='flex items-center h-screen'>
            <motion.div
              className='h-screen relative flex-shrink-0'
              style={{
                width: imageWidth,
                scale: imageScale,
                borderRadius: imageBorderRadius,
                overflow: 'hidden',
              }}
            >
              <Image
                src="/prithvi.jpg"
                alt="Gallery Image"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>

            <motion.div
              className='flex flex-grow py-48 justify-center h-screen'
              style={{
                opacity: headingOpacity,
                x: headingX,
              }}
            >
              <motion.h1
                className='m-0'
                style={{ fontSize: headingFontSize }}
              >
                Gallery
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <div className="w-full h-screen"></div>
        <div className="sticky top-0 flex w-full h-screen">
          <div className="flex-1 h-full relative">
            <Image
              src="/stage.jpg"
              alt="Gallery Image"
              fill
              className="object-cover w-full h-full rounded-[24px] scale-95"
            />
          </div>
          <div className="flex-1 flex justify-center h-screen py-48">
              <p className="mt-[9rem]">Wedding Ceremonies</p>
          </div>
        </div>
        <div className="sticky top-0 flex w-full h-screen">
          <div className="flex-1 h-full relative">
            <Image
              src="/hall.jpg"
              alt="Gallery Image"
              fill
              className="object-cover w-full h-full rounded-[24px] scale-95"
            />
          </div>
          <div className="flex-1 flex justify-center h-screen py-48">
              <p className="mt-[12rem]">Kitty Parties</p>
          </div>
        </div>
        <div className="sticky top-0 flex w-full h-screen">
          <div className="flex-1 h-full relative">
            <Image
              src="/decor.jpg"
              alt="Gallery Image"
              fill
              className="object-cover w-full h-full rounded-[24px] scale-95"
            />
          </div>
          <div className="flex-1 flex justify-center h-screen py-48">
              <p className="mt-[15rem]">Venue Decor Themes</p>
          </div>
        </div>
        <div className="sticky top-0 flex w-full h-screen">
          <div className="flex-1 h-full relative">
            <Image
              src="/garden.jpg"
              alt="Gallery Image"
              fill
              className="object-cover w-full h-full rounded-[24px] scale-95"
            />
          </div>
          <div className="flex-1 flex justify-center h-screen py-48">
              <p className="mt-[18rem]">Outdoor Spaces and Gardens</p>
          </div>
        </div>
      </div>
    </>
  );
}
