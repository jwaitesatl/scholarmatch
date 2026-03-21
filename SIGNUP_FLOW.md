# ScholarMatch - Signup Flow & Backend Architecture

## Current State
- ✅ Frontend form collects: name, email, phone, state, GPA, year, major, citizenship, 24 background categories
- ✅ Client-side matching (demo)
- ❌ No backend database
- ❌ No email delivery
- ❌ No payment processing

---

## WHAT NEEDS TO HAPPEN WHEN SOMEONE SIGNS UP

### Step 1: User Submits Form
```
Form Data → API Endpoint → Database
```

**Data to capture:**
- Full name
- Email (required)
- Phone (optional, for SMS)
- State
- GPA
- Year/Grade
- Major
- Citizenship
- Background categories (checkboxes)
- Timestamp
- Source (how they found us)

### Step 2: Save to Database
```
Users Table:
- id (UUID)
- email (unique)
- name
- phone (encrypted)
- state
- gpa
- year
- major
- citizenship
- background_categories (JSON)
- tier (free/premium/complete)
- created_at
- updated_at
- email_consent (boolean)
- sms_consent (boolean)
- stripe_customer_id (if paid)
```

### Step 3: Generate Matches
```
Algorithm runs:
1. Query scholarships matching criteria
2. Score by: GPA fit, major fit, background match, deadline
3. Store top matches in Matches table
4. Return results to user
```

### Step 4: Send Welcome Email
```
Trigger: New signup
Send: Welcome email with initial matches
Email service: Loops / Mailchimp / SendGrid
```

### Step 5: Ongoing - Daily/Weekly Digests
```
Cron job runs daily:
1. Find new scholarships
2. Match against all users
3. Queue email/SMS notifications
4. Send digest (frequency based on tier)
```

---

## INFRASTRUCTURE NEEDED

### 1. Database (PostgreSQL)
- Users table
- Scholarships table
- Matches table
- Consent logs

### 2. Authentication
- Email magic links
- Password reset
- Session management

### 3. Email Service
- Transactional emails (welcome, notifications)
- Bulk emails (digests)
- Provider: Loops, Mailchimp, or SendGrid

### 4. SMS Service
- Deadline reminders
- Provider: Twilio (need A2P 10DLC registration)
- Must have explicit opt-in

### 5. Payment Processing
- Stripe for subscriptions
- Handle free → paid upgrades
- Handle cancellations

### 6. Analytics
- Signup conversion
- Match engagement
- Paid conversion
- Retention

---

## USER TIERS & BENEFITS

| Feature | Free | Premium ($9.99/mo) | Complete ($49.99) |
|---------|------|-------------------|-------------------|
| Matches/month | 5 | Unlimited | Unlimited |
| Email frequency | Weekly | Daily | Daily |
| SMS reminders | ❌ | ✅ | ✅ |
| Application tracker | ❌ | ✅ | ✅ |
| Essay tips | Basic | Full | Full |
| 1-on-1 review | ❌ | ❌ | ✅ |
| Essay editing | ❌ | ❌ | ✅ |

---

## TECHNICAL STACK RECOMMENDED

| Component | Service |
|-----------|---------|
| Hosting | Netlify (current) |
| Backend | Netlify Functions / Railway |
| Database | Neon (PostgreSQL) |
| Auth | Netlify Identity / Supabase |
| Email | Loops ($0-50/mo) |
| SMS | Twilio ($10-50/mo) |
| Payments | Stripe |
| Analytics | PostHog (free) |

---

## IMPLEMENTATION PRIORITY

### Week 1: Foundation
- [ ] Set up PostgreSQL database (Neon)
- [ ] Create user signup API endpoint
- [ ] Save form submissions to database
- [ ] Connect email service (Loops)

### Week 2: Matching
- [ ] Expand scholarship database (100+)
- [ ] Build matching algorithm
- [ ] Store matches in database

### Week 3: Notifications
- [ ] Set up email sending (welcome, digests)
- [ ] Set up SMS service (Twilio)
- [ ] Build reminder system

### Week 4: Payments
- [ ] Set up Stripe
- [ ] Create checkout flow
- [ ] Implement tier access control
- [ ] Handle webhooks (payment success/fail)

---

## APPROXIMATE MONTHLY COST

| Service | Free Tier | Paid |
|---------|-----------|------|
| Netlify | $0 | $0-25 |
| Neon (DB) | $0 | $0-20 |
| Loops (email) | $0 | $0-50 |
| Twilio (SMS) | $0 | $20-50 |
| Stripe | 2.9% + 30¢ | fees |
| **Total** | **$0** | **~$70-145/mo** |

---

## NOTES

- Start with free tiers, scale as user base grows
- SMS requires A2P 10DLC registration (can take weeks)
- Keep audit trail for consent (legal requirement)
