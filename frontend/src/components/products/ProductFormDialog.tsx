import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product, ProductFormValues } from '@/types/product';

const productFormSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatorio'),
  description: z.string().trim().min(1, 'Descricao obrigatoria'),
  price: z.coerce.number().positive('Preco deve ser maior que zero'),
  stock: z.coerce.number().int().min(0, 'Estoque nao pode ser negativo'),
  category: z.string().trim().min(1, 'Categoria obrigatoria'),
  imageUrl: z.string().trim().url('URL invalida').or(z.literal('')).optional(),
});

type ProductFormValuesSchema = z.infer<typeof productFormSchema>;

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  product?: Product | null;
  isSubmitting?: boolean;
};

const defaultValues: ProductFormValuesSchema = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  imageUrl: '',
};

function normalizeFormValues(values: ProductFormValuesSchema): ProductFormValues {
  return {
    ...values,
    imageUrl: values.imageUrl?.trim() ? values.imageUrl.trim() : undefined,
  };
}

export function ProductFormDialog({
  open,
  onOpenChange,
  onSubmit,
  product,
  isSubmitting = false,
}: ProductFormDialogProps): JSX.Element {
  const form = useForm<ProductFormValuesSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        imageUrl: product.imageUrl ?? '',
      });
      return;
    }

    if (open) {
      form.reset(defaultValues);
    }
  }, [form, open, product]);

  async function handleSubmit(values: ProductFormValuesSchema): Promise<void> {
    await onSubmit(normalizeFormValues(values));
    onOpenChange(false);
    form.reset(defaultValues);
  }

  const isEditing = Boolean(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar produto' : 'Novo produto'}</DialogTitle>
          <DialogDescription>
            Preencha os dados para{' '}
            {isEditing ? 'atualizar o item selecionado' : 'adicionar um novo item ao catálogo'}.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Notebook Gamer" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Descricao</Label>
              <Textarea
                id="description"
                placeholder="Descricao do produto"
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preco</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="1999.90"
                {...form.register('price')}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Estoque</Label>
              <Input
                id="stock"
                type="number"
                step="1"
                min="0"
                placeholder="10"
                {...form.register('stock')}
              />
              {form.formState.errors.stock && (
                <p className="text-sm text-destructive">{form.formState.errors.stock.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="category">Categoria</Label>
              <Input id="category" placeholder="Eletronicos" {...form.register('category')} />
              {form.formState.errors.category && (
                <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="imageUrl">Imagem (opcional)</Label>
              <Input id="imageUrl" placeholder="https://..." {...form.register('imageUrl')} />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isEditing ? 'Salvar alterações' : 'Criar produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
