"use client";

import Hero from "@/components/Hero";
import "./styles/globals.css";
import Benefits from "@/components/Benefits";
import HomeGallery from "@/components/HomeGallery";

import store from '@/store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Hero />
        <Benefits />
        <HomeGallery />
      </Provider>
    </>
  );
}
