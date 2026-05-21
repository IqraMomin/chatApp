import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API = "http://localhost:3000"

const initialState = {
    user:null,
    isLoggedIn:"",
    error:"",
    loading:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            state.isLoggedIn = true;
            state.user = true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const signup = createAsyncThunk("auth/signup",async(user,thunkAPI)=>{
    try{
        const res = axios.post(`${API}/users`,user);
        console.log(res.data.message);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export const login = createAsyncThunk("auth/login",async(user,thunkAPI)=>{
    try{
        const res = axios.post(`${API}/users`,user);
        console.log(res.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})

export default authSlice.reducer;