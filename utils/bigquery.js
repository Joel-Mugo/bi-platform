// utils/bigquery.js
import { BigQuery } from '@google-cloud/bigquery';

let bigquery;

function initBigQuery() {
  if (bigquery) return bigquery;

  const keyBase64 = process.env.GCP_SERVICE_KEY_BASE64;
  if (!keyBase64) {
    throw new Error('Missing GCP_SERVICE_KEY_BASE64 env variable');
  }

  const credentials = JSON.parse(
    Buffer.from(keyBase64, 'base64').toString('utf8')
  );

  bigquery = new BigQuery({
    projectId: process.env.GCP_PROJECT_ID,
    credentials,
  });

  return bigquery;
}

export async function runQuery(sql, params = {}) {
  const bq = initBigQuery();
  const options = {
    query: sql,
    params,
    location: process.env.BIGQUERY_LOCATION || 'US',
    parameterMode: 'named',
  };
  const [rows] = await bq.query(options);
  return rows;
}
