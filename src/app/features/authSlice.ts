import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  image: string;
  name: string;
  role: string;
  id: string;
}

const initialState: AuthState = {
  email: "",
  image: "",
  name: "",
  role: "",
  id: "",
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
