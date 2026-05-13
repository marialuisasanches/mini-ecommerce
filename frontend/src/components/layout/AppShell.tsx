import type { PropsWithChildren } from 'react';

export function AppShell({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.12),_transparent_24%),linear-gradient(180deg,_#f9fbfb_0%,_#f3f4f6_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:56px_56px] opacity-[0.18]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
