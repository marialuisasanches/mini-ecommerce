import { AlertTriangle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';

type DeleteProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onConfirm: () => Promise<void>;
  isSubmitting?: boolean;
};

export function DeleteProductDialog({
  open,
  onOpenChange,
  product,
  onConfirm,
  isSubmitting = false,
}: DeleteProductDialogProps): JSX.Element {
  async function handleConfirm(): Promise<void> {
    await onConfirm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <DialogTitle>Remover produto</DialogTitle>
          <DialogDescription>
            {product
              ? `Confirme a exclusao de ${product.name}. Essa acao nao pode ser desfeita.`
              : 'Confirme a exclusao do produto selecionado.'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
