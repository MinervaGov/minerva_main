import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agentName: "",
};

const setupSlice = createSlice({
  name: "setup",

  initialState,

  reducers: {
    setAgentName: (state, action) => {
      state.agentName = action.payload;
    },
  },
});

export const { setAgentName } = setupSlice.actions;

export default setupSlice.reducer;
