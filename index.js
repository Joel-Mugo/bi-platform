import { runQuery, datasetName } from '../../../utils/bigquery';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const sql = `SELECT * FROM \`${process.env.GCP_PROJECT_ID}.${datasetName()}.sales_orders\` ORDER BY expected_dispatch_date DESC LIMIT 1000`;
      const rows = await runQuery(sql);
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { client, sales_order_number, client_po_number, product, qty, expected_dispatch_date } = req.body || {};
      if (!client || !sales_order_number || !product || !expected_dispatch_date) return res.status(400).json({ error: 'Missing required fields' });
      const sql = `INSERT INTO \`${process.env.GCP_PROJECT_ID}.${datasetName()}.sales_orders\` (id, client, sales_order_number, client_po_number, product, qty, order_date, expected_dispatch_date, week, month, quarter, status, timestamp) VALUES (GENERATE_UUID(), @client, @sales_order_number, @client_po_number, @product, @qty, CURRENT_DATE(), @expected_dispatch_date, FORMAT_DATE('%V', DATE(@expected_dispatch_date)), EXTRACT(MONTH FROM DATE(@expected_dispatch_date)), CONCAT('Q', CAST(CEILING(EXTRACT(MONTH FROM DATE(@expected_dispatch_date))/3) AS STRING)), 'Planned', CURRENT_TIMESTAMP())`;
      await runQuery(sql, { client, sales_order_number, client_po_number, product, qty: Number(qty || 0), expected_dispatch_date });
      return res.status(201).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
