import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message ?? 'Erro ao logar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="mb-4 text-2xl font-semibold">Entrar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div>
          <button
            className="rounded bg-primary px-4 py-2 text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
