import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userApi from "./../../../api/user";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsersStatus",
  async () => {
    const response = await userApi.fetchUsers();
    //console.log("response => ", response.data);
    return response.data;
  }
);

export const addUser = createAsyncThunk("user/addUserStatus", async (data) => {
  const response = await userApi.addUser(data);
  //console.log("response => ", response.data);
  return response.data;
});

export const loginUser = createAsyncThunk(
  "user/userLoginStatus",
  async (params) => {
    const response = await userApi.login(params);
    return {
      id: response.data[0].id,
      name: response.data[0].name,
      username: response.data[0].username,
      email: response.data[0].email,
    };
  }
);

const initialState = {
  userList: [],
  userLogin: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("action => ", action);
      if (action.payload) {
        alert("login success");
        localStorage.setItem("userLogin", JSON.stringify(action.payload));
      } else {
        // redirect ke login dengan message "user not found "
      }
    });
  },
});

export default userSlice.reducer;
