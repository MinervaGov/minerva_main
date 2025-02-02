"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import modalsReducer from "./slice/modalsSlice";
import setupReducer from "./slice/setupSlice";
export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    user: userReducer,
    setup: setupReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
