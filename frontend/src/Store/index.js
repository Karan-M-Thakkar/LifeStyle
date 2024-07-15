import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { authActions } from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
export { authActions };
