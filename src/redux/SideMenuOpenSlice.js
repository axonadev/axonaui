import { createSlice } from "@reduxjs/toolkit";

export const sideMenuOpenSlice = createSlice({
  name: "idOpen",
  initialState: {
    value: "",
  },
  reducers: {
    changeID: (state) => {
      state.value = state;
    },
  },
});

export const { changeID } = sideMenuOpenSlice.actions;
export const sideMenuOpenReducer = sideMenuOpenSlice.reducer;
