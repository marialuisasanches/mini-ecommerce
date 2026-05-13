import { Filter, PlusCircle, RefreshCcw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductStats } from '@/components/products/ProductStats';
import { ProductFormDialog } from '@/components/products/ProductFormDialog';
import { DeleteProductDialog } from '@/components/products/DeleteProductDialog';
import { ProductTable } from '@/components/products/ProductTable';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductFormValues } from '@/types/product';

type ProductStatusFilter = 'all' | 'active' | 'inactive';

export function ProductsDashboard(): JSX.Element {
  const {
    products,
    isLoading,
    isRefreshing,
    error,
    refreshProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<ProductStatusFilter>('all');

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const inventoryValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
  const totalCategories = new Set(products.map((product) => product.category.toLowerCase())).size;
  const activeProducts = products.filter((product) => product.stock > 0).length;
  const categories = [...new Set(products.map((product) => product.category))].sort((left, right) =>
    left.localeCompare(right),
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.description, product.category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && product.stock > 0) ||
        (statusFilter === 'inactive' && product.stock === 0);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, statusFilter]);

  function handleOpenCreate(): void {
    setSelectedProduct(null);
    setIsFormOpen(true);
  }

  async function handleRefresh(): Promise<void> {
    try {
      await refreshProducts();
      toast.success('Produtos atualizados.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha ao atualizar produtos.');
    }
  }

  function handleOpenEdit(product: Product): void {
    setSelectedProduct(product);
    setIsFormOpen(true);
  }

  function handleOpenDelete(product: Product): void {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  }

  async function handleSubmit(values: ProductFormValues): Promise<void> {
    setIsSubmitting(true);

    try {
      if (selectedProduct) {
        await handleUpdateProduct(selectedProduct.id, values);
        toast.success('Produto atualizado com sucesso.');
      } else {
        await handleCreateProduct(values);
        toast.success('Produto criado com sucesso.');
      }
    } catch (submitError) {
      toast.error(
        submitError instanceof Error ? submitError.message : 'Nao foi possivel salvar o produto.',
      );
      throw submitError;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete(): Promise<void> {
    if (!selectedProduct) {
      return;
    }

    setIsDeleting(true);

    try {
      await handleDeleteProduct(selectedProduct.id);
      toast.success('Produto removido com sucesso.');
      setSelectedProduct(null);
    } catch (deleteError) {
      toast.error(
        deleteError instanceof Error ? deleteError.message : 'Nao foi possivel remover o produto.',
      );
      throw deleteError;
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AppShell>
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Dashboard de produtos
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Catálogo completo com controle operacional.
              </h2>
              <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
                Gerencie produtos, acompanhe métricas e encontre itens rapidamente usando busca e
                filtros.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <Button
                variant="outline"
                onClick={() => void handleRefresh()}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button onClick={handleOpenCreate}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo produto
              </Button>
            </div>
          </div>
        </div>

        <ProductStats
          totalProducts={totalProducts}
          totalStock={totalStock}
          inventoryValue={inventoryValue}
          totalCategories={totalCategories}
          activeProducts={activeProducts}
        />

        <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome, descrição ou categoria"
                className="h-12 pl-11"
              />
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtros
              </div>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-ring"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  Todos
                </Button>
                <Button
                  type="button"
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('active')}
                >
                  Ativos
                </Button>
                <Button
                  type="button"
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('inactive')}
                >
                  Sem estoque
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {filteredProducts.length} resultados
            </Badge>
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {categories.length} categorias
            </Badge>
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {activeProducts} ativos
            </Badge>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive shadow-soft">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-white/80 bg-white/90 p-10 text-center text-sm text-muted-foreground shadow-soft">
            Carregando produtos...
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </section>

      <ProductFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={selectedProduct}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <DeleteProductDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        product={selectedProduct}
        isSubmitting={isDeleting}
        onConfirm={handleConfirmDelete}
      />
    </AppShell>
  );
}
