// import { configureStore } from "@reduxjs/toolkit";

// export default configureStore({
// reducer:{

// }

// });


import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
    }
});
export default store;