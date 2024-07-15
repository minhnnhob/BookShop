// types.ts
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
}
  

export interface Order {
    id: string;
    status: string;
    shippingAddressId: string;
    paymentMethod:string;
    // Add other properties as needed
}

export interface Address {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    thumbnailUrl?: string;
    // Add other product fields as necessary
  }
  