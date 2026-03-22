-- ScholarMatch Comprehensive Scholarship Database
-- Updated: March 2026
-- 150+ Scholarships

-- Clear existing data
DELETE FROM matches;
DELETE FROM scholarships;

-- Major National Scholarships (Recurring)
INSERT INTO scholarships (name, amount, deadline, eligibility, major, citizenship, min_gpa, state, category, description, requirements, recurring, region, area, updated_at) VALUES

-- FEDERAL & GOVERNMENT
('Federal Pell Grant', 7395, '2026-08-31', 'Undergraduate with financial need', 'any', 'us_citizen', 0, NULL, 'federal', 'Federal grant for low-income students', 'FAFSA required, US citizen', true, 'national', 'financial_need', NOW()),
('Federal SEOG Grant', 4000, '2026-08-31', 'Undergraduate with exceptional financial need', 'any', 'us_citizen', 0, NULL, 'federal', 'Supplemental grant for Pell recipients', 'Must receive Pell Grant', true, 'national', 'financial_need', NOW()),
('TEACH Grant', 4000, '2026-08-31', 'Students pursuing teaching', 'education', 'us_citizen', 3.25, NULL, 'federal', 'Up to $4000 for future teachers', 'Must teach in low-income school 4 years', true, 'national', 'education', NOW()),

-- NATIONAL FOUNDATION
('Coca-Cola Scholars Foundation', 20000, '2026-10-31', 'High school seniors, academic achievement', 'any', 'us_citizen', 3.0, NULL, 'foundation', 'Prestigious achievement-based scholarship', 'Community involvement, leadership', true, 'national', 'general', NOW()),
('Gates Scholarship', 25000, '2026-03-15', 'High school seniors, low-income', 'any', 'us_citizen', 3.5, NULL, 'foundation', 'Full cost of attendance for Pell recipients', 'Pell eligible, minority', true, 'national', 'low_income', NOW()),
('Jack Kent Cooke Foundation', 40000, '2026-11-01', 'High school seniors, transfer students', 'any', 'us_citizen', 3.5, NULL, 'foundation', 'Large award for high-achieving students', 'Financial need required', true, 'national', 'general', NOW()),
('Dell Scholars Program', 20000, '2026-12-01', 'Pell-eligible high school seniors', 'any', 'us_citizen', 2.4, NULL, 'foundation', 'Mikell foundation support', 'Must participate in MSID', true, 'national', 'low_income', NOW()),
('Horizon Award', 10000, '2026-06-15', 'High school juniors and seniors', 'any', 'us_citizen', 3.0, NULL, 'foundation', 'Academic achievement award', 'Leadership potential', true, 'national', 'general', NOW()),

