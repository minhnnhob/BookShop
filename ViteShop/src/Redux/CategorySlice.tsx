import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";
import { Category } from "../Types";



interface CategoryState {
    loading: boolean;
    items: Category[];
    navCatOpen: boolean;
}

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async () => {
        const response = await axios.get<Category[]>(`${api_endpoint}/category`);
        return response.data;
    }
);

interface AddCategoryPayload {
    name: string;
    description: string;
}

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async ({ name, description }: AddCategoryPayload, { dispatch }) => {
        await axios.post(
            `${api_endpoint}/category`,
            { name: name, description: description },
            { withCredentials: true }
        );

        dispatch(fetchCategories());
    }
);

interface UpdateCategoryPayload {
    id: number;
    name: string;
    description: string;
}

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, name, description }: UpdateCategoryPayload, { dispatch }) => {
        await axios.put(`${api_endpoint}/category/${id}`, {
            name: name,
            description: description,
        });

        dispatch(fetchCategories());
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: { loading: false, items: [], navCatOpen: false } as CategoryState,
    reducers: {
        toggleNavCat: (state) => {
            state.navCatOpen = !state.navCatOpen;
        },
    },
    extraReducers: (builder) => {
        // Fetch category
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.loading = false;
        });

        // Add category
        builder.addCase(addCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addCategory.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addCategory.rejected, (state) => {
            state.loading = false;
        });
    },
});

export const { toggleNavCat } = categorySlice.actions;

export default categorySlice.reducer;
