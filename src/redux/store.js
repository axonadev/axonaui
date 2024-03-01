import { configureStore } from "@reduxjs/toolkit";
import { sideMenuOpenReducer } from "./SideMenuOpenSlice";

export default configureStore({
  reducer: {
    // Inserire qui i reducer
    sideMenu: sideMenuOpenReducer,
  },
});