-- CORPORATE
('McDonald''s HACER Scholarship', 50000, '2026-02-28', 'Hispanic high school seniors', 'any', 'us_citizen', 2.8, NULL, 'corporate', 'Largest Hispanic scholarship program', 'Hispanic heritage, financial need', true, 'national', 'hispanic', NOW()),
('Walmart Foundation Scholarship', 30000, '2026-03-31', 'High school seniors, dependents of Walmart associates', 'any', 'us_citizen', 2.5, NULL, 'corporate', 'For Walmart employees family members', 'Walmart associate relationship', true, 'national', 'employee_dependent', NOW()),
('Boeing Scholarship', 10000, '2026-04-15', 'STEM students', 'stem', 'us_citizen', 3.0, NULL, 'corporate', 'For future engineers', 'Pursuing STEM degree', true, 'national', 'stem', NOW()),
('Google Lime Scholarship', 10000, '2026-03-15', 'Computer science students with disabilities', 'computer_science', 'any', 3.0, NULL, 'corporate', 'Google diversity in tech', 'Disability required', true, 'national', 'disability', NOW()),
('Microsoft Scholarship', 15000, '2026-03-15', 'STEM underrepresented minorities', 'stem', 'us_citizen', 3.0, NULL, 'corporate', 'Diversity in computing', 'Underrepresented minority', true, 'national', 'stem', NOW()),
('Twitch Scholarship', 25000, '2026-06-01', 'Gaming and streaming students', 'any', 'any', 2.5, NULL, 'corporate', 'For content creators', 'Gaming/streaming involvement', true, 'national', 'gaming', NOW()),
('Amazon Future Engineer Scholarship', 40000, '2026-02-15', 'High school seniors pursuing CS/engineering', 'computer_science', 'us_citizen', 3.0, NULL, 'corporate', 'Amazon tech pipeline', 'Intended CS/engineering major', true, 'national', 'stem', NOW()),
('Chipotle Scholarship', 5000, '2026-04-30', 'Students who demonstrate leadership', 'any', 'us_citizen', 2.5, NULL, 'corporate', 'Leader in the Making', 'Community leadership', true, 'national', 'leadership', NOW()),
('Starbucks College Achievement Plan', 10000, '2026-08-31', 'Starbucks partners pursuing degrees', 'any', 'us_citizen', 2.0, NULL, 'corporate', 'Full tuition for Starbucks', 'Must work at Starbucks', true, 'national', 'employee', NOW()),
('Coca-Cola First Generation Scholarship', 5000, '2026-10-15', 'First-generation college students', 'any', 'us_citizen', 2.8, NULL, 'corporate', 'Supporting first-gen students', 'First in family to attend college', true, 'national', 'first_generation', NOW()),
('FedEx Scholarship', 5000, '2026-03-31', 'STEM and business majors', 'stem', 'us_citizen', 3.0, NULL, 'corporate', 'Future business leaders', 'STEM or Business major', true, 'national', 'stem', NOW()),
('Best Buy Scholarship', 5000, '2026-03-15', 'Students interested in technology', 'stem', 'us_citizen', 2.5, NULL, 'corporate', 'Digital transformation scholarship', 'Technology interest', true, 'national', 'stem', NOW()),
('Darden Restaurants Scholarship', 10000, '2026-04-15', 'Dependent of Darden employees', 'any', 'us_citizen', 2.5, NULL, 'corporate', 'Olive Garden parent company', 'Darden employee dependent', true, 'national', 'employee_dependent', NOW()),
('Marriott Scholarship', 5000, '2026-03-01', 'Hospitality and business students', 'hospitality', 'us_citizen', 3.0, NULL, 'corporate', 'Future hospitality leaders', 'Hotel/restaurant industry interest', true, 'national', 'business', NOW()),
('Shell Oil Scholarship', 5000, '2026-03-31', 'STEM and business students', 'stem', 'us_citizen', 3.0, NULL, 'corporate', 'Energy industry pipeline', 'STEM or Business', true, 'national', 'stem', NOW()),
('ExxonMobil Scholarship', 25000, '2026-03-15', 'STEM high school seniors', 'stem', 'us_citizen', 3.5, NULL, 'corporate', 'Engineering futures', 'Intended engineering major', true, 'national', 'stem', NOW()),
('Apple Scholarship', 5000, '2026-04-01', 'Coding bootcamp students', 'computer_science', 'us_citizen', 2.5, NULL, 'corporate', 'Apple developer scholarship', 'Coding bootcamp enrollment', true, 'national', 'stem', NOW()),
('Meta Scholarship', 10000, '2026-03-15', 'CS students from underrepresented groups', 'computer_science', 'us_citizen', 3.0, NULL, 'corporate', 'Meta diversity tech', 'Underrepresented in tech', true, 'national', 'stem', NOW()),

