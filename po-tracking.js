import React, { useState } from 'react';
import useSWR from 'swr';
import ScoreCard from '../components/ScoreCard';
import DataTable from '../components/DataTable';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function POTracking() {
  const { data: pos, mutate } = useSWR('/api/po', fetcher);
  const [form, setForm] = useState({ supplier: '', po_number: '', product: '', qty: 0, expected_delivery_date: '' });

  async function submit(e) {
    e.preventDefault();
    await fetch('/api/po', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) });
    setForm({ supplier: '', po_number: '', product: '', qty: 0, expected_delivery_date: '' });
    mutate();
  }

  const cols = [
    { key: 'supplier', title: 'Supplier' },
    { key: 'po_number', title: 'PO No' },
    { key: 'product', title: 'Product' },
    { key: 'qty', title: 'Qty' },
    { key: 'expected_delivery_date', title: 'Expected Delivery' },
    { key: 'status', title: 'Status' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard title="Total POs" value={pos ? pos.length : '—'} />
        <ScoreCard title="Pending Deliveries" value={pos ? pos.filter((p) => p.status === 'Pending').length : '—'} />
        <ScoreCard title="On-time %" value={'—'} />
      </div>

      <section className="card p-4">
        <h3 className="text-lg font-semibold">Add New Purchase Order</h3>
        <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={submit}>
          <input required placeholder="Supplier" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className="p-2 border rounded" />
          <input required placeholder="PO Number" value={form.po_number} onChange={(e) => setForm({ ...form, po_number: e.target.value })} className="p-2 border rounded" />
          <input required placeholder="Product" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="p-2 border rounded" />
          <input required type="number" placeholder="Qty" value={form.qty} onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })} className="p-2 border rounded" />
          <input required type="date" value={form.expected_delivery_date} onChange={(e) => setForm({ ...form, expected_delivery_date: e.target.value })} className="p-2 border rounded" />
          <div className="md:col-span-2">
            <button type="submit" className="px-4 py-2 rounded bg-corp-500 text-white">Save PO</button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">PO Table</h4>
          <DataTable columns={cols} data={pos || []} />
        </div>
      </section>
    </div>
  );
}
