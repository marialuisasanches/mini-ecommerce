import { Edit3, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
  const { user } = useAuth();
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { useAuth } from '@/hooks/useAuth';

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

function ProductMobileCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}): JSX.Element {
  return (
    <Card className="border-white/80 bg-white/95 shadow-soft md:hidden">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Badge variant={product.stock > 0 ? 'secondary' : 'outline'}>
            {product.stock > 0 ? 'Ativo' : 'Sem estoque'}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-muted/60 p-3">
            <span className="block text-muted-foreground">Preco</span>
            <span className="font-semibold">{formatCurrency(product.price)}</span>
          </div>
                    {user?.role === 'admin' && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(product)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </Button>
                      </>
                    )}
    </Card>
  );
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps): JSX.Element {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/80 p-10 text-center text-sm text-muted-foreground shadow-soft">
        Nenhum produto encontrado. Crie o primeiro item para preencher o catalogo.
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-soft md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preco</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <p className="font-semibold text-foreground">{product.name}</p>
                </TableCell>
                <TableCell>
                  <p className="max-w-[28rem] text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="subtle">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <Badge variant={product.stock > 0 ? 'secondary' : 'outline'}>
                    {product.stock > 0 ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(product.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {(() => {
                      const { user } = useAuth();

                      if (user?.role === 'admin') {
                        return (
                          <>
                            <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                              <Edit3 className="mr-2 h-4 w-4" />
                              Editar
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onDelete(product)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remover
                            </Button>
                          </>
                        );
                      }

                      return null;
                    })()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <ProductMobileCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}
