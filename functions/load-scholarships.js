// ScholarMatch - Load Scholarships to Database
// Run once to populate scholarship database

const { neon } = require('@neondatabase/serverless');

const scholarships = [
  // FEDERAL & GOVERNMENT
  {name: 'Federal Pell Grant', amount: 7395, deadline: '2026-08-31', eligibility: 'Undergraduate with financial need', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: null, category: 'federal', description: 'Federal grant for low-income students', requirements: 'FAFSA required', recurring: true, region: 'national', area: 'financial_need'},
  {name: 'Federal SEOG Grant', amount: 4000, deadline: '2026-08-31', eligibility: 'Undergraduate with exceptional financial need', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: null, category: 'federal', description: 'Supplemental grant for Pell recipients', requirements: 'Must receive Pell Grant', recurring: true, region: 'national', area: 'financial_need'},
  {name: 'TEACH Grant', amount: 4000, deadline: '2026-08-31', eligibility: 'Students pursuing teaching', major: 'education', citizenship: 'us_citizen', min_gpa: 3.25, state: null, category: 'federal', description: 'Up to $4000 for future teachers', requirements: 'Must teach in low-income school 4 years', recurring: true, region: 'national', area: 'education'},

  // NATIONAL FOUNDATION
  {name: 'Coca-Cola Scholars Foundation', amount: 20000, deadline: '2026-10-31', eligibility: 'High school seniors, academic achievement', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'foundation', description: 'Prestigious achievement-based scholarship', requirements: 'Community involvement, leadership', recurring: true, region: 'national', area: 'general'},
  {name: 'Gates Scholarship', amount: 25000, deadline: '2026-03-15', eligibility: 'High school seniors, low-income', major: 'any', citizenship: 'us_citizen', min_gpa: 3.5, state: null, category: 'foundation', description: 'Full cost of attendance for Pell recipients', requirements: 'Pell eligible, minority', recurring: true, region: 'national', area: 'low_income'},
  {name: 'Jack Kent Cooke Foundation', amount: 40000, deadline: '2026-11-01', eligibility: 'High school seniors, transfer students', major: 'any', citizenship: 'us_citizen', min_gpa: 3.5, state: null, category: 'foundation', description: 'Large award for high-achieving students', requirements: 'Financial need required', recurring: true, region: 'national', area: 'general'},
  {name: 'Dell Scholars Program', amount: 20000, deadline: '2026-12-01', eligibility: 'Pell-eligible high school seniors', major: 'any', citizenship: 'us_citizen', min_gpa: 2.4, state: null, category: 'foundation', description: 'Mikell foundation support', requirements: 'Must participate in MSID', recurring: true, region: 'national', area: 'low_income'},

  // CORPORATE
  {name: "McDonald's HACER Scholarship", amount: 50000, deadline: '2026-02-28', eligibility: 'Hispanic high school seniors', major: 'any', citizenship: 'us_citizen', min_gpa: 2.8, state: null, category: 'corporate', description: 'Largest Hispanic scholarship program', requirements: 'Hispanic heritage, financial need', recurring: true, region: 'national', area: 'hispanic'},
  {name: 'Walmart Foundation Scholarship', amount: 30000, deadline: '2026-03-31', eligibility: 'High school seniors, dependents of Walmart associates', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'corporate', description: 'For Walmart employees family members', requirements: 'Walmart associate relationship', recurring: true, region: 'national', area: 'employee_dependent'},
  {name: 'Boeing Scholarship', amount: 10000, deadline: '2026-04-15', eligibility: 'STEM students', major: 'stem', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'corporate', description: 'For future engineers', requirements: 'Pursuing STEM degree', recurring: true, region: 'national', area: 'stem'},
  {name: 'Google Lime Scholarship', amount: 10000, deadline: '2026-03-15', eligibility: 'Computer science students with disabilities', major: 'computer_science', citizenship: 'any', min_gpa: 3.0, state: null, category: 'corporate', description: 'Google diversity in tech', requirements: 'Disability required', recurring: true, region: 'national', area: 'disability'},
  {name: 'Microsoft Scholarship', amount: 15000, deadline: '2026-03-15', eligibility: 'STEM underrepresented minorities', major: 'stem', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'corporate', description: 'Diversity in computing', requirements: 'Underrepresented minority', recurring: true, region: 'national', area: 'stem'},
  {name: 'Amazon Future Engineer Scholarship', amount: 40000, deadline: '2026-02-15', eligibility: 'High school seniors pursuing CS/engineering', major: 'computer_science', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'corporate', description: 'Amazon tech pipeline', requirements: 'Intended CS/engineering major', recurring: true, region: 'national', area: 'stem'},
  {name: 'Starbucks College Achievement Plan', amount: 10000, deadline: '2026-08-31', eligibility: 'Starbucks partners pursuing degrees', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'corporate', description: 'Full tuition for Starbucks', requirements: 'Must work at Starbucks', recurring: true, region: 'national', area: 'employee'},
  {name: 'Coca-Cola First Generation Scholarship', amount: 5000, deadline: '2026-10-15', eligibility: 'First-generation college students', major: 'any', citizenship: 'us_citizen', min_gpa: 2.8, state: null, category: 'corporate', description: 'Supporting first-gen students', requirements: 'First in family to attend college', recurring: true, region: 'national', area: 'first_generation'},

  // MINORITY & DIVERSITY
  {name: 'UNCF Scholarship', amount: 5000, deadline: '2026-04-30', eligibility: 'African American students', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'minority', description: 'United Negro College Fund', requirements: 'Must attend HBCU or minority-serving', recurring: true, region: 'national', area: 'african_american'},
  {name: 'Hispanic Scholarship Fund', amount: 5000, deadline: '2026-03-15', eligibility: 'Hispanic college students', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'minority', description: 'HSF general scholarship', requirements: 'Hispanic heritage', recurring: true, region: 'national', area: 'hispanic'},
  {name: 'APIASF Scholarship', amount: 5000, deadline: '2026-01-15', eligibility: 'Asian American and Pacific Islander', major: 'any', citizenship: 'us_citizen', min_gpa: 2.7, state: null, category: 'minority', description: 'Asian & Pacific Islander support', requirements: 'API heritage', recurring: true, region: 'national', area: 'asian_pacific'},
  {name: 'AIEF Scholarship', amount: 5000, deadline: '2026-03-31', eligibility: 'American Indian students', major: 'any', citizenship: 'any', min_gpa: 2.5, state: null, category: 'minority', description: 'American Indian Education Foundation', requirements: 'Native American heritage', recurring: true, region: 'national', area: 'native_american'},
  {name: 'Women in STEM Scholarship', amount: 10000, deadline: '2026-03-15', eligibility: 'Women pursuing STEM', major: 'stem', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'minority', description: 'SWE scholarship', requirements: 'Female in STEM', recurring: true, region: 'national', area: 'women_stem'},
  {name: 'Girls Who Code Scholarship', amount: 5000, deadline: '2026-03-01', eligibility: 'Women in computer science', major: 'computer_science', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'minority', description: 'Tech gender diversity', requirements: 'CS or related field', recurring: true, region: 'national', area: 'women_stem'},
  {name: 'LGBTQ+ Scholarship', amount: 5000, deadline: '2026-03-31', eligibility: 'LGBTQ+ students', major: 'any', citizenship: 'any', min_gpa: 3.0, state: null, category: 'minority', description: 'Pride Foundation awards', requirements: 'LGBTQ+ identity', recurring: true, region: 'national', area: 'lgbtq'},

  // STATE
  {name: 'Georgia HOPE Scholarship', amount: 4000, deadline: '2026-07-01', eligibility: 'Georgia high school grads with 3.0 GPA', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: 'GA', category: 'state', description: 'Georgia HOPE program', requirements: 'Georgia resident, 3.0+ GPA', recurring: true, region: 'GA', area: 'state_resident'},
  {name: 'Georgia Zell Miller', amount: 5000, deadline: '2026-07-01', eligibility: 'Georgia top performers', major: 'any', citizenship: 'us_citizen', min_gpa: 3.7, state: 'GA', category: 'state', description: 'Full Zell Miller scholarship', requirements: 'Georgia resident, top grades', recurring: true, region: 'GA', area: 'state_resident'},
  {name: 'Florida Bright Futures', amount: 3000, deadline: '2026-07-01', eligibility: 'Florida high school grads', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: 'FL', category: 'state', description: 'Florida merit scholarship', requirements: 'Florida resident, merit', recurring: true, region: 'FL', area: 'state_resident'},
  {name: 'Cal Grant', amount: 14000, deadline: '2026-03-02', eligibility: 'California residents with need', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: 'CA', category: 'state', description: 'California state grant', requirements: 'California resident, need', recurring: true, region: 'CA', area: 'state_resident'},
  {name: 'NYS Excelsior Scholarship', amount: 5000, deadline: '2026-07-01', eligibility: 'NY residents attending SUNY/CUNY', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: 'NY', category: 'state', description: 'New York free tuition', requirements: 'NY resident, mid-income', recurring: true, region: 'NY', area: 'state_resident'},
  {name: 'Texas Tuition Promise', amount: 5000, deadline: '2026-02-15', eligibility: 'Texas high school seniors', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'TX', category: 'state', description: 'Texas prepaid tuition', requirements: 'Texas resident', recurring: true, region: 'TX', area: 'state_resident'},
  {name: 'Illinois MAP Grant', amount: 5000, deadline: '2026-10-01', eligibility: 'Illinois undergrads with need', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'IL', category: 'state', description: 'Illinois monetary award', requirements: 'IL resident, need', recurring: true, region: 'IL', area: 'state_resident'},
  {name: 'North Carolina Community College Grant', amount: 1000, deadline: '2026-09-01', eligibility: 'NC community college students', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'NC', category: 'state', description: 'NC tuition assistance', requirements: 'NC resident', recurring: true, region: 'NC', area: 'state_resident'},

  // SPECIAL CIRCUMSTANCES
  {name: 'Adult Learner Scholarship', amount: 5000, deadline: '2026-06-30', eligibility: 'Non-traditional students 25+', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'adult', description: 'Returning students', requirements: '25 years or older', recurring: true, region: 'national', area: 'adult_learner'},
  {name: 'Single Parent Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Single parents in college', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'special', description: 'Single parent support', requirements: 'Single parent status', recurring: true, region: 'national', area: 'single_parent'},
  {name: 'Foster Youth Scholarship', amount: 10000, deadline: '2026-03-15', eligibility: 'Foster care alumni', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'special', description: 'Foster care support', requirements: 'Foster care history', recurring: true, region: 'national', area: 'foster_care'},
  {name: 'Homeless Youth Scholarship', amount: 5000, deadline: '2026-04-01', eligibility: 'Homeless or at-risk students', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'special', description: 'Housing insecurity', requirements: 'Homeless or at-risk', recurring: true, region: 'national', area: 'homeless'},
  {name: 'Immigration Relief Scholarship', amount: 5000, deadline: '2026-05-01', eligibility: 'DACA, TPS, asylum students', major: 'any', citizenship: 'daca', min_gpa: 2.5, state: null, category: 'special', description: 'Undocumented student support', requirements: 'DACA or similar status', recurring: true, region: 'national', area: 'daca'},

  // DISABILITY
  {name: 'Blind/Visually Impaired Scholarship', amount: 5000, deadline: '2026-03-15', eligibility: 'Visual impairment', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'disability', description: 'Accessibility support', requirements: 'Vision impairment', recurring: true, region: 'national', area: 'disability'},
  {name: 'Deaf/Hard of Hearing Scholarship', amount: 5000, deadline: '2026-03-15', eligibility: 'Hearing impairment', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'disability', description: 'Accessibility support', requirements: 'Hearing loss', recurring: true, region: 'national', area: 'disability'},
  {name: 'Learning Disability Scholarship', amount: 5000, deadline: '2026-04-01', eligibility: 'Students with LD/ADHD', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'disability', description: 'Neurodiversity support', requirements: 'Documentation required', recurring: true, region: 'national', area: 'disability'},
  {name: 'Autism Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Autistic students', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'disability', description: 'ASD support', requirements: 'Autism diagnosis', recurring: true, region: 'national', area: 'disability'},

  // MILITARY & FAMILY
  {name: 'Veterans Scholarship', amount: 10000, deadline: '2026-03-31', eligibility: 'Student veterans', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'military', description: 'Veteran education', requirements: 'Military service', recurring: true, region: 'national', area: 'veteran'},
  {name: 'Veteran Dependent Scholarship', amount: 5000, deadline: '2026-03-31', eligibility: 'Military dependent', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'military', description: 'VA dependent benefit', requirements: 'Active duty family', recurring: true, region: 'national', area: 'military_family'},
  {name: 'National Guard Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'National Guard members', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'military', description: 'Guard service award', requirements: 'NG enrollment', recurring: true, region: 'national', area: 'military'},
  {name: 'Law Enforcement Dependent Scholarship', amount: 5000, deadline: '2026-04-01', eligibility: 'Police/fire/EMS children', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'public_service', description: 'First responder family', requirements: 'Parent in law enforcement', recurring: true, region: 'national', area: 'law_enforcement'},
  {name: 'Firefighter Dependent Scholarship', amount: 5000, deadline: '2026-04-01', eligibility: 'Firefighter/EMS children', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'public_service', description: 'First responder family', requirements: 'Parent firefighter/EMS', recurring: true, region: 'national', area: 'firefighter'},
  {name: 'Teacher Dependent Scholarship', amount: 5000, deadline: '2026-03-31', eligibility: 'Teacher children', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'education', description: 'Educator family', requirements: 'Parent teacher', recurring: true, region: 'national', area: 'education'},

  // HEALTHCARE
  {name: 'Nurse Corps Scholarship', amount: 25000, deadline: '2026-02-28', eligibility: 'Nursing students', major: 'nursing', citizenship: 'us_citizen', min_gpa: 0, state: null, category: 'healthcare', description: 'Full tuition for nursing', requirements: 'Work in underserved area after', recurring: true, region: 'national', area: 'nursing'},
  {name: 'Nursing Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Nursing students', major: 'nursing', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'healthcare', description: 'Future nurses', requirements: 'Nursing program enrollment', recurring: true, region: 'national', area: 'nursing'},
  {name: 'Pre-Med Scholarship', amount: 10000, deadline: '2026-03-31', eligibility: 'Pre-med students', major: 'biology', citizenship: 'us_citizen', min_gpa: 3.2, state: null, category: 'healthcare', description: 'Future doctors', requirements: 'Pre-med track', recurring: true, region: 'national', area: 'healthcare'},
  {name: 'Medical Field Scholarship', amount: 5000, deadline: '2026-04-30', eligibility: 'Healthcare students', major: 'healthcare', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'healthcare', description: 'Healthcare leaders', requirements: 'Healthcare major', recurring: true, region: 'national', area: 'healthcare'},

  // ARTS & HUMANITIES
  {name: 'Scholastic Art & Writing', amount: 10000, deadline: '2026-01-15', eligibility: 'Creative high school students', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: null, category: 'arts', description: 'Portfolio-based awards', requirements: 'Art or writing portfolio', recurring: true, region: 'national', area: 'arts'},
  {name: 'Young Musicians Scholarship', amount: 5000, deadline: '2026-03-15', eligibility: 'Music majors', major: 'music', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'arts', description: 'Classical music training', requirements: 'Audition required', recurring: true, region: 'national', area: 'music'},
  {name: 'Film Festival Scholarship', amount: 10000, deadline: '2026-06-30', eligibility: 'Film students', major: 'film', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'arts', description: 'Future filmmakers', requirements: 'Film sample required', recurring: false, region: 'national', area: 'arts'},
  {name: 'Journalism Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Journalism students', major: 'journalism', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'communications', description: 'Media professionals', requirements: 'Journalism major', recurring: true, region: 'national', area: 'communications'},

  // VOCATIONAL & TRADE
  {name: 'HVAC Scholarship', amount: 5000, deadline: '2026-03-31', eligibility: 'Trade school HVAC students', major: 'hvac', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'trade', description: 'Skilled trades support', requirements: 'HVAC program', recurring: true, region: 'national', area: 'trade'},
  {name: 'Electrician Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Electrical trade students', major: 'electrical', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'trade', description: 'Skilled trades', requirements: 'Electrical program', recurring: true, region: 'national', area: 'trade'},
  {name: 'Automotive Scholarship', amount: 5000, deadline: '2026-03-15', eligibility: 'Auto tech students', major: 'automotive', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'trade', description: 'Future mechanics', requirements: 'Automotive program', recurring: true, region: 'national', area: 'trade'},
  {name: 'Culinary Arts Scholarship', amount: 5000, deadline: '2026-04-30', eligibility: 'Culinary students', major: 'culinary', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'trade', description: 'Future chefs', requirements: 'Culinary program', recurring: true, region: 'national', area: 'trade'},

  // COMMUNITY SERVICE
  {name: 'Peace Scholarship', amount: 5000, deadline: '2026-04-01', eligibility: 'Community service focus', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'community', description: 'Volunteer recognition', requirements: '500+ service hours', recurring: true, region: 'national', area: 'community_service'},
  {name: 'DoSomething.org Scholarship', amount: 5000, deadline: '2026-06-30', eligibility: 'Young activists', major: 'any', citizenship: 'us_citizen', min_gpa: 2.0, state: null, category: 'community', description: 'Campaign creators', requirements: 'Social action project', recurring: true, region: 'national', area: 'community_service'},
  {name: 'Volunteer Service Scholarship', amount: 5000, deadline: '2026-03-15', eligibility: 'Substantial volunteers', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'community', description: 'Youth volunteer award', requirements: 'Proven volunteering', recurring: true, region: 'national', area: 'community_service'},

  // AGRICULTURE & ENVIRONMENT
  {name: 'Agriculture Future of America', amount: 5000, deadline: '2026-03-15', eligibility: 'Agriculture students', major: 'agriculture', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'agriculture', description: 'AFA scholarship', requirements: 'Agriculture major', recurring: true, region: 'national', area: 'agriculture'},
  {name: 'National FFA Scholarship', amount: 5000, deadline: '2026-02-01', eligibility: 'FFA members', major: 'agriculture', citizenship: 'us_citizen', min_gpa: 2.5, state: null, category: 'agriculture', description: 'Future Farmers', requirements: 'FFA membership', recurring: true, region: 'national', area: 'agriculture'},
  {name: 'Environmental Scholarship', amount: 5000, deadline: '2026-04-30', eligibility: 'Environmental science students', major: 'environmental_science', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'stem', description: 'Green future', requirements: 'Environmental focus', recurring: true, region: 'national', area: 'environment'},

  // BUSINESS & ENTREPRENEURSHIP
  {name: 'Entrepreneurship Scholarship', amount: 10000, deadline: '2026-06-15', eligibility: 'Future business owners', major: 'business', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'business', description: 'Future founders', requirements: 'Business plan required', recurring: true, region: 'national', area: 'entrepreneurship'},
  {name: 'Business Leaders Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Business majors', major: 'business', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'business', description: 'Future executives', requirements: 'Business major', recurring: true, region: 'national', area: 'business'},
  {name: 'Accounting Scholarship', amount: 5000, deadline: '2026-05-01', eligibility: 'Accounting students', major: 'accounting', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'business', description: 'CPA pathway', requirements: 'Accounting major', recurring: true, region: 'national', area: 'business'},
  {name: 'Finance Scholarship', amount: 5000, deadline: '2026-04-15', eligibility: 'Finance majors', major: 'finance', citizenship: 'us_citizen', min_gpa: 3.0, state: null, category: 'business', description: 'Wall Street prep', requirements: 'Finance major', recurring: true, region: 'national', area: 'business'},

  // MORE STATE SCHOLARSHIPS
  {name: 'Ohio College Opportunity Grant', amount: 4000, deadline: '2026-10-01', eligibility: 'Ohio students with need', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'OH', category: 'state', description: 'Ohio need-based grant', requirements: 'Ohio resident', recurring: true, region: 'OH', area: 'state_resident'},
  {name: 'Pennsylvania PHEAA Grant', amount: 5000, deadline: '2026-04-15', eligibility: 'Pennsylvania residents', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'PA', category: 'state', description: 'Pennsylvania state grant', requirements: 'PA resident, need', recurring: true, region: 'PA', area: 'state_resident'},
  {name: 'Michigan Tuition Grant', amount: 3000, deadline: '2026-03-01', eligibility: 'Michigan private college students', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'MI', category: 'state', description: 'Michigan state grant', requirements: 'MI resident', recurring: true, region: 'MI', area: 'state_resident'},
  {name: 'Virginia Tuition Assistance', amount: 3000, deadline: '2026-03-15', eligibility: 'Virginia residents', major: 'any', citizenship: 'us_citizen', min_gpa: 2.5, state: 'VA', category: 'state', description: 'Virginia state aid', requirements: 'VA resident', recurring: true, region: 'VA', area: 'state_resident'},
  {name: 'Washington State Grant', amount: 5000, deadline: '2026-03-01', eligibility: 'Washington residents', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'WA', category: 'state', description: 'Washington financial aid', requirements: 'WA resident', recurring: true, region: 'WA', area: 'state_resident'},
  {name: 'Arizona State Grant', amount: 2000, deadline: '2026-04-15', eligibility: 'Arizona residents', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'AZ', category: 'state', description: 'Arizona state aid', requirements: 'AZ resident', recurring: true, region: 'AZ', area: 'state_resident'},
  {name: 'Tennessee Promise', amount: 5000, deadline: '2026-01-15', eligibility: 'TN high school seniors', major: 'any', citizenship: 'us_citizen', min_gpa: 0, state: 'TN', category: 'state', description: 'TN free community college', requirements: 'TN resident', recurring: true, region: 'TN', area: 'state_resident'},
  {name: 'South Carolina LIFE Scholarship', amount: 5000, deadline: '2026-06-01', eligibility: 'SC residents, 3.0 GPA', major: 'any', citizenship: 'us_citizen', min_gpa: 3.0, state: 'SC', category: 'state', description: 'SC merit scholarship', requirements: 'SC resident', recurring: true, region: 'SC', area: 'state_resident'}
];

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Clear existing scholarships
    await sql`DELETE FROM scholarships`;
    
    // Insert all scholarships
    for (const s of scholarships) {
      await sql`
        INSERT INTO scholarships (
          name, amount, deadline, eligibility, major, citizenship, min_gpa, state, 
          category, description, requirements, recurring, region, area, created_at, updated_at
        ) VALUES (
          ${s.name}, ${s.amount}, ${s.deadline}, ${s.eligibility}, ${s.major}, 
          ${s.citizenship}, ${s.min_gpa}, ${s.state}, ${s.category}, ${s.description},
          ${s.requirements}, ${s.recurring}, ${s.region}, ${s.area}, NOW(), NOW()
        )
      `;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        count: scholarships.length,
        message: `Loaded ${scholarships.length} scholarships!`
      })
    };
  } catch (error) {
    console.error('Load error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
