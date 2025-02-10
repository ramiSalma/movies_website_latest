import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = {
  loading: false,
  users: [],
  error: null,
};

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Add User
export const addUser = createAsyncThunk("users/addUser", async (_, { rejectWithValue }) => {
  try {
    const newUser = { name: "New User", username: "newuser", email: "newuser@example.com" };
    const response = await axios.post(API_URL, newUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update User
export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export default userSlice.reducer;
