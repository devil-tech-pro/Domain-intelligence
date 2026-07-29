-- Domain Intelligence Tool Database Schema

-- Domains table
CREATE TABLE IF NOT EXISTS domains (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WHOIS data table
CREATE TABLE IF NOT EXISTS whois_data (
    id SERIAL PRIMARY KEY,
    domain_id INTEGER REFERENCES domains(id) ON DELETE CASCADE,
    registrar VARCHAR(255),
    creation_date VARCHAR(255),
    expiry_date VARCHAR(255),
    updated_date VARCHAR(255),
    name_servers TEXT,
    status VARCHAR(255),
    registrant_name VARCHAR(255),
    registrant_organization VARCHAR(255),
    registrant_country VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DNS records table
CREATE TABLE IF NOT EXISTS dns_records (
    id SERIAL PRIMARY KEY,
    domain_id INTEGER REFERENCES domains(id) ON DELETE CASCADE,
    record_type VARCHAR(10) NOT NULL,
    record_value TEXT NOT NULL,
    ttl INTEGER,
    priority INTEGER,
    exchange VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SSL certificates table
CREATE TABLE IF NOT EXISTS ssl_certificates (
    id SERIAL PRIMARY KEY,
    domain_id INTEGER REFERENCES domains(id) ON DELETE CASCADE,
    issuer_name VARCHAR(255),
    issuer_organization VARCHAR(255),
    issuer_country VARCHAR(255),
    subject_name VARCHAR(255),
    subject_organization VARCHAR(255),
    subject_country VARCHAR(255),
    validity_not_before VARCHAR(255),
    validity_not_after VARCHAR(255),
    validity_days_remaining INTEGER,
    protocol VARCHAR(50),
    cipher_name VARCHAR(100),
    cipher_version VARCHAR(50),
    serial_number VARCHAR(255),
    fingerprint VARCHAR(255),
    signature_algorithm VARCHAR(100),
    key_algorithm VARCHAR(100),
    key_size VARCHAR(50),
    valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(255) NOT NULL,
    report_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_domains_domain ON domains(domain);
CREATE INDEX IF NOT EXISTS idx_whois_data_domain_id ON whois_data(domain_id);
CREATE INDEX IF NOT EXISTS idx_dns_records_domain_id ON dns_records(domain_id);
CREATE INDEX IF NOT EXISTS idx_dns_records_type ON dns_records(record_type);
CREATE INDEX IF NOT EXISTS idx_ssl_certificates_domain_id ON ssl_certificates(domain_id);
CREATE INDEX IF NOT EXISTS idx_reports_domain ON reports(domain);
