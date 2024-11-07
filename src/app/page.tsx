"use client";

import Hero from "@/components/Hero";
import "./styles/globals.css";
import Benefits from "@/components/Benefits";
import HomeGallery from "@/components/HomeGallery";

import store from '@/store/store';
import { Provider } from 'react-redux';
import Testimonials from "@/components/Testimonials";

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
