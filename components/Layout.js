import React from 'react';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 py-6 max-w-7xl mx-auto">{children}</main>
      <footer className="bg-white/60 border-t py-3">
        <div className="max-w-7xl mx-auto text-sm text-slate-600">Kutoka & Fairoils — Production Planning Platform • © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
