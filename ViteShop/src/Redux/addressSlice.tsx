import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

// Define the Address interface
interface Address {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
}

// Define the AddressState interface
interface AddressState {
    error: string | null;
    loading: boolean;
    items: Address[];
}

// Fetch addresses thunk
export const fetchAddresses = createAsyncThunk<Address[]>(
    "address/fetchAddresses",
    async () => {
        const response = await axios.get<Address[]>(`${api_endpoint}/address`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Add address thunk
export const addAddress = createAsyncThunk<Address, Address, { rejectValue: string }>(
    "address/addAddress",
    async (addressData, { rejectWithValue }) => {
        try {
            const response = await axios.post<Address>(
                `${api_endpoint}/address`,
                addressData,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Update address thunk
export const updateAddress = createAsyncThunk<void, Address, { rejectValue: string }>(
    "address/updateAddress",
    async (addressData, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(
                `${api_endpoint}/address/${addressData.id}`,
                addressData,
                { withCredentials: true }
            );
            dispatch(fetchAddresses());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Remove address thunk
export const removeAddress = createAsyncThunk<void, string, { rejectValue: string }>(
    "address/deleteAddress",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${api_endpoint}/address/${id}`, {
                withCredentials: true,
            });
            dispatch(fetchAddresses());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Create the address slice
const addressSlice = createSlice({
    name: "address",
    initialState: {
        error: null,
        loading: false,
        items: [] as Address[],
    } as AddressState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch addresses
        builder.addCase(fetchAddresses.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAddresses.rejected, (state) => {
            state.loading = false;
        });

        // Add address
        builder.addCase(addAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
            state.items.push(action.payload);
            state.loading = false;
        });
        builder.addCase(addAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to add address';
            state.loading = false;
        });

        // Update address
        builder.addCase(updateAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAddress.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to update address';
            state.loading = false;
        });

        // Remove address
        builder.addCase(removeAddress.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeAddress.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(removeAddress.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to remove address';
            state.loading = false;
        });
    },
});

export default addressSlice.reducer;