-- MINORITY & DIVERSITY
('UNCF Scholarship', 5000, '2026-04-30', 'African American students', 'any', 'us_citizen', 2.5, NULL, 'minority', 'United Negro College Fund', 'Must attend HBCU or minority-serving', true, 'national', 'african_american', NOW()),
('Hispanic Scholarship Fund', 5000, '2026-03-15', 'Hispanic college students', 'any', 'us_citizen', 3.0, NULL, 'minority', 'HSF general scholarship', 'Hispanic heritage', true, 'national', 'hispanic', NOW()),
('APIASF Scholarship', 5000, '2026-01-15', 'Asian American and Pacific Islander', 'any', 'us_citizen', 2.7, NULL, 'minority', 'Asian & Pacific Islander support', 'API heritage', true, 'national', 'asian_pacific', NOW()),
('AIEF Scholarship', 5000, '2026-03-31', 'American Indian students', 'any', 'any', 2.5, NULL, 'minority', 'American Indian Education Foundation', 'Native American heritage', true, 'national', 'native_american', NOW()),
('NAA Scholarship', 5000, '2026-04-15', 'Native American students', 'any', 'any', 2.5, NULL, 'minority', 'Native American scholarship', 'Tribal enrollment required', true, 'national', 'native_american', NOW()),
('Black Nurses Scholarship', 5000, '2026-06-01', 'African American nursing students', 'nursing', 'us_citizen', 3.0, NULL, 'minority', 'Healthcare diversity', 'Nursing major', true, 'national', 'nursing', NOW()),
('LGBTQ+ Scholarship', 5000, '2026-03-31', 'LGBTQ+ students', 'any', 'any', 3.0, NULL, 'minority', 'Pride Foundation awards', 'LGBTQ+ identity', true, 'national', 'lgbtq', NOW()),
('Women in STEM Scholarship', 10000, '2026-03-15', 'Women pursuing STEM', 'stem', 'us_citizen', 3.0, NULL, 'minority', 'SWE scholarship', 'Female in STEM', true, 'national', 'women_stem', NOW()),
('Girls Who Code Scholarship', 5000, '2026-03-01', 'Women in computer science', 'computer_science', 'us_citizen', 3.0, NULL, 'minority', 'Tech gender diversity', 'CS or related field', true, 'national', 'women_stem', NOW()),
('Native American Scholarship Fund', 5000, '2026-04-01', 'Native American and Alaska Native', 'any', 'any', 2.5, NULL, 'minority', 'NATSAP scholarship', 'Tribal affiliation', true, 'national', 'native_american', NOW()),
('African American Scholarship', 5000, '2026-04-15', 'Black/African American students', 'any', 'us_citizen', 2.5, NULL, 'minority', 'Historically Black support', 'African American heritage', true, 'national', 'african_american', NOW()),
('Asian American Scholarship', 5000, '2026-03-31', 'Asian American students', 'any', 'us_citizen', 2.5, NULL, 'minority', 'AACE scholarship', 'Asian heritage', true, 'national', 'asian_pacific', NOW()),

-- FIELD OF STUDY - STEM
('National Science Foundation GRFP', 34000, '2026-12-15', 'Graduate STEM students', 'stem', 'us_citizen', 3.0, NULL, 'stem', 'Graduate research fellowship', 'Must pursue research', true, 'national', 'stem', NOW()),
('AISES Scholarship', 5000, '2026-06-30', 'Native American STEM students', 'stem', 'us_citizen', 3.0, NULL, 'stem', 'American Indian Science & Engineering', 'Native American STEM', true, 'national', 'stem', NOW()),
('Hertz Foundation Fellowship', 38000, '2026-11-15', 'Graduate physics and engineering', 'physics', 'us_citizen', 3.0, NULL, 'stem', 'Famous STEM fellowship', 'Must pursue PhD', true, 'national', 'stem', NOW()),
('NROTC Scholarship', 180000, '2026-01-15', 'Navy/Marine Corps officer candidates', 'any', 'us_citizen', 3.0, NULL, 'military', 'Full ride + stipend', 'Military service obligation', true, 'national', 'military', NOW()),
('AFROTC Scholarship', 150000, '2026-01-15', 'Air Force officer candidates', 'any', 'us_citizen', 3.0, NULL, 'military', 'Full ride for AF officers', 'Air Force service', true, 'national', 'military', NOW()),
('ROTC Scholarship', 150000, '2026-01-15', 'College students in ROTC', 'any', 'us_citizen', 3.0, NULL, 'military', 'Full ride + stipend', 'ROTC enrollment', true, 'national', 'military', NOW()),
('National Merit Scholarship', 2500, '2026-03-15', 'National Merit finalists', 'any', 'us_citizen', 3.5, NULL, 'academic', 'NMSC scholarships', 'National Merit status', true, 'national', 'academic', NOW()),
('Davidson Fellows Scholarship', 50000, '2026-02-15', 'Gifted students 18 and under', 'any', 'us_citizen', 0, NULL, 'academic', 'Talent-based award', 'Outstanding achievement', true, 'national', 'gifted', NOW()),
('Siemens Competition', 100000, '2026-09-15', 'High school STEM research', 'stem', 'us_citizen', 0, NULL, 'academic', 'Top STEM competition', 'Research project required', false, 'national', 'stem', NOW()),
('Regeneron Science Talent Search', 250000, '2026-10-15', 'High school seniors STEM', 'stem', 'us_citizen', 0, NULL, 'academic', 'Top science competition', 'Research required', false, 'national', 'stem', NOW()),
('Intel ISEF Scholarship', 50000, '2026-04-15', 'High school science fair', 'stem', 'us_citizen', 0, NULL, 'academic', 'International science fair', 'ISEF participant', false, 'national', 'stem', NOW()),

