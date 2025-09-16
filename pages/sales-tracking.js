import React, { useState } from 'react';
import useSWR from 'swr';
import ScoreCard from '../components/ScoreCard';
import DataTable from '../components/DataTable';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function SalesTracking() {
  const { data: sales, mutate } = useSWR('/api/sales', fetcher);
  const [form, setForm] = useState({ client: '', sales_order_number: '', client_po_number: '', product: '', qty: 0, expected_dispatch_date: '' });

  async function submit(e) {
    e.preventDefault();
    await fetch('/api/sales', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ client: '', sales_order_number: '', client_po_number: '', product: '', qty: 0, expected_dispatch_date: '' });
    mutate();
  }

  const cols = [
    { key: 'sales_order_number', title: 'Sales Order' },
    { key: 'client_po_number', title: 'Client PO No' },
    { key: 'client', title: 'Client' },
    { key: 'product', title: 'Product' },
    { key: 'qty', title: 'Qty' },
    { key: 'expected_dispatch_date', title: 'Expected Dispatch' },
    { key: 'status', title: 'Status' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard title="Total Sales Orders" value={sales ? sales.length : '—'} />
        <ScoreCard title="Total Qty" value={sales ? sales.reduce((s, x) => s + (Number(x.qty) || 0), 0) : '—'} />
        <ScoreCard title="On-time %" value={'—'} />
      </div>

      <section className="card p-4">
        <h3 className="text-lg font-semibold">Add New Sales Order</h3>
        <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={submit}>
          <input required placeholder="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="p-2 border rounded" />
          <input required placeholder="Sales Order No" value={form.sales_order_number} onChange={(e) => setForm({ ...form, sales_order_number: e.target.value })} className="p-2 border rounded" />
          <input placeholder="Client PO No" value={form.client_po_number} onChange={(e) => setForm({ ...form, client_po_number: e.target.value })} className="p-2 border rounded" />
          <input required placeholder="Product" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="p-2 border rounded" />
          <input required type="number" placeholder="Qty" value={form.qty} onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })} className="p-2 border rounded" />
          <input required type="date" value={form.expected_dispatch_date} onChange={(e) => setForm({ ...form, expected_dispatch_date: e.target.value })} className="p-2 border rounded" />
          <div className="md:col-span-2">
            <button type="submit" className="px-4 py-2 rounded bg-corp-500 text-white">Save Sales Order</button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Sales Orders Table</h4>
          <DataTable columns={cols} data={sales || []} />
        </div>
      </section>
    </div>
  );
}
