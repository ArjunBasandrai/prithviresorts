"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [galleryTop, setGalleryTop] = useState(0);

  const progress = useMotionValue(0);
  const imageWidth = useTransform(progress, [0, 1], ['100%', '66.66666667%']);
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
        <div ref={galleryRef} className="sticky top-0 overflow-hidden min-h-screen">
          <div className="flex items-center h-screen">
            <motion.div
              className="h-screen relative flex-shrink-0"
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
              className="flex flex-grow py-48 justify-center h-screen"
              style={{
                opacity: headingOpacity,
                x: headingX,
              }}
            >
              <motion.h1
                className="m-0"
                style={{ fontSize: headingFontSize }}
              >
                Gallery
              </motion.h1>
            </motion.div>
          </div>
        </div>

        {/* Main Gallery Content */}
        <div className="w-full h-screen"></div>
        {[
          { src: '/stage.jpg', caption: 'Wedding Ceremonies', offset: '9rem' },
          { src: '/hall.jpg', caption: 'Kitty Parties', offset: '12rem' },
          { src: '/decor.jpg', caption: 'Venue Decor Themes', offset: '15rem' },
          { src: '/garden.jpg', caption: 'Outdoor Spaces and Gardens', offset: '18rem' },
        ].map((item, index) => (
          <div key={index} className="sticky top-0 flex w-full h-screen">
            <div className="basis-2/3 h-full relative">
              <Image
                src={item.src}
                alt="Gallery Image"
                fill
                className="object-cover w-full h-full rounded-[24px] scale-95"
              />
            </div>
            <div className="basis-1/3 flex justify-center h-screen py-48">
              <p className={`mt-[${item.offset}]`}>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
