import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  image: string | null;
  name: string | null;
  role: string | null;
  id: string | null;
}

const initialState: AuthState = {
  email: null,
  image: null,
  name: null,
  role: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      actions: PayloadAction<{
        email: string;
        image: string;
        name: string;
        role: string;
        id: string;
      }>
    ) => {
      state.email = actions.payload.email;
      state.image = actions.payload.image;
      state.name = actions.payload.name;
      state.role = actions.payload.role;
      state.id = actions.payload.id;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
