import { createSlice } from "@reduxjs/toolkit";

export const sideMenuOpenSlice = createSlice({
  name: "sideMenuOpen",
  initialState: {
    value: false,
  },
  reducers: {
    sideMenu: (state) => {
      state.value = !state.value;
      console.log(state.value);
    },
  },
});

export const { sideMenu } = sideMenuOpenSlice.actions;
export const sideMenuOpenReducer = sideMenuOpenSlice.reducer;
