"""
ScholarMatch - Automated Scholarship Matching Service
"""

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import os
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'scholar-match-secret-key-change-in-production')

# Database simulation (replace with PostgreSQL in production)
students_db = []
scholarships_db = []

@app.route('/')
def index():
    """Landing page"""
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    """Handle student signup"""
    # Get form data
    student = {
        'id': len(students_db) + 1,
        'name': request.form.get('name', ''),
        'email': request.form.get('email', ''),
        'phone': request.form.get('phone', ''),
        'gpa': float(request.form.get('gpa', 0)),
        'year_in_school': request.form.get('year_in_school', ''),
        'major': request.form.get('major', ''),
        'citizenship': request.form.get('citizenship', 'us'),
        'zip_code': request.form.get('zip_code', ''),
        'sat_score': int(request.form.get('sat_score', 0)) if request.form.get('sat_score') else None,
        'act_score': int(request.form.get('act_score', 0)) if request.form.get('act_score') else None,
        'ethnicity': request.form.get('ethnicity', ''),
        'religion': request.form.get('religion', ''),
        'disability': request.form.get('disability') == 'on',
        'veteran': request.form.get('veteran') == 'on',
        'first_generation': request.form.get('first_generation') == 'on',
        'income_bracket': request.form.get('income_bracket', ''),
        'created_at': datetime.utcnow().isoformat(),
        'tier': 'free'
    }
    
    # Validate
    if not student['email']:
        flash('Email is required', 'error')
        return redirect(url_for('index'))
    
    # Check if already exists
    existing = [s for s in students_db if s['email'] == student['email']]
    if existing:
        flash('You\'re already signed up! We\'ll keep sending you matches.', 'info')
        return redirect(url_for('index'))
    
    students_db.append(student)
    
    # Find matching scholarships
    matches = match_scholarships(student)
    
    flash(f'Welcome {student["name"]}! We found {len(matches)} scholarships just for you!', 'success')
    
    # TODO: Send welcome email with matches
    
    return redirect(url_for('index'))

@app.route('/api/scholarships')
def get_scholarships():
    """API to get scholarships (for testing)"""
    return jsonify({
        'count': len(scholarships_db),
        'scholarships': scholarships_db[:20]
    })

@app.route('/api/students')
def get_students():
    """API to get students (for testing)"""
    return jsonify({
        'count': len(students_db),
        'students': students_db
    })

@app.route('/api/match/<email>')
def match_api(email):
    """API to get matches for an email"""
    student = [s for s in students_db if s['email'] == email]
    if not student:
        return jsonify({'error': 'Student not found'}), 404
    
    matches = match_scholarships(student[0])
    return jsonify({
        'student': student[0]['email'],
        'matches': matches,
        'count': len(matches)
    })

def match_scholarships(student):
    """Match student to scholarships based on criteria"""
    matches = []
    
    for scholarship in scholarships_db:
        # Skip if expired
        if scholarship.get('deadline') and scholarship['deadline'] < datetime.utcnow().isoformat():
            continue
        
        # Check hard requirements
        if scholarship.get('min_gpa') and student['gpa'] < scholarship['min_gpa']:
            continue
        
        if scholarship.get('citizenship') and scholarship['citizenship'] != 'any':
            if student['citizenship'] != scholarship['citizenship']:
                continue
        
        if scholarship.get('year_in_school') and scholarship['year_in_school'] != 'any':
            if student['year_in_school'] != scholarship['year_in_school']:
                continue
        
        # Calculate score
        score = 0
        
        # Major relevance
        if student['major'].lower() in scholarship.get('major', '').lower():
            score += 30
        elif not scholarship.get('major') or scholarship['major'] == 'any':
            score += 10
        
        # Deadline proximity
        if scholarship.get('deadline'):
            score += 20
        
        # Award amount (higher = better)
        amount = scholarship.get('amount', 0)
        if amount >= 10000:
            score += 20
        elif amount >= 5000:
            score += 15
        elif amount >= 1000:
            score += 10
        else:
            score += 5
        
        # Competition (assume medium if not specified)
        score += 10
        
        # Essay requirement (those with essays often have less competition)
        if scholarship.get('essay_required'):
            score += 5
        
        if score >= 30:  # Threshold
            scholarship['match_score'] = score
            matches.append(scholarship)
    
    # Sort by score
    matches.sort(key=lambda x: x.get('match_score', 0), reverse=True)
    
    return matches[:10]  # Top 10

