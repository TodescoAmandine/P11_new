import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser=createAsyncThunk(
    'user/loginUser',
    async(userCredential)=>{
        const request = await axios.post(`http://localhost:3001/api/v1/user/login`, userCredential);
        const response = await request.data.data;
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message ==='401'){
                state.error = 'Accès non autorisé';
            }
            else{
                state.error = action.error.message;

            }
        })
    }
});

export default userSlice.reducer;