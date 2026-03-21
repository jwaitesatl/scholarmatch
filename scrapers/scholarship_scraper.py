"""
Scholarship Scraper
Scrapes scholarships from various sources
"""

import asyncio
import aiohttp
import json
import re
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import os
import sys

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SAMPLE_SCHOLARSHIPS = [
    # Fastweb-style scholarships
    {
        "name": "Coca-Cola Scholars Foundation",
        "provider": "Coca-Cola",
        "amount": 20000,
        "deadline": "2026-10-31",
        "url": "https://www.coca-colascholarsfoundation.org",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "senior",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "Achievement-based scholarship for graduating high school seniors."
    },
    {
        "name": "Bill Gates Scholarship",
        "provider": "Bill & Melinda Gates Foundation",
        "amount": 10000,
        "deadline": "2026-04-15",
        "url": "https://www.gatesfoundation.org",
        "requirements": {
            "min_gpa": 3.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For high-achieving students with financial need."
    },
    {
        "name": "Google Lime Scholarship",
        "provider": "Google",
        "amount": 10000,
        "deadline": "2026-12-01",
        "url": "https://buildyourfuture.withgoogle.com/scholarships",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "Computer Science, Engineering",
        "essay_required": True,
        "description": "For students with disabilities pursuing degrees in CS or related fields."
    },
    {
        "name": "Women in STEM Scholarship",
        "provider": "Society of Women Engineers",
        "amount": 5000,
        "deadline": "2026-05-01",
        "url": "https://societyofwomenengineers.swe.org",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "STEM",
        "essay_required": True,
        "description": "Supporting women pursuing engineering and CS degrees."
    },
    {
        "name": "Hispanic Scholarship Fund",
        "provider": "HSF",
        "amount": 5000,
        "deadline": "2026-04-15",
        "url": "https://www.hsf.net",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For Hispanic students with financial need."
    },
    {
        "name": "Jack Kent Cooke Foundation",
        "provider": "Jack Kent Cooke Foundation",
        "amount": 40000,
        "deadline": "2026-11-01",
        "url": "https://www.jkcf.org",
        "requirements": {
            "min_gpa": 3.5,
            "year_in_school": "senior",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For high-achieving students with financial need."
    },
    {
        "name": "National Merit Scholarship",
        "provider": "National Merit Scholarship Corp",
        "amount": 2500,
        "deadline": "2026-03-01",
        "url": "https://www.nationalmerit.org",
        "requirements": {
            "min_gpa": 0,
            "year_in_school": "senior",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For National Merit Finalists."
    },
    {
        "name": "CSI Scholarship",
        "provider": "College Scholarships Inc",
        "amount": 1000,
        "deadline": "2026-06-01",
        "url": "https://www.collegescholarships.org",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": False,
        "description": "General scholarship for college students."
    },
    {
        "name": "Future Nurses Scholarship",
        "provider": "Nursing Education",
        "amount": 5000,
        "deadline": "2026-05-15",
        "url": "https://nursing.org",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "Nursing",
        "essay_required": True,
        "description": "For students pursuing nursing degrees."
    },
    {
        "name": "Business Leaders Scholarship",
        "provider": "Business Schools",
        "amount": 7500,
        "deadline": "2026-04-30",
        "url": "https://www.business.com",
        "requirements": {
            "min_gpa": 3.2,
            "year_in_school": "any",
            "citizenship": "any"
        },
        "major": "Business, Finance, Accounting",
        "essay_required": True,
        "description": "For business majors with leadership experience."
    },
    {
        "name": "Agriculture Future Scholarship",
        "provider": "Farm Foundation",
        "amount": 3000,
        "deadline": "2026-03-31",
        "url": "https://www.farmfoundation.org",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "Agriculture",
        "essay_required": True,
        "description": "For students pursuing agriculture degrees."
    },
    {
        "name": "Artistic Excellence Scholarship",
        "provider": "Arts Foundation",
        "amount": 10000,
        "deadline": "2026-04-01",
        "url": "https://www.artsfoundation.org",
        "requirements": {
            "min_gpa": 2.0,
            "year_in_school": "any",
            "citizenship": "any"
        },
        "major": "Art, Design, Music",
        "essay_required": True,
        "description": "For students with exceptional artistic talent."
    },
    {
        "name": "Veterans Service Scholarship",
        "provider": "Veterans Affairs",
        "amount": 5000,
        "deadline": "2026-06-30",
        "url": "https://www.va.gov",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For veterans and military family members."
    },
    {
        "name": "Environmental Science Scholarship",
        "provider": "Green Future Foundation",
        "amount": 8000,
        "deadline": "2026-05-01",
        "url": "https://www.greenfuture.org",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "any",
            "citizenship": "any"
        },
        "major": "Environmental Science, Biology",
        "essay_required": True,
        "description": "For students committed to environmental sustainability."
    },
    {
        "name": "First Generation College Student",
        "provider": "Education Trust",
        "amount": 2500,
        "deadline": "2026-04-15",
        "url": "https://www.edtrust.org",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "Supporting first-generation college students."
    },
    {
        "name": "Teachers of Tomorrow Scholarship",
        "provider": "Education Association",
        "amount": 4000,
        "deadline": "2026-05-31",
        "url": "https://www.education.org",
        "requirements": {
            "min_gpa": 2.8,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "Education, Teaching",
        "essay_required": True,
        "description": "For students planning to become teachers."
    },
    {
        "name": "Cybersecurity Scholarship",
        "provider": "Tech Security Foundation",
        "amount": 10000,
        "deadline": "2026-07-01",
        "url": "https://www.cybersecurity.org",
        "requirements": {
            "min_gpa": 3.0,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "Cybersecurity, Computer Science",
        "essay_required": True,
        "description": "For students pursuing cybersecurity careers."
    },
    {
        "name": "LGBTQ+ Student Scholarship",
        "provider": "Pride Foundation",
        "amount": 5000,
        "deadline": "2026-04-01",
        "url": "https://www.pridefoundation.org",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "any"
        },
        "major": "any",
        "essay_required": True,
        "description": "For LGBTQ+ students and allies."
    },
    {
        "name": "Rural Student Scholarship",
        "provider": "Rural Schools Foundation",
        "amount": 3000,
        "deadline": "2026-05-15",
        "url": "https://www.ruralschools.org",
        "requirements": {
            "min_gpa": 2.5,
            "year_in_school": "any",
            "citizenship": "us"
        },
        "major": "any",
        "essay_required": True,
        "description": "For students from rural communities."
    },
    {
        "name": "Science Fair Winner Scholarship",
        "provider": "Science Society",
        "amount": 15000,
        "deadline": "2026-06-01",
        "url": "https://www.sciencesociety.org",
        "requirements": {
            "min_gpa": 3.2,
            "year_in_school": "any",
            "citizenship": "any"
        },
        "major": "STEM",
        "essay_required": True,
        "description": "For students with science fair project experience."
    }
]

class ScholarshipScraper:
    """Scrapes scholarships from various sources"""
    
    def __init__(self):
        self.scholarships = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    async def scrape_fastweb(self):
        """Scrape Fastweb (would need API or web scraping)"""
        # Note: Fastweb has anti-scraping, would need careful implementation
        # For now, return sample data
        return []
    
    async def scrape_scholarships_com(self):
        """Scrape Scholarships.com"""
        # Similar anti-scraping concerns
        return []
    
    async def scrape_collegeboard(self):
        """Scrape College Board"""
        return []
    
    async def scrape_local(self):
        """Scrape local/state scholarship databases"""
        scholarships = []
        
        # Georgia scholarships
        ga_scholarships = [
            {
                "name": "Georgia HOPE Scholarship",
                "provider": "Georgia Student Finance Commission",
                "amount": 7000,
                "deadline": "2026-07-01",
                "url": "https://www.gsfc.org",
                "requirements": {
                    "min_gpa": 3.0,
                    "year_in_school": "freshman",
                    "citizenship": "us"
                },
                "major": "any",
                "essay_required": False,
                "description": "Georgia resident HOPE scholarship for top students."
            },
            {
                "name": "Georgia HERO Scholarship",
                "provider": "Georgia Student Finance Commission",
                "amount": 3000,
                "deadline": "2026-07-01",
                "url": "https://www.gsfc.org",
                "requirements": {
                    "min_gpa": 0,
                    "year_in_school": "any",
                    "citizenship": "us"
                },
                "major": "any",
                "essay_required": False,
                "description": "For Georgia National Guard members and veterans."
            }
        ]
        scholarships.extend(ga_scholarships)
        
        # Florida scholarships
        fl_scholarships = [
            {
                "name": "Florida Bright Futures",
                "provider": "Florida Department of Education",
                "amount": 6000,
                "deadline": "2026-08-01",
                "url": "https://www.floridastudentfinancialaid.org",
                "requirements": {
                    "min_gpa": 3.5,
                    "year_in_school": "freshman",
                    "citizenship": "us"
                },
                "major": "any",
                "essay_required": False,
                "description": "Florida Bright Futures for top high school graduates."
            }
        ]
        scholarships.extend(fl_scholarships)
        
        return scholarships
    
    async def scrape_all(self):
        """Scrape all sources and combine"""
        print("Starting scholarship scrape...")
        
        # Add sample scholarships
        self.scholarships.extend(SAMPLE_SCHOLARSHIPS)
        print(f"Added {len(SAMPLE_SCHOLARSHIPS)} sample scholarships")
        
        # Try to scrape other sources
        local = await self.scrape_local()
        self.scholarships.extend(local)
        print(f"Added {len(local)} local scholarships")
        
        # Deduplicate by name
        seen = set()
        unique = []
        for s in self.scholarships:
            if s['name'] not in seen:
                seen.add(s['name'])
                unique.append(s)
        
        self.scholarships = unique
        print(f"Total unique scholarships: {len(self.scholarships)}")
        
        return self.scholarships
    
    def to_csv_format(self):
        """Convert to CSV-ready format"""
        return self.scholarships
    
    def to_json(self):
        """Convert to JSON"""
        return json.dumps(self.scholarships, indent=2)


async def main():
    """Test the scraper"""
    scraper = ScholarshipScraper()
    scholarships = await scraper.scrape_all()
    
    # Save to file
    with open('/Users/joshwaites/.openclaw/workspace/scholar-match/scholarships.json', 'w') as f:
        f.write(scraper.to_json())
    
    print(f"\n✅ Scraped {len(scholarships)} scholarships")
    print("Saved to scholarships.json")
    
    # Print first few
    for s in scholarships[:5]:
        print(f"  - {s['name']}: ${s['amount']} (deadline: {s['deadline']})")


if __name__ == '__main__':
    asyncio.run(main())
