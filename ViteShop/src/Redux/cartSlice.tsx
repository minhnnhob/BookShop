import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

// Define the CartItem interface
interface CartItem {
    id: string;
    productId: string;
    quantity: number;
}

// Define the CartState interface
interface CartState {
    error: string | null;
    items: CartItem[];
}

// Fetch cart items thunk
export const fetchCartItems = createAsyncThunk<CartItem[]>(
    "cart/fetchCartItems",
    async () => {
        const response = await axios.get<CartItem[]>(`${api_endpoint}/cart`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Add item to cart thunk
export const addItemToCart = createAsyncThunk<void, { id: string; quantity?: number }, { rejectValue: string }>(
    "cart/addItemToCart",
    async ({ id, quantity = 1 }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(
                `${api_endpoint}/cart`,
                { productId: id, quantity: quantity },
                {
                    withCredentials: true,
                }
            );

            dispatch(fetchCartItems());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Update item in cart thunk
export const updateItemInCart = createAsyncThunk<void, { id: string; quantity: number }, { rejectValue: string }>(
    "cart/updateItemInCart",
    async ({ id, quantity }, { dispatch, rejectWithValue }) => {
        try {
            await axios.put(
                `${api_endpoint}/cart/${id}`,
                { quantity: quantity },
                { withCredentials: true }
            );

            dispatch(fetchCartItems());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Remove item from cart thunk
export const removeItemFromCart = createAsyncThunk<void, string, { rejectValue: string }>(
    "cart/removeItemFromCart",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await axios.delete(`${api_endpoint}/cart/${id}`, {
                withCredentials: true,
            });

            dispatch(fetchCartItems());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

// Create the cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        error: null,
        items: [] as CartItem[],
    } as CartState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        });
        // builder.addCase(fetchCartItems.rejected, (state, action: PayloadAction<string | undefined>) => {
        //     state.error = action.payload || 'Failed to fetch cart items';
        // });
        builder.addCase(addItemToCart.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to add item to cart';
        });
        builder.addCase(updateItemInCart.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to update item in cart';
        });
        builder.addCase(removeItemFromCart.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload || 'Failed to remove item from cart';
        });
    },
});

export default cartSlice.reducer;
