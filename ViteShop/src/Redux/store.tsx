import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import addressReducer from "./addressSlice";
import staffReducer from "./staffSlice";
import orderReducer from "./orderSlice";
import dashboardReducer from "./dashboardSlice";

// Configure the store
const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
    address: addressReducer,
    staff: staffReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
