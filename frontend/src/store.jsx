import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './store/authenticationSlice'; 

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
export default store;