def load_sample_scholarships():
    """Load sample scholarships for testing"""
    global scholarships_db
    
    scholarships_db = [
        {
            'id': 1,
            'name': 'STEM Excellence Scholarship',
            'provider': 'Science Foundation',
            'amount': 10000,
            'deadline': '2026-05-01',
            'min_gpa': 3.5,
            'major': 'STEM',
            'year_in_school': 'any',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'For students pursuing degrees in science, technology, engineering, or math.'
        },
        {
            'id': 2,
            'name': 'Future Leaders Award',
            'provider': 'Business Association',
            'amount': 5000,
            'deadline': '2026-04-15',
            'min_gpa': 3.0,
            'major': 'Business',
            'year_in_school': 'junior',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'For business majors demonstrating leadership potential.'
        },
        {
            'id': 3,
            'name': 'Healthcare Heroes Scholarship',
            'provider': 'Medical Foundation',
            'amount': 7500,
            'deadline': '2026-06-01',
            'min_gpa': 3.2,
            'major': 'Nursing, Healthcare, Medicine',
            'year_in_school': 'any',
            'citizenship': 'any',
            'essay_required': True,
            'description': 'For students pursuing healthcare careers.'
        },
        {
            'id': 4,
            'name': 'First Generation Student Grant',
            'provider': 'Education Foundation',
            'amount': 3000,
            'deadline': '2026-04-30',
            'min_gpa': 2.5,
            'major': 'any',
            'year_in_school': 'freshman',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'Supporting first-generation college students.'
        },
        {
            'id': 5,
            'name': 'Tech Innovation Award',
            'provider': 'Software Companies',
            'amount': 15000,
            'deadline': '2026-03-31',
            'min_gpa': 3.0,
            'major': 'Computer Science, Engineering',
            'year_in_school': 'any',
            'citizenship': 'any',
            'essay_required': True,
            'description': 'For students with innovative tech ideas.'
        },
        {
            'id': 6,
            'name': 'Arts & Humanities Scholarship',
            'provider': 'Cultural Foundation',
            'amount': 4000,
            'deadline': '2026-05-15',
            'min_gpa': 2.8,
            'major': 'Art, English, History, Music',
            'year_in_school': 'any',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'For students pursuing arts and humanities degrees.'
        },
        {
            'id': 7,
            'name': 'Veterans Scholarship',
            'provider': 'Veterans Foundation',
            'amount': 5000,
            'deadline': '2026-04-01',
            'min_gpa': 2.5,
            'major': 'any',
            'year_in_school': 'any',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'For veterans pursuing higher education.'
        },
        {
            'id': 8,
            'name': 'Community Service Award',
            'provider': 'Service Foundation',
            'amount': 2500,
            'deadline': '2026-05-01',
            'min_gpa': 2.5,
            'major': 'any',
            'year_in_school': 'any',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'For students with significant community service.'
        },
        {
            'id': 9,
            'name': 'Women in STEM Grant',
            'provider': 'Tech Women Foundation',
            'amount': 8000,
            'deadline': '2026-04-20',
            'min_gpa': 3.0,
            'major': 'STEM',
            'year_in_school': 'any',
            'citizenship': 'us',
            'essay_required': True,
            'description': 'Supporting women pursuing STEM careers.'
        },
        {
            'id': 10,
            'name': 'Local Student Scholarship',
            'provider': 'Community Bank',
            'amount': 1000,
            'deadline': '2026-04-15',
            'min_gpa': 2.0,
            'major': 'any',
            'year_in_school': 'freshman',
            'citizenship': 'us',
            'essay_required': False,
            'description': 'For local high school seniors attending college.'
        }
    ]

# Load sample data on startup
load_sample_scholarships()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
