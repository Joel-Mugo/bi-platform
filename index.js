import { runQuery, datasetName } from '../../../utils/bigquery';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const sql = `SELECT * FROM \`${process.env.GCP_PROJECT_ID}.${datasetName()}.factories\` ORDER BY name`;
      const rows = await runQuery(sql);
      return res.status(200).json(rows);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
