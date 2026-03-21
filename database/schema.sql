# ScholarMatch - Database Schema

## Overview
Using Neon (PostgreSQL) - free tier compatible with Netlify Functions

---

## Tables

### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    state VARCHAR(2),
    gpa DECIMAL(3,2),
    year VARCHAR(50),
    major VARCHAR(255),
    citizenship VARCHAR(50),
    background_categories JSONB DEFAULT '[]',
    tier VARCHAR(20) DEFAULT 'free',
    email_consent BOOLEAN DEFAULT FALSE,
    sms_consent BOOLEAN DEFAULT FALSE,
    stripe_customer_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### scholarships
```sql
CREATE TABLE scholarships (
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
```

### matches
```sql
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    scholarship_id UUID REFERENCES scholarships(id),
    score INTEGER,
    matched_at TIMESTAMP DEFAULT NOW()
);
```

### consent_logs
```sql
CREATE TABLE consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    consent_type VARCHAR(50),
    granted BOOLEAN,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## Indexes
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);
CREATE INDEX idx_matches_user ON matches(user_id);
```

---

## API Endpoints Needed

### POST /api/signup
- Input: email, name, phone, state, gpa, year, major, citizenship, categories
- Output: user_id, success

### GET /api/matches/:user_id
- Output: array of matching scholarships

### POST /api/consent
- Input: user_id, consent_type, granted

### PUT /api/profile
- Input: user_id, updated fields

---

## Setup Steps

1. Sign up at neon.tech (free)
2. Create database "scholarmatch"
3. Run schema.sql
4. Get connection string
5. Add to Netlify env vars
