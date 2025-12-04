import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/shared/types";
import { AuthStatus } from "@/shared/types";

export interface AuthState {
  user: User | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  status: AuthStatus.Unauthenticated,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.status = action.payload 
        ? AuthStatus.Authenticated 
        : AuthStatus.Unauthenticated;
    },
    setStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.status = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.status = AuthStatus.Unauthenticated;
    },
  },
});

export const { setUser, setStatus, logout } = authSlice.actions;
export default authSlice.reducer;
