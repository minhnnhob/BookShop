import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint, storage } from "../Services/config";
import { v4 as uuidv4 } from "uuid"; // For unique thumbnail file name
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

// Define interfaces for the product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnailUrl?: string;
  // Add other product fields as necessary
}

interface FeaturedItems {
  bestSelling: Product[];
  newlyProduct: Product[];
}

interface ProductsState {
  loading: boolean;
  items: Product[];
  featuredItems: FeaturedItems;
  error: string | null;
}

// Define the thunk action payload types
interface FetchProductsArgs {
  category?: string;
  search?: string;
}

interface AddUpdateProductArgs {
  productData: Product;
  thumbnailFile: File;
}

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk<Product[]>(
  "product/fetchFeaturedProducts",
  async () => {
    const response = await axios.get(`${api_endpoint}/product/featured`);
    return response.data;
  }
);

// Fetch products with optional category and search filters
export const fetchProducts = createAsyncThunk<Product[], FetchProductsArgs>(
  "product/fetchProducts",
  async ({ category, search }) => {
    const response = await axios.get(
      `${api_endpoint}/product/?category=${category || ""}&search=${search || ""}`
    );
    return response.data;
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk<Product, string>(
  "product/fetchProductById",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/product/${id}`);
    return response.data;
  }
);

// Add a new product
export const addProduct = createAsyncThunk<
  Product,
  AddUpdateProductArgs,
  { rejectValue: string }
>(
  "product/addProduct",
  async ({ productData, thumbnailFile }, { rejectWithValue }) => {
    try {
      const storageRef = ref(storage, `thumbnails/${uuidv4()}/${thumbnailFile.name}`);
      const uploadSnapshot = await uploadBytes(storageRef, thumbnailFile); // Upload file to storage
      productData.thumbnailUrl = await getDownloadURL(uploadSnapshot.ref); // Get download url of the file
    } catch (error) {
      return rejectWithValue("Failed to upload thumbnail");
    }

    try {
      const response = await axios.post(
        `${api_endpoint}/product`,
        productData,
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

// Update an existing product
export const updateProduct = createAsyncThunk<
  void,
  AddUpdateProductArgs,
  { rejectValue: string }
>(
  "product/updateProduct",
  async ({ productData, thumbnailFile }, { dispatch, rejectWithValue }) => {
    try {
      if (thumbnailFile) {
        const storageRef = ref(storage, `thumbnails/${uuidv4()}/${thumbnailFile.name}`);
        const uploadSnapshot = await uploadBytes(storageRef, thumbnailFile); // Upload file to storage
        productData.thumbnailUrl = await getDownloadURL(uploadSnapshot.ref); // Get download url of the file
      }
    } catch (error) {
      return rejectWithValue("Failed to upload thumbnail");
    }

    try {
      await axios.put(
        `${api_endpoint}/product/${productData.id}`,
        productData,
        { withCredentials: true }
      );
      dispatch(fetchProducts({})); // Fetch updated products list
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return rejectWithValue(error.response.data as string);
        }
        return rejectWithValue('An unknown error occurred');    }
  }
);

// Define the initial state
const initialState: ProductsState = {
  loading: false,
  items: [],
  featuredItems: {
    bestSelling: [],
    newlyProduct: [],
  },
  error: null,
};

// Create the products slice
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });

    // Fetch featured products
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<FeaturedItems>) => {
      state.featuredItems = action.payload;
    });

    // Fetch product by ID
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product by ID";
    });

    // Add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });

    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
