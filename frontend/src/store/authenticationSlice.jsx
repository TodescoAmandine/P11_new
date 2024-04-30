
import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: { userToken: null },
  reducers: {
    login: (state, action) => {
      state.userToken = action.payload;
    },
    logout: (state) => {
      state.userToken = null;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;


