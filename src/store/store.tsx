"use client";

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type galleryTopState = {
  galleryTop: number;
};

const initialState: galleryTopState = {
  galleryTop: 0,
};

const galleryTopSlice = createSlice({
  name: 'gallery top',
  initialState,
  reducers: {
    setGalleryTop(state, action: PayloadAction<number>) {
      state.galleryTop = action.payload;
    },
  },
});

export const { setGalleryTop } = galleryTopSlice.actions;

const store = configureStore({
  reducer: {
    galleryTop: galleryTopSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;