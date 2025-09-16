import { runQuery, datasetName } from "@/utils/bigquery";

export default async function handler(req, res) {
  try {
    const sql = `
      SELECT *
      FROM \`${process.env.GOOGLE_PROJECT_ID}.${datasetName()}.factories\`
      LIMIT 5
    `;
    const rows = await runQuery(sql);

    res.status(200).json({
      success: true,
      message: "BigQuery connection successful!",
      rows,
    });
  } catch (error) {
    console.error("BigQuery test error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
