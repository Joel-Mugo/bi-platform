CREATE SCHEMA IF NOT EXISTS `production_planner`;

CREATE TABLE IF NOT EXISTS `production_planner.factories` (
  id STRING NOT NULL,
  name STRING,
  daily_capacity INT64,
  location STRING,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS `production_planner.production_data` (
  factory_id STRING,
  product STRING,
  week STRING,
  year INT64,
  qty INT64,
  recovery_rate FLOAT64,
  projected_oil FLOAT64,
  active_days INT64,
  start_date DATE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS `production_planner.purchase_orders` (
  id STRING NOT NULL,
  supplier STRING,
  po_number STRING,
  product STRING,
  qty INT64,
  order_date DATE,
  expected_delivery_date DATE,
  week STRING,
  month INT64,
  quarter STRING,
  status STRING,
  timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `production_planner.sales_orders` (
  id STRING NOT NULL,
  client STRING,
  sales_order_number STRING,
  client_po_number STRING,
  product STRING,
  qty INT64,
  order_date DATE,
  expected_dispatch_date DATE,
  week STRING,
  month INT64,
  quarter STRING,
  status STRING,
  timestamp TIMESTAMP
);
