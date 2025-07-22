import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;

// Hook to get auth token
export const useAuthToken = () => {
  return useSelector((state) => state.auth.token);
};

export const useUser = () => {
  const token = useAuthToken();

  if (!token) return null;

  let decodedData;

  try {
    decodedData = jwtDecode(token);
  } catch (error) {
    return null;
  }

  return decodedData;
};
