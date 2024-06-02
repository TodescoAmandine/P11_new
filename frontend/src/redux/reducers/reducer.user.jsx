import { createSlice } from "@reduxjs/toolkit";

// Création du Slice User qui permet de gérer les actions liées à l'utilisateur, comme la récupération des données de l'utilisateur, la modification du nom d'utilisateur et la déconnexion. 
const userSlice = createSlice({
    name: "user",
    initialState: {
      status: 'VOID',
      userData: {
        firstName: "",
        lastName: "",
        userName: "",
      },
    },
  reducers: {
    getUserProfile: (state, action) => {
      state.status = 'SUCCEEDED';
      state.userData = action.payload;
    },
    editUserName:  (state, action) => {
        const { userName } = action.payload;
        state.userData.userName = userName;
      },
    setUserProfile: (state, action) => {
      const { firstName, lastName, userName } = action.payload;
      state.userData.firstName = firstName;
      state.userData.lastName = lastName;
      state.userData.userName = userName;
    },
    logout: (state) => {
      return {
        status: 'VOID',
        userData: {}
      };
    }
  },
});

export const { getUserProfile, editUserName, setUserProfile, logout } = userSlice.actions;
export default userSlice.reducer;
export const userReducer = userSlice.reducer;