import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agent: null,
  decisions: null,
  selectedDecision: null,
  isLoading: false,
  votingPower: null,
  delegates: null,
  isDelegating: false,
  followers: null,
  isEvaluating: false,
  isDisputing: false,
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

    setFollowers: (state, action) => {
      state.followers = action.payload;
    },

    setIsEvaluating: (state, action) => {
      state.isEvaluating = action.payload;
    },

    setIsDisputing: (state, action) => {
      state.isDisputing = action.payload;
    },

    clearAll: (state) => {
      state.agent = null;
      state.decisions = [];
      state.selectedDecision = null;
      state.isLoading = false;
      state.votingPower = null;
      state.delegates = null;
      state.isDelegating = false;
      state.followers = null;
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
  setFollowers,
  setIsEvaluating,
  setIsDisputing,
} = agentSlice.actions;

export default agentSlice.reducer;
