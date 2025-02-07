import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  followedAgents: [],
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFollowedAgents: (state, action) => {
      state.followedAgents = action.payload;
    },
  },
});

export const { setUser, setIsLoading, setFollowedAgents } = userSlice.actions;

export default userSlice.reducer;
