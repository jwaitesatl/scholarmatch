-- ScholarMatch Database Setup
-- Run this in Neon SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    state VARCHAR(2),
    gpa DECIMAL(3,2),
    year VARCHAR(50),
    major VARCHAR(255),
    citizenship VARCHAR(50) DEFAULT 'us',
    background_categories JSONB DEFAULT '[]',
    tier VARCHAR(20) DEFAULT 'free',
    email_consent BOOLEAN DEFAULT FALSE,
    sms_consent BOOLEAN DEFAULT FALSE,
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Scholarships table
CREATE TABLE IF NOT EXISTS scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(500) NOT NULL,
    provider VARCHAR(255),
    amount INTEGER,
    deadline DATE,
    min_gpa DECIMAL(3,2),
    major VARCHAR(255),
    year VARCHAR(50),
    citizenship VARCHAR(50),
    categories JSONB DEFAULT '[]',
    description TEXT,
    url VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scholarship_id UUID REFERENCES scholarships(id) ON DELETE CASCADE,
    score INTEGER,
    matched_at TIMESTAMP DEFAULT NOW()
);

-- Consent logs table
CREATE TABLE IF NOT EXISTS consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    consent_type VARCHAR(50),
    granted BOOLEAN,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_scholarships_deadline ON scholarships(deadline);
CREATE INDEX IF NOT EXISTS idx_matches_user ON matches(user_id);

-- Insert sample scholarships
INSERT INTO scholarships (name, provider, amount, deadline, min_gpa, major, year, citizenship, categories, description, verified) VALUES
('Coca-Cola Scholars Foundation', 'Coca-Cola', 20000, '2026-10-31', 3.0, 'any', 'senior', 'us', '["community_service"]', 'Achievement-based for HS seniors', true),
('Bill Gates Scholarship', 'Gates Foundation', 10000, '2026-04-15', 3.5, 'any', 'any', 'us', '["low_income", "first_generation"]', 'For high-achieving students', true),
('First Generation Grant', 'Education Foundation', 5000, '2026-04-15', 2.5, 'any', 'any', 'us', '["first_generation", "low_income"]', 'Supporting first-gen students', true),
('AIME Foster Youth', 'AIME', 10000, '2026-03-31', 0, 'any', 'any', 'us', '["foster_care", "homeless"]', 'For foster youth', true),
('Military Family Scholarship', 'Veterans Foundation', 5000, '2026-04-01', 2.5, 'any', 'any', 'us', '["veteran", "military_family"]', 'For military families', true),
('Pat Tillman Scholarship', 'Pat Tillman Foundation', 10000, '2026-03-31', 2.5, 'any', 'any', 'us', '["veteran", "military_family"]', 'For veterans', true),
('Hispanic Scholarship Fund', 'HSF', 5000, '2026-04-15', 2.5, 'any', 'any', 'us', '["minority"]', 'For Hispanic students', true),
('UNCF Scholarship', 'UNCF', 5000, '2026-04-15', 2.5, 'any', 'any', 'us', '["minority", "african_american"]', 'For African American students', true),
('Pride Foundation', 'Pride Foundation', 5000, '2026-04-01', 2.5, 'any', 'any', 'us', '["lgbtq", "homeless"]', 'For LGBTQ+ students', true),
('Future Nurses Scholarship', 'Nursing Foundation', 5000, '2026-05-15', 3.0, 'Nursing', 'any', 'us', '["minority"]', 'For nursing students', true);

-- Check if tables created
SELECT 'Users:', COUNT(*) FROM users;
SELECT 'Scholarships:', COUNT(*) FROM scholarships;
