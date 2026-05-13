export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string | null;
  createdAt: Date;
};

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
};

export type UpdateProductInput = CreateProductInput;
