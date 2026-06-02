import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000";

const initialState = {
  user: null,
  isLoggedIn: false,
  error: "",
  loading: false
};

export const signup = createAsyncThunk(
  "auth/signup",

  async (user, thunkAPI) => {

    try {

      const res = await axios.post(
        `${API}/users/signup`,
        user
      );

      return res.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(

        err.response?.data?.message ||

        err.message ||

        "Signup failed"

      );

    }

  }
);

export const login = createAsyncThunk(
  "auth/login",

  async (user, thunkAPI) => {

    try {

      const res = await axios.post(

        `${API}/users/login`,

        user,

        {
          withCredentials: true
        }

      );
      localStorage.setItem("email",res.data.email);
      return res.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(

        err.response?.data?.message ||

        err.message ||

        "Login failed"

      );

    }

  }
);

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

    .addCase(login.pending, (state) => {

      state.loading = true;
      state.error = "";

    })

    .addCase(login.fulfilled,
    (state, action) => {

      state.loading = false;
      state.isLoggedIn = true;

      state.user =
        action.payload;

    })

    .addCase(login.rejected,
    (state, action) => {

      state.loading = false;

      state.error =
        action.payload;

    });

  }

});

export default authSlice.reducer;