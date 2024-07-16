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
  paymentMethod: string;
  date: Date;
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
  author: string;
  publisher: string;
  publishcationDate: Date;
  quantity: number;
  // Add other product fields as necessary
}

export interface Category {
  [x: string]: string;
  id: string;
  name: string;
}

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
}