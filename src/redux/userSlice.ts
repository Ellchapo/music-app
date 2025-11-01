import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem("musicUsers") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newUser: User = { ...action.payload, id: Date.now().toString() };
      state.users.push(newUser);
      localStorage.setItem("musicUsers", JSON.stringify(state.users));
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const found = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        state.currentUser = found;
        localStorage.setItem("currentUser", JSON.stringify(found));
      } else {
        state.currentUser = null;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
