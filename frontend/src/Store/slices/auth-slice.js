import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isOnline: navigator.onLine,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

const authActions = authSlice.actions;

export default authSlice.reducer;
export { authActions };
