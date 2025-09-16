import React from 'react';
import useSWR from 'swr';
import ScoreCard from '../components/ScoreCard';
import DataTable from '../components/DataTable';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  const { data: factories } = useSWR('/api/factories', fetcher);
  const { data: sales } = useSWR('/api/sales', fetcher);
  const { data: pos } = useSWR('/api/po', fetcher);

  const totalProjectedQty = factories ? factories.reduce((s, f) => s + ((Number(f.daily_capacity) || 0) * 20), 0) : 0;
  const projectedOil = Math.round(totalProjectedQty * 0.12);

  const chartData = factories ? factories.map((f) => ({ name: f.name || 'Factory', efficiency: Math.min(100, (Math.random() * 40) + 50) })) : [];

  const salesColumns = [
    { key: 'sales_order_number', title: 'Sales Order' },
    { key: 'client_po_number', title: 'Client PO No' },
    { key: 'client', title: 'Client' },
    { key: 'product', title: 'Product' },
    { key: 'qty', title: 'Quantity' },
    { key: 'order_date', title: 'Order Date' },
    { key: 'expected_dispatch_date', title: 'Expected Dispatch' },
    { key: 'status', title: 'Status' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard title="Total Projected Qty" value={totalProjectedQty} subtitle="Next 4 weeks" />
        <ScoreCard title="Projected Oil (kg)" value={projectedOil} subtitle="Estimated" />
        <ScoreCard title="Active Factories" value={factories ? factories.length : '—'} subtitle="Factories" />
      </div>

      <section className="card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Production Planning — 4-week Forecast</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-white/20">Grid</button>
            <button className="px-3 py-1 rounded bg-white/10">Timeline</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="card p-4">
              <h4 className="text-sm text-slate-600">Factory Efficiency Trends</h4>
              <div style={{ height: 300 }} className="mt-3">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="efficiency" stroke="#2f9cff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-4">
              <h4 className="text-sm text-slate-600">Quick Production Summary</h4>
              <div className="mt-3 space-y-2">
                <div className="text-sm">Projected Start Date: <strong>2025-09-15</strong></div>
                <div className="text-sm">Utilization: <strong>72%</strong></div>
                <div className="text-sm">Projected Rounds: <strong>3</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Sales Orders</h4>
          <DataTable columns={salesColumns} data={sales || []} />
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Purchase Orders</h4>
          <DataTable columns={salesColumns} data={pos || []} />
        </div>
      </section>
    </div>
  );
}
