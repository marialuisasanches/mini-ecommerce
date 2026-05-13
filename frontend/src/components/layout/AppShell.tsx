import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function AppShell({ children }: PropsWithChildren): JSX.Element {
  const { user, logout } = useAuth();
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.12),_transparent_24%),linear-gradient(180deg,_#f9fbfb_0%,_#f3f4f6_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:56px_56px] opacity-[0.18]" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/90 px-5 py-4 shadow-soft backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Mini E-commerce
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Painel operacional
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-foreground hover:bg-muted/80',
                ].join(' ')
              }
            >
              Produtos
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-foreground hover:bg-muted/80',
                ].join(' ')
              }
            >
              Usuários
            </NavLink>
            <div className="ml-4 flex items-center gap-3">
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground">
                    {user.name} <span className="ml-2 font-medium">({user.role})</span>
                  </div>
                  <button
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                    onClick={() => logout()}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="rounded-full bg-muted px-3 py-1 text-sm font-semibold"
                >
                  Entrar
                </NavLink>
              )}
            </div>
          </nav>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
