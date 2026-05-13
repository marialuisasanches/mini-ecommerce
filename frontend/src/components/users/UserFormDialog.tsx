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
import { User, UserFormValues } from '@/types/user';

const userFormSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatorio'),
  email: z.string().trim().email('Email invalido'),
  role: z.enum(['customer', 'admin']),
});

type UserFormValuesSchema = z.infer<typeof userFormSchema>;

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
  user?: User | null;
  isSubmitting?: boolean;
};

const defaultValues: UserFormValuesSchema = {
  name: '',
  email: '',
  role: 'customer',
};

function normalizeFormValues(values: UserFormValuesSchema): UserFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    role: values.role,
  };
}

export function UserFormDialog({
  open,
  onOpenChange,
  onSubmit,
  user,
  isSubmitting = false,
}: UserFormDialogProps): JSX.Element {
  const form = useForm<UserFormValuesSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
      });
      return;
    }

    if (open) {
      form.reset(defaultValues);
    }
  }, [form, open, user]);

  async function handleSubmit(values: UserFormValuesSchema): Promise<void> {
    await onSubmit(normalizeFormValues(values));
    onOpenChange(false);
    form.reset(defaultValues);
  }

  const isEditing = Boolean(user);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar usuário' : 'Novo usuário'}</DialogTitle>
          <DialogDescription>
            Preencha os dados para{' '}
            {isEditing
              ? 'atualizar o registro selecionado'
              : 'adicionar um novo usuário ao sistema'}
            .
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Maria Silva" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="maria@example.com"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="role">Perfil</Label>
              <select
                id="role"
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-ring"
                {...form.register('role')}
              >
                <option value="customer">customer</option>
                <option value="admin">admin</option>
              </select>
              {form.formState.errors.role && (
                <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isEditing ? 'Salvar alterações' : 'Criar usuário'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
