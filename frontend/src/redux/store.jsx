import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/reducer.authen.jsx';
import { userReducer } from './reducers/reducer.user.jsx';


// Combine Reducers qui permet de combiner les reducers auth et user
const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer
})
// Store Redux qui permet de stocker les données de l'application
const store = configureStore({
    reducer: rootReducer,
    devTools: true 
})

export default store