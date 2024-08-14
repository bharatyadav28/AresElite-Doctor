import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("userToken");
const user = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");
const phone = localStorage.getItem("phone");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    userName,
    userEmail,
    phone,
    token: token,
    isFetching: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },

    loginSuccess: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
      state.user = action?.payload?.user_data?._id;
      state.userName = action?.payload?.user_data?.firstName;
      state.userEmail = action?.payload.user_data?.email;
      state.token = action?.payload?.token;
      state.phone = action?.payload?.user_data?.phone;

      localStorage.setItem("userToken", state.token);
      localStorage.setItem("userId", state.user);
      localStorage.setItem("userName", state.userName);
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("phone", state.phone);
    },

    loginFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    },
    Start: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    Success: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
    },
    Failure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  setProfile,
  logOut,
  loginStart,
  loginSuccess,
  loginFailure,
  Start,
  Success,
  Failure,
} = authSlice.actions;
export default authSlice.reducer;