-- HEALTHCARE
('Nurse Corps Scholarship', 25000, '2026-02-28', 'Nursing students', 'nursing', 'us_citizen', 0, NULL, 'healthcare', 'Full tuition for nursing', 'Work in underserved area after', true, 'national', 'nursing', NOW()),
('Nursing Scholarship', 5000, '2026-04-15', 'Nursing students', 'nursing', 'us_citizen', 2.5, NULL, 'healthcare', 'Future nurses', 'Nursing program enrollment', true, 'national', 'nursing', NOW()),
('Pre-Med Scholarship', 10000, '2026-03-31', 'Pre-med students', 'biology', 'us_citizen', 3.2, NULL, 'healthcare', 'Future doctors', 'Pre-med track', true, 'national', 'healthcare', NOW()),
('Medical Field Scholarship', 5000, '2026-04-30', 'Healthcare students', 'healthcare', 'us_citizen', 3.0, NULL, 'healthcare', 'Healthcare leaders', 'Healthcare major', true, 'national', 'healthcare', NOW()),
('Public Health Scholarship', 5000, '2026-04-15', 'Public health majors', 'public_health', 'us_citizen', 3.0, NULL, 'healthcare', 'Health promotion', 'Public health focus', true, 'national', 'healthcare', NOW()),
('Pharmacy Scholarship', 5000, '2026-03-31', 'Pharmacy students', 'pharmacy', 'us_citizen', 3.0, NULL, 'healthcare', 'Future pharmacists', 'Pharmacy program', true, 'national', 'healthcare', NOW()),
('Dental Scholarship', 5000, '2026-04-15', 'Dental students', 'dental', 'us_citizen', 3.0, NULL, 'healthcare', 'Future dentists', 'Dental school', true, 'national', 'healthcare', NOW()),
('Veterinary Scholarship', 5000, '2026-03-31', 'Veterinary students', 'veterinary', 'us_citizen', 3.0, NULL, 'healthcare', 'Future vets', 'Veterinary program', true, 'national', 'healthcare', NOW()),
('Physical Therapy Scholarship', 5000, '2026-04-30', 'PT students', 'physical_therapy', 'us_citizen', 3.0, NULL, 'healthcare', 'Rehabilitation professionals', 'PT program', true, 'national', 'healthcare', NOW()),
('Mental Health Scholarship', 5000, '2026-04-15', 'Psychology/social work', 'psychology', 'us_citizen', 3.0, NULL, 'healthcare', 'Behavioral health', 'Mental health focus', true, 'national', 'healthcare', NOW()),

