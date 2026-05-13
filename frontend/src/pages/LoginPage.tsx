import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation, Link } from 'react-router-dom';
import { Store } from 'lucide-react';

export function LoginPage(): JSX.Element {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const successMessage = (location.state as any)?.message as string | undefined;

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/80 bg-white/95 shadow-lg backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-8 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-white/20 p-3">
                <Store className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Mini E-commerce</h1>
            <p className="text-emerald-100 text-sm mt-1">Painel operacional</p>
          </div>

          {/* Form Container */}
          <div className="px-8 py-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Entrar</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-foreground placeholder-slate-400 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white/50 hover:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Senha</label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-foreground placeholder-slate-400 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white/50 hover:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <p className="text-sm text-emerald-700 font-medium">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Carregando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 border-t border-slate-200 pt-6 text-center">
              <p className="text-slate-600">
                Não tem conta?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Plataforma segura com autenticação JWT
        </p>
      </div>
    </div>
  );
}
