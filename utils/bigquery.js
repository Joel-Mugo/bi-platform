import { BigQuery } from '@google-cloud/bigquery';

let bigquery;

function initBigQuery() {
  if (bigquery) return bigquery;

  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  bigquery = new BigQuery({
    projectId: process.env.GOOGLE_PROJECT_ID,
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

export function datasetName() {
  return process.env.BIGQUERY_DATASET || 'production_planner';
}

export default { initBigQuery, runQuery, datasetName };
