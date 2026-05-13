import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as apiRegister } from '@/services/authService';

export function RegisterPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('As senhas nao coincidem');
      return;
    }

    setLoading(true);

    try {
      await apiRegister({ name, email, password });

      navigate('/login', { state: { message: 'Conta criada com sucesso. Faça login.' } });
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="mb-4 text-2xl font-semibold">Criar conta</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmar Senha</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            required
          />
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div>
          <button
            className="rounded bg-primary px-4 py-2 text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Carregando...' : 'Criar conta'}
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm">
        Ja tem uma conta?{' '}
        <Link to="/login" className="text-primary font-medium">
          Entrar
        </Link>
      </p>
    </div>
  );
}
