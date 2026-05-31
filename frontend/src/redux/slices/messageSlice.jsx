import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000"

const initialState = {
    list: [],
    error: null,
    loading: false
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage:(state,action)=>{
            state.list.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.loading = false;
                const existingIds =
                    new Set(
                        state.list.map(
                            msg => msg.id
                        )
                    );

                const newMessages =
                    action.payload.filter(
                        msg =>
                            !existingIds.has(msg.id)
                    );

                state.list = [
                    ...state.list,
                    ...newMessages
                ];

            });
    }
});

export const sendMessage = createAsyncThunk("message/sendMessage", async ({ userId, message }) => {
    try {
        const res = await axios.post(`${API}/messages/send`,
            { userId, message },
            { withCredentials: true });
        return res.data;
    } catch (err) {
        console.log(err.message);
        return err.message
    }
})

export const getMessages = createAsyncThunk("message/getMessages", async (lastMessageId) => {
    try {
        const res = await axios.get(`${API}/messages/get?lastMessageId=${lastMessageId}`, {
            withCredentials: true
        })
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
})

export const {addMessage} = messageSlice.actions;
export default messageSlice.reducer