"use client";

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const galleryTop = useSelector((state: RootState) => state.galleryTop.galleryTop);

  const [isSticky, setIsSticky] = useState([false, false, false, false, false]);

  const progress = useMotionValue(0);
  const imageWidth = useTransform(progress, [0, 1], ['100%', '66.66666667%']);
  const headingOpacity = useTransform(progress, [0.2, 1], [0, 1]);
  const headingX = useTransform(progress, [0, 1], ['50%', '0%']);
  const headingFontSize = useTransform(progress, [0.2, 1], ['1.25rem', '5rem']);
  const imageScale = useTransform(progress, [0, 1], [1, 0.95]);
  const imageBorderRadius = useTransform(progress, [0, 1], ['0px', '24px']);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (galleryTop > 0) {
        const startAnimation = galleryTop;
        const endAnimation = galleryTop + 500;
        const newProgress = Math.min(
          Math.max((currentScrollY - startAnimation) / (endAnimation - startAnimation), 0),
          1
        );
        progress.set(newProgress);
      }

      const newStickyStates = isSticky.map((_, index) => {
        const div = document.getElementById(`gallery-item-${index}`);
        if (div) {
          const rect = div.getBoundingClientRect();
          return rect.top <= 0;
        }
        return false;
      });

      if (JSON.stringify(newStickyStates) !== JSON.stringify(isSticky)) {
        setIsSticky(newStickyStates);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [galleryTop, progress, isSticky]);

  return (
    <>
      <div>
        <div ref={galleryRef} className="sticky top-0 overflow-hidden min-h-screen" id="gallery-item-0">
          <div className="relative md:static flex items-center h-screen">
            <motion.div
              className={`h-screen relative flex-shrink-0 top-0 ${isSticky[0] ? 'bg-opacity-20' : ''}`}
              style={{
                width: isMobile ? "100%" : imageWidth,
                scale: isMobile ? "98%" : imageScale,
                borderRadius: isMobile ? '0' : imageBorderRadius,
                overflow: 'hidden',
              }}
            >
              <Image
                src="/prithvi.jpg"
                alt="Gallery Image"
                fill
                className='object-cover'
              />
              <div className="md:hidden h-full w-full bg-gradient-to-t from-black/95 via-black/70 to-black/0 absolute z-[10] transition-all duration-[500ms] opacity-[60%]"></div>
            </motion.div>

            <motion.div
              className="absolute md:static flex flex-grow py-24 md:py-48 justify-center items-center md:items-start h-screen w-full"
              style={{
                opacity: isMobile ? 1 : headingOpacity,
                x: isMobile ? 0 : headingX,
              }}
            >
              <motion.h1
                className={`m-0 text-white md:text-black transition-all duration-[500ms] z-[10]`}
                style={{ fontSize: isMobile ? "5.5rem" : headingFontSize }}
              >
                <Link href="/gallery">
                  Gallery
                </Link>
              </motion.h1>
            </motion.div>
          </div>
        </div>

        <div className="w-full h-screen"></div>
        {[
          { src: '/stage.jpg', caption: 'Wedding Ceremonies', offset: '9rem' },
          { src: '/hall.jpg', caption: 'Kitty Parties', offset: '12rem' },
          { src: '/decor.jpg', caption: 'Venue Decor Themes', offset: '15rem' },
          { src: '/garden.jpg', caption: 'Outdoor Spaces and Gardens', offset: '18rem' },
        ].map((item, index) => (
          <div
            key={index}
            id={`gallery-item-${index + 1}`}
            className="sticky top-0 flex w-full h-screen"
          >
            <div className="w-full md:basis-2/3 h-full relative scale-[95%]">
              <Image
                src={item.src}
                alt="Gallery Image"
                fill
                className="object-cover w-full h-full rounded-[24px]"
              />
              <div className="md:hidden h-full w-full bg-gradient-to-t from-black/95 via-black/70 to-black/0 transition-all duration-[500ms] absolute z-[10] md:scale-[98%]"></div>
            </div>
            <div className="absolute md:static w-full basis-1/3 flex flex-col md:flex-row justify-center text-center h-screen py-48">
              <Link href="/about" style={{
                paddingTop: isMobile ? "0" : item.offset,
              }} className={`md:w-[250px] md:text-right text-white md:text-black text-[4rem] md:text-[1.5rem] z-[10] transition-all duration-[500ms] p-4 md:p-0 ${isSticky[index + 1] && !isMobile && "underline"} decoration-primary decoration-[2px] underline-offset-2`}>
                {item.caption}
              </Link>
            </div>
          </div>
        ))}
      <div className="h-8 hidden md:block"></div>
      </div>
    </>
  );
}
