CREATE TABLE IF NOT EXISTS "__MigrationsHistory" (
    migration_id SERIAL PRIMARY KEY,
    product_version character varying(32) NOT NULL
);

insert into "__MigrationsHistory"(migration_id,product_version) values(2,'4');