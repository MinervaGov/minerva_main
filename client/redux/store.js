"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import modalsReducer from "./slice/modalsSlice";
import setupReducer from "./slice/setupSlice";
import agentReducer from "./slice/agentSlice";
import galleryReducer from "./slice/gallerySlice";
export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    user: userReducer,
    setup: setupReducer,
    agent: agentReducer,
    gallery: galleryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
