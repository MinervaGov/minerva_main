import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agent: null,
  decisions: null,
  selectedDecision: null,
  isLoading: false,
  votingPower: null,
  delegates: null,
  isDelegating: false,
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

    setVotingPower: (state, action) => {
      state.votingPower = action.payload;
    },

    setDelegates: (state, action) => {
      state.delegates = action.payload;
    },

    setIsDelegating: (state, action) => {
      state.isDelegating = action.payload;
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
  setVotingPower,
  setDelegates,
  setIsDelegating,
} = agentSlice.actions;

export default agentSlice.reducer;
