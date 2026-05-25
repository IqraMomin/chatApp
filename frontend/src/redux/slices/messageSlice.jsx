import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000"

const initialState = {
    list:[],
    error:null,
    loading:false
}

const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(sendMessage.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(sendMessage.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(sendMessage.fulfilled,(state,action)=>{
            state.loading=false;
            state.message = action.payload.data;
        })
        .addCase(getMessages.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getMessages.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(getMessages.fulfilled,(state,action)=>{
            state.loading=false;
            state.message = action.payload;
        })
    }
});

export const sendMessage = createAsyncThunk("message/sendMessage",async({userId,message})=>{
try{
    const res= await axios.post(`${API}/messages/send`,
    {userId,message},
    {withCredentials:true});
    return res.data;
}catch(err){
    console.log(err.message);
    return err.message
}
})

export const getMessages = createAsyncThunk("message/getMessages",async()=>{
    try{
        const res = await axios.get(`${API}/messages/get`,{
            withCredentials:true
        })
        console.log(res.data);
        return res.data;
    }catch(err){
        console.log(err.message);
        return err.message;
    }
})

export const messageActions = messageSlice.actions;
export default messageSlice.reducer