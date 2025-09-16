import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-corp-100 to-corp-200 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/kutoka-logo.png" alt="Kutoka" className="h-8" />
            <img src="/fairoils-logo.png" alt="Fairoils" className="h-8" />
          </div>
          <nav className="ml-6 flex gap-4">
            <Link href="/"><a className="font-semibold px-3 py-1 rounded-md hover:bg-white/20">Dashboard</a></Link>
            <Link href="/po-tracking"><a className="px-3 py-1 rounded-md hover:bg-white/20">PO Tracking</a></Link>
            <Link href="/sales-tracking"><a className="px-3 py-1 rounded-md hover:bg-white/20">Sales Tracking</a></Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <div className="hidden md:flex items-center gap-2"><span className="text-slate-500">Signed in as</span><strong>Operations</strong></div>
        </div>
      </div>
    </header>
  );
}
