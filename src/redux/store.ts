import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import songReducer from "./songSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
  },
});

// Infer types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
