CREATE TABLE IF NOT EXISTS "Migration_History" (
    id SERIAL PRIMARY KEY,
    product_version character varying(32) NOT NULL,
    CONSTRAINT pk___ef_migrations_history PRIMARY KEY (migration_id)
);

insert into Migration_History(product_version) values('4');