import { GET_USERPROFILE, EDIT_USERNAME } from "./actions.types";

/* récupération des données utilisateur */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

/* edition du nom d'utilisateur */
export const updateUsername = (userName) => {
    console.log("Dispatching updateUsername with", userName);

    return {
        type: EDIT_USERNAME,
        payload: userName,
    }
}