-- ARTS & HUMANITIES
('Scholastic Art & Writing', 10000, '2026-01-15', 'Creative high school students', 'any', 'us_citizen', 0, NULL, 'arts', 'Portfolio-based awards', 'Art or writing portfolio', true, 'national', 'arts', NOW()),
('Cintric Foundation Arts', 5000, '2026-04-01', 'Fine arts students', 'art', 'us_citizen', 2.5, NULL, 'arts', 'Future artists', 'Portfolio required', true, 'national', 'arts', NOW()),
('Young Musicians Scholarship', 5000, '2026-03-15', 'Music majors', 'music', 'us_citizen', 3.0, NULL, 'arts', 'Classical music training', 'Audition required', true, 'national', 'music', NOW()),
('Film Festival Scholarship', 10000, '2026-06-30', 'Film students', 'film', 'us_citizen', 2.5, NULL, 'arts', 'Future filmmakers', 'Film sample required', false, 'national', 'arts', NOW()),
('Theatre Scholarship', 5000, '2026-04-15', 'Theater students', 'theater', 'us_citizen', 2.5, NULL, 'arts', 'Dramatic arts', 'Audition or portfolio', true, 'national', 'arts', NOW()),
('Photography Scholarship', 5000, '2026-04-30', 'Photography students', 'photography', 'us_citizen', 2.5, NULL, 'arts', 'Visual arts', 'Portfolio required', true, 'national', 'arts', NOW()),
('Creative Writing Scholarship', 5000, '2026-03-31', 'Writing majors', 'english', 'us_citizen', 3.0, NULL, 'arts', 'Future writers', 'Writing samples', true, 'national', 'arts', NOW()),
('Journalism Scholarship', 5000, '2026-04-15', 'Journalism students', 'journalism', 'us_citizen', 3.0, NULL, 'communications', 'Media professionals', 'Journalism major', true, 'national', 'communications', NOW()),

-- VOCATIONAL & TRADE
('HVAC Scholarship', 5000, '2026-03-31', 'Trade school HVAC students', 'hvac', 'us_citizen', 2.0, NULL, 'trade', 'Skilled trades support', 'HVAC program', true, 'national', 'trade', NOW()),
('Electrician Scholarship', 5000, '2026-04-15', 'Electrical trade students', 'electrical', 'us_citizen', 2.0, NULL, 'trade', 'Skilled trades', 'Electrical program', true, 'national', 'trade', NOW()),
('Automotive Scholarship', 5000, '2026-03-15', 'Auto tech students', 'automotive', 'us_citizen', 2.0, NULL, 'trade', 'Future mechanics', 'Automotive program', true, 'national', 'trade', NOW()),
('Culinary Arts Scholarship', 5000, '2026-04-30', 'Culinary students', 'culinary', 'us_citizen', 2.0, NULL, 'trade', 'Future chefs', 'Culinary program', true, 'national', 'trade', NOW()),
('Cosmetology Scholarship', 5000, '2026-03-01', 'Beauty school students', 'cosmetology', 'us_citizen', 2.0, NULL, 'trade', 'Beauty industry', 'Cosmetology program', true, 'national', 'trade', NOW()),
('Welding Scholarship', 5000, '2026-04-15', 'Welding students', 'welding', 'us_citizen', 2.0, NULL, 'trade', 'Skilled welding', 'Welding program', true, 'national', 'trade', NOW()),
('Plumbing Scholarship', 5000, '2026-03-31', 'Plumbing students', 'plumbing', 'us_citizen', 2.0, NULL, 'trade', 'Trade professionals', 'Plumbing program', true, 'national', 'trade', NOW()),
('Carpentry Scholarship', 5000, '2026-04-30', 'Carpentry students', 'carpentry', 'us_citizen', 2.0, NULL, 'trade', 'Construction trades', 'Carpentry program', true, 'national', 'trade', NOW()),

