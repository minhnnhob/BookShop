import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";
import { fetchCartItems } from "./cartSlice";

interface Order {
    id: string;
    status: string;
    // Add other properties as needed
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    updating: boolean;
}

export const fetchAllOrders = createAsyncThunk(
    "order/fetchAllOrders",
    async () => {
        const response = await axios.get<Order[]>(`${api_endpoint}/order/all`, {
            withCredentials: true,
        });

        return response.data;
    }
);

export const fetchOrderById = createAsyncThunk(
    "order/fetchOrderById",
    async (id: string) => {
        const response = await axios.get<Order>(`${api_endpoint}/order/${id}`, {
            withCredentials: true,
        });

        return response.data;
    }
);

export const fetchCustomerOrders = createAsyncThunk(
    "order/fetchCustomerOrders",
    async () => {
        const response = await axios.get<Order[]>(`${api_endpoint}/order`, {
            withCredentials: true,
        });

        return response.data;
    }
);

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (orderData: Order, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post<Order>(
                `${api_endpoint}/order`,
                { ...orderData },
                { withCredentials: true }
            );

            dispatch(fetchCartItems()); // Cart is cleared after order is placed, so we need to fetch cart items again
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async (orderData: { id: string; status: string }, { dispatch, rejectWithValue }) => {
        const { id, status } = orderData;
        try {
            await axios.put(
                `${api_endpoint}/order/${id}`,
                { status: status },
                { withCredentials: true }
            );

            return dispatch(fetchAllOrders());
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data as string);
            }
            return rejectWithValue('An unknown error occurred');        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        updating: false,
    } as OrderState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all orders
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllOrders.rejected, (state) => {
            state.loading = false;
        });

        // Fetch customer orders
        builder.addCase(fetchCustomerOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCustomerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCustomerOrders.rejected, (state) => {
            state.loading = false;
        });

        // Fetch order by id
        builder.addCase(fetchOrderById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrderById.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(fetchOrderById.rejected, (state) => {
            state.loading = false;
        });

        // Add order
        builder.addCase(addOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addOrder.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addOrder.rejected, (state) => {
            state.loading = false;
        });

        // Update order status
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.updating = true;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state) => {
            state.updating = false;
        });
        builder.addCase(updateOrderStatus.rejected, (state) => {
            state.updating = false;
        });
    },
});

export default orderSlice.reducer;
