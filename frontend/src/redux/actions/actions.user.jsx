//import { createSelector } from 'reselect';
import { GET_USERPROFILE, EDIT_USERNAME } from "../utils/actions.types";

/* récupération des données utilisateur */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

/* edition du nom d'utilisateur */
export const updateUsername = (username) => {
    console.log("Dispatching updateUsername with", username);

    return {
        type: EDIT_USERNAME,
        payload: username,
    }
}
