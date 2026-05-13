import { useEffect, useState } from 'react';

import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from '@/services/productService';
import { Product, ProductFormValues } from '@/types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts(): Promise<void> {
    setError(null);
    setIsLoading(true);

    try {
      const items = await listProducts();
      setProducts(items);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Falha ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshProducts(): Promise<void> {
    setIsRefreshing(true);

    try {
      const items = await listProducts();
      setProducts(items);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleCreateProduct(values: ProductFormValues): Promise<Product> {
    const product = await createProduct(values);
    setProducts((currentProducts: Product[]) => [product, ...currentProducts]);

    return product;
  }

  async function handleUpdateProduct(id: string, values: ProductFormValues): Promise<Product> {
    const product = await updateProduct(id, values);
    setProducts((currentProducts: Product[]) =>
      currentProducts.map((currentProduct) =>
        currentProduct.id === id ? product : currentProduct,
      ),
    );

    return product;
  }

  async function handleDeleteProduct(id: string): Promise<void> {
    await deleteProduct(id);
    setProducts((currentProducts: Product[]) =>
      currentProducts.filter((product) => product.id !== id),
    );
  }

  useEffect(() => {
    void fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    isRefreshing,
    error,
    fetchProducts,
    refreshProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
