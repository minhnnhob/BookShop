import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";
import { fetchCartItems } from "./cartSlice";

// Define interfaces for user data
interface User {
  id: string;
  email: string;
  role: string;
}

interface UserState {
  fetchCurrentUserLoading: boolean;
  loading: boolean;
  loggedIn: boolean;
  id: string | null;
  email: string | null;
  role: string | null;
}

// Define the initial state
const initialState: UserState = {
  fetchCurrentUserLoading: false,
  loading: false,
  loggedIn: false,
  id: null,
  email: null,
  role: null,
};

// Define the thunk action payload types
interface SigninPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
}

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

// Signin
export const signin = createAsyncThunk<User, SigninPayload, { rejectValue: any }>(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data as string);
        }
        return rejectWithValue('An unknown error occurred');    }
  }
);

// Signup
export const signup = createAsyncThunk<User, SignupPayload, { rejectValue: undefined }>(
  "user/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/auth/register`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk<void, UpdatePasswordPayload, { rejectValue: undefined }>(
  "user/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${api_endpoint}/auth/update-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Signout
export const signout = createAsyncThunk<void>(
  "user/signout",
  async () => {
    await axios.delete(`${api_endpoint}/auth/logout`, { withCredentials: true });
  }
);

// Fetch current user
export const fetchCurrentUser = createAsyncThunk<User>(
  "user/fetchCurrentUser",
  async (_, { dispatch }) => {
    const response = await axios.get(`${api_endpoint}/auth`, {
      withCredentials: true,
    });
    dispatch(fetchCartItems());
    return response.data;
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.fetchCurrentUserLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.loggedIn = true;
      state.id = user.id;
      state.email = user.email;
      state.role = user.role;
      state.fetchCurrentUserLoading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.fetchCurrentUserLoading = false;
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });

    // Signout
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.id = null;
      state.email = null;
      state.role = null;
    });
    builder.addCase(signout.rejected, (state) => {
      state.loading = false;
    });

    // Update password
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePassword.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
