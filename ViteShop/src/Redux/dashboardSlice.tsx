import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

interface Statistic {
    revenue: any[];
    orders: any[];
    users: any[];
}

interface DashboardState {
    loading: boolean;
    statistic: Statistic;
}

export const getStatistic = createAsyncThunk(
    "dashboard/getStatistic",
    async () => {
        const response = await axios.get(`${api_endpoint}/dashboard`, {
            withCredentials: true,
        });

        return response.data;
    }
);

const initialState: DashboardState = {
    loading: false,
    statistic: {
        revenue: [],
        orders: [],
        users: [],
    },
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get order statistic
        builder.addCase(getStatistic.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStatistic.fulfilled, (state, action: PayloadAction<Statistic>) => {
            state.statistic = { ...action.payload };
            state.loading = false;
        });
        builder.addCase(getStatistic.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default dashboardSlice.reducer;
