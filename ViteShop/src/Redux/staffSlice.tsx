import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

// Define interfaces for staff data
interface StaffMember {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface StaffState {
  loading: boolean;
  members: StaffMember[];
}

// Define the initial state
const initialState: StaffState = {
  loading: false,
  members: [],
};

// Define the thunk action payload types
interface AddUpdateStaffArgs {
  id?: string;
  name: string;
  phone: string;
  address: string;
  email?: string;
  password?: string;
}

// Fetch staff members
export const fetchStaff = createAsyncThunk<StaffMember[]>(
  "staff/fetchStaff",
  async () => {
    const response = await axios.get(`${api_endpoint}/staff`);
    return response.data;
  }
);

// Add a new staff member
export const addStaff = createAsyncThunk<void, AddUpdateStaffArgs>(
  "staff/addStaff",
  async ({ name, phone, address, email, password }, { dispatch }) => {
    await axios.post(
      `${api_endpoint}/staff`,
      {
        name,
        phone,
        address,
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(fetchStaff());
  }
);

// Update an existing staff member
export const updateStaff = createAsyncThunk<void, AddUpdateStaffArgs>(
  "staff/updateStaff",
  async ({ id, name, phone, address }, { dispatch }) => {
    await axios.put(`${api_endpoint}/staff/${id}`, {
      name,
      phone,
      address,
    });

    dispatch(fetchStaff());
  }
);

// Create the staff slice
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch staff
    builder.addCase(fetchStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStaff.fulfilled, (state, action: PayloadAction<StaffMember[]>) => {
      state.members = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchStaff.rejected, (state) => {
      state.loading = false;
    });

    // Add staff
    builder.addCase(addStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStaff.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addStaff.rejected, (state) => {
      state.loading = false;
    });

    // Update staff
    builder.addCase(updateStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStaff.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateStaff.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default staffSlice.reducer;
