CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int UNIQUE,
  "name" text,
  "cpf" numeric,
  "tel" text,
  "address" text
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "cnpj" text,
  "description" text,
  "tel" text
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int UNIQUE,
  "state" text,
  "city" text,
  "street" text,
  "number" text
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "model_id" int UNIQUE,
  "trade_id" int UNIQUE,
  "car_color" text,
  "board" text,
  "mileage" text,
  "type_fuel" text
);

CREATE TABLE "trade" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int UNIQUE
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "description" text,
  "name" text,
  "car_brand" text,
  "model_vehicle" text
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int UNIQUE,
  "location_date" timestamp,
  "location_hours" timestamp,
  "devolution_date" timestamp,
  "mileage" text,
  "deposit_amount" text,
  "rental_amount" text
);

ALTER TABLE "agencies" ADD FOREIGN KEY ("id") REFERENCES "addresses" ("agency_id");

ALTER TABLE "models" ADD FOREIGN KEY ("id") REFERENCES "cars" ("model_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "customers" ("order_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "trade" ADD FOREIGN KEY ("id") REFERENCES "cars" ("trade_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id") REFERENCES "trade" ("order_id");
