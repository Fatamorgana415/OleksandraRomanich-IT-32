export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
}

export interface DummyJsonProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface OrderFormValues {
  name: string;
  email: string;
  productTitle: string;
  quantity: string;
  notes: string;
}

export interface OrderFieldErrors {
  name?: string;
  email?: string;
  productTitle?: string;
  quantity?: string;
  notes?: string;
}

export interface OrderActionState {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: OrderFieldErrors;
  values?: OrderFormValues;
  order?: {
    orderId: string;
    submittedAt: string;
    name: string;
    email: string;
    productTitle: string;
    quantity: number;
    notes: string;
  };
}
