import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/reducer.authen.jsx';
import { userReducer } from './reducers/reducer.user.jsx';

// Combine Reducers
const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer
})
// Store Redux
const store = configureStore({
    reducer: rootReducer,
    devTools: true 
})

export default store