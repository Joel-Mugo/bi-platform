// pages/api/test-bq.js
import { runQuery } from '@/utils/bigquery';

export default async function handler(req, res) {
  try {
    // Example query: list first 5 rows from your `factories` table
    const sql = `
      SELECT * 
      FROM \`ka-bi-reports.production_planner.factories\`
      LIMIT 5
    `;

    const rows = await runQuery(sql);

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('BigQuery error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
