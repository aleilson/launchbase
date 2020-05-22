DROP DATABASE IF EXISTS foodfy
CREATE DATABASE foodfy;


-- recipes
CREATE TABLE "receipts" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" INT NOT NULL,
  "title" TEXT NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (NOW()) 
  "updated_at" timestamp DEFAULT (NOW()) 
);

-- chefs
CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "file_id" int
);

-- files
CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

-- ligações dos files com recipes
CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

-- login
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "email" text UNIQUE NOT NULL,
  "password " text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" timestamp DEFAULT (NOW()) 
  "updated_at" timestamp DEFAULT (NOW()) 
);

-- foreign key
ALTER TABLE "receipts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");


ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "receipts" ("id");

-- create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- auto updated_at receipts
CREATE TRIGGER set_timestamp
BEFORE UPDATE on receipts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE on users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();



-- connect pg simple table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


ALTER TABLE "receipts"
DROP CONSTRAINT receipts_user_id_fkey,
ADD CONSTRAINT receipts_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "recipe_files"
DROP CONSTRAINT recipe_files_recipe_id_fkey,
ADD CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY ("recipe_id")
REFERENCES "receipts" ("id")
ON DELETE CASCADE;

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");