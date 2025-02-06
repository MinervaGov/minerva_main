import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myAgents: [],
  allAgents: [],
};

const gallerySlice = createSlice({
  name: "gallery",

  initialState,

  reducers: {
    setMyAgents: (state, action) => {
      state.myAgents = action.payload;
    },
    setAllAgents: (state, action) => {
      state.allAgents = action.payload;
    },
  },
});

export const { setMyAgents, setAllAgents } = gallerySlice.actions;

export default gallerySlice.reducer;
