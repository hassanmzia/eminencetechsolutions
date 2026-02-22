-- Ensure the application user exists with the correct password
-- This runs on first-time database initialization only
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'eminence_user') THEN
        CREATE ROLE eminence_user WITH LOGIN PASSWORD 'eminence_dev_password_2024';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eminence_db TO eminence_user;
