# ScholarMatch 🎓

Automated scholarship matching service.

## Quick Start

### 1. Buy Domain
Recommended: `scholarmatch.co` or `scholarmatch.io`

### 2. Install Dependencies
```bash
cd scholar-match
pip3 install -r requirements.txt
```

Or with uv:
```bash
uv pip install -r requirements.txt
```

### 3. Set Environment Variables
```bash
export SMTP_USER=your-email@gmail.com
export SMTP_PASSWORD=your-app-password
export FROM_EMAIL=hello@scholarmatch.co
```

### 4. Run
```bash
python3 app.py
```

Visit http://localhost:5000

## Project Structure

```
scholar-match/
├── app.py                    # Main Flask app
├── templates/
│   └── index.html           # Landing page + signup form
├── scrapers/
│   └── scholarship_scraper.py # Scholarship scraper
├── emails/
│   └── email_automation.py   # Email campaigns
├── scholarships.json         # Scholarship database
└── requirements.txt         # Python dependencies
```

## Features Built

✅ Landing page with student signup form  
✅ Profile collection (GPA, major, year, etc.)  
✅ Basic matching algorithm  
✅ Email templates (welcome, daily digest, reminders)  
✅ Sample scholarship database  
✅ Responsive design  

## To Do

- [ ] Connect to real database (PostgreSQL)
- [ ] Set up email sending (SMTP)
- [ ] Build production scraper for Fastweb, Scholarships.com
- [ ] Add payment processing (Stripe)
- [ ] Deploy to Railway/Render

## Marketing

Start with free content:
- TikTok: "I found \$50K in scholarships"
- Instagram Reels
- Reddit r/scholarships, r/college
- YouTube how-to guides

## Cost

- Domain: ~$12/year
- Hosting: ~$25/month (Railway/Render)
- Email: ~$50/month (Loops/Mailchimp)
- Total: ~$90/month to start