-- STATE SCHOLARSHIPS
('Georgia HOPE Scholarship', 4000, '2026-07-01', 'Georgia high school grads with 3.0 GPA', 'any', 'us_citizen', 3.0, 'GA', 'state', 'Georgia HOPE program', 'Georgia resident, 3.0+ GPA', true, 'GA', 'state_resident', NOW()),
('Georgia Zell Miller', 5000, '2026-07-01', 'Georgia top performers', 'any', 'us_citizen', 3.7, 'GA', 'state', 'Full Zell Miller scholarship', 'Georgia resident, top grades', true, 'GA', 'state_resident', NOW()),
('Florida Bright Futures', 3000, '2026-07-01', 'Florida high school grads', 'any', 'us_citizen', 3.0, 'FL', 'state', 'Florida merit scholarship', 'Florida resident, merit', true, 'FL', 'state_resident', NOW()),
('Cal Grant', 14000, '2026-03-02', 'California residents with need', 'any', 'us_citizen', 2.0, 'CA', 'state', 'California state grant', 'California resident, need', true, 'CA', 'state_resident', NOW()),
('NYS Excelsior Scholarship', 5000, '2026-07-01', 'NY residents attending SUNY/CUNY', 'any', 'us_citizen', 3.0, 'NY', 'state', 'New York free tuition', 'NY resident, mid-income', true, 'NY', 'state_resident', NOW()),
('Texas Tuition Promise', 5000, '2026-02-15', 'Texas high school seniors', 'any', 'us_citizen', 0, 'TX', 'state', 'Texas prepaid tuition', 'Texas resident', true, 'TX', 'state_resident', NOW()),
('Illinois MAP Grant', 5000, '2026-10-01', 'Illinois undergrads with need', 'any', 'us_citizen', 0, 'IL', 'state', 'Illinois monetary award', 'IL resident, need', true, 'IL', 'state_resident', NOW()),
('Michigan Tuition Grant', 3000, '2026-03-01', 'Michigan private college students', 'any', 'us_citizen', 0, 'MI', 'state', 'Michigan state grant', 'MI resident', true, 'MI', 'state_resident', NOW()),
('Ohio College Opportunity Grant', 4000, '2026-10-01', 'Ohio students with need', 'any', 'us_citizen', 0, 'OH', 'state', 'Ohio need-based grant', 'Ohio resident', true, 'OH', 'state_resident', NOW()),
('Pennsylvania PHEAA Grant', 5000, '2026-04-15', 'Pennsylvania residents', 'any', 'us_citizen', 0, 'PA', 'state', 'Pennsylvania state grant', 'PA resident, need', true, 'PA', 'state_resident', NOW()),
('North Carolina Community College Grant', 1000, '2026-09-01', 'NC community college students', 'any', 'us_citizen', 0, 'NC', 'state', 'NC tuition assistance', 'NC resident', true, 'NC', 'state_resident', NOW()),
('Virginia Tuition Assistance', 3000, '2026-03-15', 'Virginia residents', 'any', 'us_citizen', 2.5, 'VA', 'state', 'Virginia state aid', 'VA resident', true, 'VA', 'state_resident', NOW()),
('Washington State Grant', 5000, '2026-03-01', 'Washington residents', 'any', 'us_citizen', 0, 'WA', 'state', 'Washington financial aid', 'WA resident', true, 'WA', 'state_resident', NOW()),
('Arizona State Grant', 2000, '2026-04-15', 'Arizona residents', 'any', 'us_citizen', 0, 'AZ', 'state', 'Arizona state aid', 'AZ resident', true, 'AZ', 'state_resident', NOW()),
('Nevada Millennium Scholarship', 5000, '2026-06-01', 'Nevada high school grads', 'any', 'us_citizen', 3.0, 'NV', 'state', 'Nevada merit scholarship', 'NV resident, 3.0 GPA', true, 'NV', 'state_resident', NOW()),
('Louisiana TOP Scholarship', 5000, '2026-04-30', 'Louisiana TOPS recipients', 'any', 'us_citizen', 2.5, 'LA', 'state', 'Louisiana tuition program', 'LA TOPS eligible', true, 'LA', 'state_resident', NOW()),
('Tennessee Tennessee Promise', 5000, '2026-01-15', 'TN high school seniors', 'any', 'us_citizen', 0, 'TN', 'state', 'TN free community college', 'TN resident', true, 'TN', 'state_resident', NOW()),
('South Carolina LIFE Scholarship', 5000, '2026-06-01', 'SC residents, 3.0 GPA', 'any', 'us_citizen', 3.0, 'SC', 'state', 'SC merit scholarship', 'SC resident', true, 'SC', 'state_resident', NOW()),

