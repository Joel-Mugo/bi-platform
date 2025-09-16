import { runQuery, datasetName } from '../../../utils/bigquery';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const sql = `SELECT * FROM \`${process.env.GCP_PROJECT_ID}.${datasetName()}.purchase_orders\` ORDER BY expected_delivery_date DESC LIMIT 1000`;
      const rows = await runQuery(sql);
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { supplier, po_number, product, qty, expected_delivery_date } = req.body || {};
      if (!supplier || !po_number || !product || !expected_delivery_date) return res.status(400).json({ error: 'Missing required fields' });
      const sql = `INSERT INTO \`${process.env.GCP_PROJECT_ID}.${datasetName()}.purchase_orders\` (id, supplier, po_number, product, qty, order_date, expected_delivery_date, week, month, quarter, status, timestamp) VALUES (GENERATE_UUID(), @supplier, @po_number, @product, @qty, CURRENT_DATE(), @expected_delivery_date, FORMAT_DATE('%V', DATE(@expected_delivery_date)), EXTRACT(MONTH FROM DATE(@expected_delivery_date)), CONCAT('Q', CAST(CEILING(EXTRACT(MONTH FROM DATE(@expected_delivery_date))/3) AS STRING)), 'Pending', CURRENT_TIMESTAMP())`;
      await runQuery(sql, { supplier, po_number, product, qty: Number(qty || 0), expected_delivery_date });
      return res.status(201).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
