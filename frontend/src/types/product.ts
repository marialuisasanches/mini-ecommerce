export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
  createdAt: string;
};

export type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
};

export type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: string;
  };
};
