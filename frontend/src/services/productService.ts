import { api } from './api';
import { ApiSuccessResponse, Product, ProductFormValues } from '../types/product';

const PRODUCTS_ENDPOINT = '/products';

type ProductResponse = ApiSuccessResponse<Product>;
type ProductListResponse = ApiSuccessResponse<Product[]>;

function normalizeProductPayload(values: ProductFormValues): ProductFormValues {
  return {
    ...values,
    imageUrl: values.imageUrl?.trim() ? values.imageUrl.trim() : undefined,
  };
}

export async function listProducts(): Promise<Product[]> {
  const response = await api.get<ProductListResponse>(PRODUCTS_ENDPOINT);

  return response.data.data;
}

export async function createProduct(values: ProductFormValues): Promise<Product> {
  const response = await api.post<ProductResponse>(
    PRODUCTS_ENDPOINT,
    normalizeProductPayload(values),
  );

  return response.data.data;
}

export async function updateProduct(id: string, values: ProductFormValues): Promise<Product> {
  const response = await api.put<ProductResponse>(
    `${PRODUCTS_ENDPOINT}/${id}`,
    normalizeProductPayload(values),
  );

  return response.data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`${PRODUCTS_ENDPOINT}/${id}`);
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<ProductResponse>(`${PRODUCTS_ENDPOINT}/${id}`);

  return response.data.data;
}