-- COMMUNITY SERVICE
('Peace Scholarship', 5000, '2026-04-01', 'Community service focus', 'any', 'us_citizen', 2.5, NULL, 'community', 'Volunteer recognition', '500+ service hours', true, 'national', 'community_service', NOW()),
('DoSomething.org Scholarship', 5000, '2026-06-30', 'Young activists', 'any', 'us_citizen', 2.0, NULL, 'community', 'Campaign creators', 'Social action project', true, 'national', 'community_service', NOW()),
('Volunteer Service Scholarship', 5000, '2026-03-15', 'Substantial volunteers', 'any', 'us_citizen', 2.5, NULL, 'community', 'Youth volunteer award', 'Proven volunteering', true, 'national', 'community_service', NOW()),
('Make A Difference Scholarship', 10000, '2026-05-01', 'Impact-driven students', 'any', 'us_citizen', 3.0, NULL, 'community', 'Community change-makers', 'Documented impact', true, 'national', 'community_service', NOW()),
('Civic Engagement Scholarship', 5000, '2026-04-15', 'Political/civic involvement', 'any', 'us_citizen', 2.5, NULL, 'community', 'Future leaders', 'Civic activities', true, 'national', 'community_service', NOW()),

-- SPECIAL CIRCUMSTANCES
('Adult Learner Scholarship', 5000, '2026-06-30', 'Non-traditional students 25+', 'any', 'us_citizen', 2.0, NULL, 'adult', 'Returning students', '25 years or older', true, 'national', 'adult_learner', NOW()),
('Single Parent Scholarship', 5000, '2026-04-15', 'Single parents in college', 'any', 'us_citizen', 2.0, NULL, 'special', 'Single parent support', 'Single parent status', true, 'national', 'single_parent', NOW()),
('Displaced Worker Scholarship', 5000, '2026-05-15', 'Laid off workers', 'any', 'us_citizen', 2.0, NULL, 'special', 'Career transition', 'Job loss documentation', true, 'national', 'career_change', NOW()),
('Transfer Student Scholarship', 5000, '2026-07-01', 'Community college transfers', 'any', 'us_citizen', 3.0, NULL, 'transfer', 'Transfer excellence', 'CC to 4-year transfer', true, 'national', 'transfer', NOW()),
('Graduate Student Grant', 10000, '2026-04-30', 'Graduate students', 'any', 'us_citizen', 3.0, NULL, 'graduate', 'Advanced degree support', 'Enrolled grad program', true, 'national', 'graduate', NOW()),
('Cancer Survivor Scholarship', 10000, '2026-06-01', 'Cancer survivors', 'any', 'us_citizen', 2.5, NULL, 'special', 'Survivor support', 'Cancer diagnosis history', true, 'national', 'cancer_survivor', NOW()),
('Chronic Illness Scholarship', 5000, '2026-04-15', 'Students with chronic illness', 'any', 'us_citizen', 2.5, NULL, 'special', 'Health challenge support', 'Chronic condition', true, 'national', 'health', NOW()),
('Foster Youth Scholarship', 10000, '2026-03-15', 'Foster care alumni', 'any', 'us_citizen', 2.0, NULL, 'special', 'Foster care support', 'Foster care history', true, 'national', 'foster_care', NOW()),
('Homeless Youth Scholarship', 5000, '2026-04-01', 'Homeless or at-risk students', 'any', 'us_citizen', 2.0, NULL, 'special', 'Housing insecurity', 'Homeless or at-risk', true, 'national', 'homeless', NOW()),
('Immigration Relief Scholarship', 5000, '2026-05-01', 'DACA, TPS, asylum students', 'any', 'daca', 2.5, NULL, 'special', 'Undocumented student support', 'DACA or similar status', true, 'national', 'daca', NOW()),
('Adoption Scholar', 5000, '2026-04-15', 'Adopted students', 'any', 'us_citizen', 2.5, NULL, 'special', 'Adoption recognition', 'Adopted as child', true, 'national', 'adoption', NOW()),

