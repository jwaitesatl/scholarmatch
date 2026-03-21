"""
Email Automation for ScholarMatch
Handles sending daily scholarship matches to students
"""

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import List, Dict
import os

# Email configuration (would use environment variables in production)
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'hello@scholarmatch.co')
FROM_NAME = 'ScholarMatch'


class EmailAutomation:
    """Handles email campaigns"""
    
    def __init__(self):
        self.sent_count = 0
    
    def create_welcome_email(self, student: Dict, matches: List[Dict]) -> MIMEMultipart:
        """Create welcome email with initial matches"""
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Welcome to ScholarMatch, {student['name'].split()[0]}! 🎓"
        msg['From'] = f"{FROM_NAME} <{FROM_EMAIL}>"
        msg['To'] = student['email']
        
        # Plain text version
        text_content = f"""
Hi {student['name'].split()[0]},

Welcome to ScholarMatch! We're excited to help you find scholarships.

We've found {len(matches)} scholarships that match your profile:

{self._format_matches_text(matches)}

Good luck!
The ScholarMatch Team
        """
        
        # HTML version
        html_content = self._create_matches_html(student, matches)
        
        msg.attach(MIMEText(text_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        return msg
    
    def create_daily_digest(self, student: Dict, new_matches: List[Dict]) -> MIMEMultipart:
        """Create daily digest email with new matches"""
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🎯 {len(new_matches)} New Scholarships Just Posted!"
        msg['From'] = f"{FROM_NAME} <{FROM_EMAIL}>"
        msg['To'] = student['email']
        
        # Plain text
        text_content = f"""
Hi {student['name'].split()[0]},

{len(new_matches)} new scholarships just posted that match your profile:

{self._format_matches_text(new_matches)}

Don't miss out - apply today!

The ScholarMatch Team
        """
        
        # HTML
        html_content = self._create_matches_html(student, new_matches, is_digest=True)
        
        msg.attach(MIMEText(text_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        return msg
    
    def create_deadline_reminder(self, student: Dict, scholarships: List[Dict]) -> MIMEMultipart:
        """Create deadline reminder email"""
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"⏰ {len(scholarships)} Scholarship Deadline{'s' if len(scholarships) > 1 else ''} Coming Up!"
        msg['From'] = f"{FROM_NAME} <{FROM_EMAIL}>"
        msg['To'] = student['email']
        
        # HTML
        html = self._create_reminder_html(student, scholarships)
        
        msg.attach(MIMEText(html, 'html'))
        
        return msg
    
    def _format_matches_text(self, matches: List[Dict]) -> str:
        """Format matches for plain text email"""
        lines = []
        for m in matches[:5]:
            lines.append(f"\n• {m['name']}")
            lines.append(f"  Amount: ${m['amount']:,}")
            lines.append(f"  Deadline: {m['deadline']}")
            if m.get('description'):
                lines.append(f"  {m['description'][:100]}...")
        return "\n".join(lines)
    
    def _create_matches_html(self, student: Dict, matches: List[Dict], is_digest: bool = False) -> str:
        """Create HTML for matches email"""
        matches_html = ""
        for m in matches[:10]:
            matches_html += f"""
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                <h3 style="margin: 0 0 8px 0; color: #1e293b;">{m['name']}</h3>
                <p style="margin: 0 0 8px 0; color: #6366f1; font-weight: 600; font-size: 18px;">${m['amount']:,}</p>
                <p style="margin: 0 0 8px 0; color: #64748b;">📅 Deadline: {m['deadline']}</p>
                <p style="margin: 0; color: #475569; font-size: 14px;">{m.get('description', '')[:150]}</p>
                {"<p style='margin: 8px 0 0 0; color: #059669; font-size: 14px;'>✓ You match all requirements!</p>" if m.get('match_score', 0) > 50 else ""}
            </div>
            """
        
        greeting = "Here are your daily matches!" if is_digest else "We found scholarships just for you!"
        
        return f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 28px;">🎓 ScholarMatch</h1>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b;">
                Hi {student['name'].split()[0]}! 👋
            </p>
            <p style="margin: 0 0 24px 0; font-size: 16px; color: #475569;">
                {greeting}
            </p>
            
            {matches_html}
            
            <div style="text-align: center; margin-top: 24px;">
                <a href="#" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    View All Matches →
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0;">© 2026 ScholarMatch. All rights reserved.</p>
            <p style="margin: 8px 0 0 0;">
                <a href="#" style="color: #6366f1;">Unsubscribe</a> | 
                <a href="#" style="color: #6366f1;">Privacy Policy</a>
            </p>
        </div>
    </div>
</body>
</html>
        """
    
    def _create_reminder_html(self, student: Dict, scholarships: List[Dict]) -> str:
        """Create HTML for deadline reminder"""
        deadline_html = ""
        for s in scholarships:
            deadline_html += f"""
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin-bottom: 8px;">
                <strong>{s['name']}</strong><br>
                <span>Deadline: {s['deadline']}</span> |
                <span>${s['amount']:,}</span>
            </div>
            """
        
        return f"""
<!DOCTYPE html>
<html>
<body>
    <h2>⏰ Deadline Reminder</h2>
    <p>Hi {student['name'].split()[0]},</p>
    <p>These scholarships have deadlines coming up soon:</p>
    {deadline_html}
    <p>Don't miss out!</p>
</body>
</html>
        """
    
    def send_email(self, msg: MIMEMultipart) -> bool:
        """Send email via SMTP"""
        try:
            if not SMTP_USER or not SMTP_PASSWORD:
                print(f"📧 Would send email to {msg['To']}: {msg['Subject']}")
                self.sent_count += 1
                return True
            
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
            
            self.sent_count += 1
            print(f"✅ Sent email to {msg['To']}")
            return True
        except Exception as e:
            print(f"❌ Failed to send email: {e}")
            return False
    
    def send_batch(self, students: List[Dict], scholarships: Dict) -> Dict:
        """Send batch of emails"""
        results = {'sent': 0, 'failed': 0}
        
        for student in students:
            # Get matches for this student
            # In production, this would use the matching algorithm
            matches = []  # Would call match_scholarships(student)
            
            if not matches:
                continue
            
            msg = self.create_daily_digest(student, matches)
            if self.send_email(msg):
                results['sent'] += 1
            else:
                results['failed'] += 1
        
        return results


def load_students(filepath: str = 'students.json') -> List[Dict]:
    """Load students from file"""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def main():
    """Test email sending"""
    automation = EmailAutomation()
    
    # Test student
    student = {
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'gpa': 3.8,
        'year_in_school': 'junior',
        'major': 'Computer Science'
    }
    
    # Test matches
    matches = [
        {
            'name': 'STEM Excellence Scholarship',
            'amount': 10000,
            'deadline': '2026-05-01',
            'description': 'For students pursuing STEM degrees.',
            'match_score': 75
        },
        {
            'name': 'Google Lime Scholarship',
            'amount': 10000,
            'deadline': '2026-12-01',
            'description': 'For students with disabilities in CS.',
            'match_score': 85
        }
    ]
    
    # Create and send test email
    msg = automation.create_welcome_email(student, matches)
    automation.send_email(msg)
    
    print(f"\n📧 Total emails sent: {automation.sent_count}")


if __name__ == '__main__':
    main()
