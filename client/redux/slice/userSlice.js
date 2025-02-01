import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setUserUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserUsername } = userSlice.actions;

export default userSlice.reducer;
