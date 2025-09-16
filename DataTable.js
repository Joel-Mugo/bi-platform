import React from 'react';

export default function DataTable({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto card p-4">
      <table className="min-w-full text-sm divide-y">
        <thead className="text-left text-xs text-slate-500">
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.title} className="px-3 py-2">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((row, idx) => (
            <tr key={row.id ?? idx} className="hover:bg-slate-50">
              {columns.map((c) => (
                <td key={c.key || c.title} className="px-3 py-2 align-top">{c.render ? c.render(row) : (row[c.key] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