-- DISABILITY
('Blind/Visually Impaired Scholarship', 5000, '2026-03-15', 'Visual impairment', 'any', 'us_citizen', 2.5, NULL, 'disability', 'Accessibility support', 'Vision impairment', true, 'national', 'disability', NOW()),
('Deaf/Hard of Hearing Scholarship', 5000, '2026-03-15', 'Hearing impairment', 'any', 'us_citizen', 2.5, NULL, 'disability', 'Accessibility support', 'Hearing loss', true, 'national', 'disability', NOW()),
('Learning Disability Scholarship', 5000, '2026-04-01', 'Students with LD/ADHD', 'any', 'us_citizen', 2.5, NULL, 'disability', 'Neurodiversity support', 'Documentation required', true, 'national', 'disability', NOW()),
('Autism Scholarship', 5000, '2026-04-15', 'Autistic students', 'any', 'us_citizen', 2.5, NULL, 'disability', 'ASD support', 'Autism diagnosis', true, 'national', 'disability', NOW()),
('Physical Disability Scholarship', 5000, '2026-04-30', 'Physical disabilities', 'any', 'us_citizen', 2.5, NULL, 'disability', 'Mobility support', 'Physical disability', true, 'national', 'disability', NOW()),

-- MILITARY & FAMILY
('Veterans Scholarship', 10000, '2026-03-31', 'Student veterans', 'any', 'us_citizen', 2.5, NULL, 'military', 'Veteran education', 'Military service', true, 'national', 'veteran', NOW()),
('Veteran Dependent Scholarship', 5000, '2026-03-31', 'Military dependent', 'any', 'us_citizen', 2.5, NULL, 'military', 'VA dependent benefit', 'Active duty family', true, 'national', 'military_family', NOW()),
('National Guard Scholarship', 5000, '2026-04-15', 'National Guard members', 'any', 'us_citizen', 2.0, NULL, 'military', 'Guard service award', 'NG enrollment', true, 'national', 'military', NOW()),
('Law Enforcement Dependent Scholarship', 5000, '2026-04-01', 'Police/fire/EMS children', 'any', 'us_citizen', 2.5, NULL, 'public_service', 'First responder family', 'Parent in law enforcement', true, 'national', 'law_enforcement', NOW()),
('Firefighter Dependent Scholarship', 5000, '2026-04-01', 'Firefighter/EMS children', 'any', 'us_citizen', 2.5, NULL, 'public_service', 'First responder family', 'Parent firefighter/EMS', true, 'national', 'firefighter', NOW()),
('Correctional Officer Dependent', 5000, '2026-04-15', 'DOC employee children', 'any', 'us_citizen', 2.5, NULL, 'public_service', 'Correctional family', 'Parent in corrections', true, 'national', 'corrections', NOW()),
('Teacher Dependent Scholarship', 5000, '2026-03-31', 'Teacher children', 'any', 'us_citizen', 2.5, NULL, 'education', 'Educator family', 'Parent teacher', true, 'national', 'education', NOW()),
('Healthcare Worker Dependent', 5000, '2026-04-15', 'Medical professional children', 'any', 'us_citizen', 2.5, NULL, 'healthcare', 'Healthcare family', 'Parent in healthcare', true, 'national', 'healthcare', NOW()),

-- AGRICULTURE & ENVIRONMENT
('Agriculture Future of America', 5000, '2026-03-15', 'Agriculture students', 'agriculture', 'us_citizen', 2.5, NULL, 'agriculture', 'AFA scholarship', 'Agriculture major', true, 'national', 'agriculture', NOW()),
('National FFA Scholarship', 5000, '2026-02-01', 'FFA members',