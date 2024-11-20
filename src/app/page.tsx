"use client";

import Hero from "@/components/homepage/Hero";
import "./styles/globals.css";
import Benefits from "@/components/homepage/Benefits";
import HomeGallery from "@/components/homepage/HomeGallery";

import store from '@/store/store';
import { Provider } from 'react-redux';
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Hero />
        <Benefits />
        <HomeGallery />
        <Testimonials />
      </Provider>
    </>
  );
}
