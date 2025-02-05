import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agent: null,
  decisions: [],
  selectedDecision: null,
  isLoading: false,
};

const agentSlice = createSlice({
  name: "agent",

  initialState,

  reducers: {
    setSelectedDecision: (state, action) => {
      state.selectedDecision = action.payload;
    },

    setDecisions: (state, action) => {
      state.decisions = action.payload;
    },

    setAgent: (state, action) => {
      state.agent = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearAll: (state) => {
      state.agent = null;
      state.decisions = [];
      state.selectedDecision = null;
      state.isLoading = false;
    },
  },
});

export const {
  setSelectedDecision,
  setDecisions,
  setAgent,
  setIsLoading,
  clearAll,
} = agentSlice.actions;

export default agentSlice.reducer;
