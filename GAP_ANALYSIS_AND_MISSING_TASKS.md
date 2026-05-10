# GUIDESOFT TRAINING - GAP ANALYSIS & MISSING TASKS

**Date:** 2026-05-10  
**Project Status:** EARLY DEVELOPMENT PHASE  
**Priority:** CRITICAL - Major gaps identified

---

## 🔴 CRITICAL GAPS (Must Fix Before Launch)

### 1. **MISSING DATABASE SCHEMA** ❌
**Status:** NOT IMPLEMENTED  
**Impact:** BLOCKER - No proper database structure for learning platform

**Current State:**
- Only has basic `hero_users` and `hero_purchases` tables
- Missing ALL core tables from documentation

**Missing Tables:**
```sql
❌ user_profiles - Student skill levels, goals, preferences
❌ subscriptions - Stripe subscription management
❌ courses - Course catalog (42+ courses needed)
❌ course_modules - Module structure
❌ lessons - Individual lesson content
❌ learning_paths - AI-generated personalized paths
❌ user_progress - Progress tracking per lesson
❌ quiz_results - Quiz scores and answers
❌ certificates - Certificate generation
❌ mentorship_sessions - Mentorship scheduling
❌ payments - Payment history
❌ ai_generation_logs - AI usage tracking
```

**Action Required:**
- Create Prisma schema file (`prisma/schema.prisma`)
- Run database migrations
- Seed initial course data

---

### 2. **MISSING STRIPE INTEGRATION** ❌
**Status:** PARTIAL (Using UPI/Google Pay instead)  
**Impact:** BLOCKER - Cannot process international subscriptions

**Current State:**
- [api/pay.js](file:///Users/mac/gsprompthero/api/pay.js) uses UPI payment (India-specific)
- No Stripe webhook handlers
- No subscription management
- No tier-based access control

**Missing:**
```javascript
❌ Stripe checkout session creation
❌ Webhook handler for payment events
❌ Subscription status tracking
❌ Tier upgrade/downgrade logic
❌ Invoice generation
❌ Failed payment handling
❌ Grace period management
```

**Action Required:**
- Install Stripe SDK properly
- Create `/api/subscription/*` endpoints
- Implement webhook handler
- Add subscription middleware for route protection

---

### 3. **MISSING AUTHENTICATION SYSTEM** ❌
**Status:** BASIC (Google Sign-In only)  
**Impact:** HIGH - No email/password auth, no JWT tokens

**Current State:**
- Only Google OAuth via GSI client
- No password hashing
- No JWT token generation
- No refresh token mechanism
- No role-based access control

**Missing:**
```javascript
❌ Email/password registration
❌ Password reset flow
❌ JWT token generation & validation
❌ Refresh token rotation
❌ Session management
❌ Admin authentication
❌ Two-factor authentication
❌ Email verification
```

**Action Required:**
- Implement bcrypt password hashing
- Create JWT middleware
- Add auth guards to protected routes
- Build password reset email flow

---

### 4. **MISSING COURSE MANAGEMENT SYSTEM** ❌
**Status:** NOT EXISTS  
**Impact:** BLOCKER - No courses to sell!

**Current State:**
- Zero course data in database
- No course CRUD operations
- No content management

**Missing:**
```javascript
❌ Course creation API (admin)
❌ Course update/delete API
❌ Course listing with filters
❌ Course detail pages
❌ Module management
❌ Lesson content storage
❌ Video hosting integration
❌ File upload system (S3)
```

**Action Required:**
- Create 42+ courses from documentation
- Build admin panel for course management
- Integrate video hosting (AWS S3/Cloudflare Stream)
- Create lesson content structure

---

### 5. **MISSING AI CURRICULUM GENERATOR** ❌
**Status:** BASIC (Only generic Gemini call)  
**Impact:** HIGH - Core feature not implemented

**Current State:**
- [api/ai.js](file:///Users/mac/gsprompthero/api/ai.js) has basic Gemini integration
- No structured prompt templates
- No curriculum generation logic
- No skill assessment AI

**Missing:**
```javascript
❌ Skill assessment endpoint
❌ Learning path generation algorithm
❌ Dynamic lesson content generator
❌ Quiz question generator
❌ Code review AI
❌ Personalized recommendations
❌ AI cost tracking
❌ Prompt template library
```

**Action Required:**
- Create AI service layer with prompt templates
- Build curriculum generation pipeline
- Implement skill gap analysis
- Add AI response caching

---

### 6. **MISSING LEARNING MANAGEMENT SYSTEM (LMS)** ❌
**Status:** NOT EXISTS  
**Impact:** BLOCKER - No way to deliver courses

**Missing Components:**
```javascript
❌ Course enrollment system
❌ Progress tracking dashboard
❌ Lesson completion marking
❌ Quiz taking interface
❌ Certificate generation
❌ Achievement/badge system
❌ Study schedule planner
❌ Bookmarking system
```

**Action Required:**
- Build student dashboard
- Create lesson player
- Implement progress tracking
- Add quiz engine

---

### 7. **MISSING SUBSCRIPTION TIER ENFORCEMENT** ❌
**Status:** NOT EXISTS  
**Impact:** CRITICAL - No access control based on payment

**Current State:**
- No tier checking anywhere
- All users have same access
- No middleware to protect premium content

**Missing:**
```javascript
❌ Subscription status checker middleware
❌ Tier-based route protection
❌ Feature gating (Starter vs Professional vs Enterprise)
❌ Trial period logic (though no trials planned)
❌ Access expiration handling
```

**Action Required:**
- Create subscription middleware
- Add tier checks to all protected routes
- Implement feature flags per tier

---

### 8. **MISSING FRONTEND PAGES** ❌
**Status:** MINIMAL (Only hero section exists)  
**Impact:** HIGH - No complete user journey

**Current Pages:**
- ✅ Landing page (partial)
- ❌ Registration page
- ❌ Login page
- ❌ Student dashboard
- ❌ Course catalog page
- ❌ Course detail page
- ❌ Lesson player page
- ❌ Profile/settings page
- ❌ Billing/subscription page
- ❌ Admin dashboard
- ❌ Mentorship booking page
- ❌ Certificate showcase page
- ❌ Community forum

**Action Required:**
- Build all missing React components
- Create routing structure
- Implement responsive design

---

### 9. **MISSING PAYMENT WEBHOOK HANDLER** ❌
**Status:** NOT EXISTS  
**Impact:** CRITICAL - Cannot sync payment status

**Missing:**
```javascript
❌ Stripe webhook endpoint
❌ Payment success handler
❌ Payment failure handler
❌ Subscription cancellation handler
❌ Refund processing
❌ Invoice generation
```

**Action Required:**
- Create `/api/webhooks/stripe` endpoint
- Handle all Stripe events
- Update subscription status in DB
- Send confirmation emails

---

### 10. **MISSING EMAIL SYSTEM** ❌
**Status:** NOT EXISTS  
**Impact:** HIGH - No user communication

**Missing Emails:**
```
❌ Welcome email (on registration)
❌ Payment confirmation
❌ Subscription renewal reminder
❌ Payment failure notification
❌ Course completion certificate
❌ Weekly progress report
❌ Mentorship session reminder
❌ Password reset link
❌ Account suspension warning
```

**Action Required:**
- Integrate SendGrid or Resend
- Create email templates
- Set up transactional email triggers

---

## 🟡 MAJOR GAPS (High Priority)

### 11. **MISSING PRISMA ORM SETUP** ❌
**Status:** Listed in package.json but not configured

**Required Files:**
```
❌ prisma/schema.prisma
❌ prisma/migrations/ (folder)
❌ lib/prisma.js (client instance)
❌ .env.example (with DATABASE_URL template)
```

---

### 12. **MISSING FILE UPLOAD SYSTEM** ❌
**Status:** Multer installed but not used

**Missing:**
```javascript
❌ Avatar upload endpoint
❌ Course thumbnail upload
❌ Certificate PDF storage
❌ Assignment submission system
❌ AWS S3 integration
```

---

### 13. **MISSING REAL-TIME FEATURES** ❌
**Status:** No WebSocket implementation

**Missing:**
```javascript
❌ Live chat support
❌ Real-time progress updates
❌ Live Q&A sessions
❌ Notification system
❌ Collaborative coding environment
```

---

### 14. **MISSING ANALYTICS & TRACKING** ❌
**Status:** No analytics

**Missing:**
```javascript
❌ User behavior tracking
❌ Course engagement metrics
❌ Revenue dashboard
❌ Churn analysis
❌ A/B testing framework
```

---

### 15. **MISSING SEARCH FUNCTIONALITY** ❌
**Status:** No search

**Missing:**
```javascript
❌ Course search with filters
❌ Full-text search (Elasticsearch)
❌ Search autocomplete
❌ Filter by category/level/duration
```

---

### 16. **MISSING COMMUNITY FEATURES** ❌
**Status:** Not implemented

**Missing:**
```javascript
❌ Discussion forums
❌ Student profiles
❌ Peer messaging
❌ Study groups
❌ Leaderboards
```

---

### 17. **MISSING MOBILE RESPONSIVENESS** ⚠️
**Status:** Unknown (needs testing)

**Required:**
- Test all pages on mobile devices
- Implement mobile-first design
- Add touch-friendly interactions
- Optimize images for mobile

---

### 18. **MISSING ACCESSIBILITY (WCAG)** ❌
**Status:** Not implemented

**Missing:**
```
❌ ARIA labels
❌ Keyboard navigation
❌ Screen reader support
❌ Color contrast compliance
❌ Focus indicators
```

---

### 19. **MISSING SEO OPTIMIZATION** ❌
**Status:** Minimal

**Missing:**
```html
❌ Meta tags for each page
❌ Open Graph tags
❌ Twitter cards
❌ Structured data (JSON-LD)
❌ Sitemap.xml
❌ Robots.txt
```

---

### 20. **MISSING ERROR HANDLING** ⚠️
**Status:** Basic error logging only

**Missing:**
```javascript
❌ Global error boundary (React)
❌ Graceful fallbacks
❌ User-friendly error messages
❌ Error tracking (Sentry)
❌ Retry mechanisms
```

---

## 🟢 MINOR GAPS (Medium Priority)

### 21. **MISSING DOCUMENTATION** ❌
```
❌ API documentation (Swagger/OpenAPI)
❌ Developer guide
❌ User manual
❌ Deployment guide
❌ Contributing guidelines
```

---

### 22. **MISSING TESTING** ❌
```
❌ Unit tests (Jest)
❌ Integration tests
❌ E2E tests (Playwright/Cypress)
❌ Load testing
❌ Security testing
```

---

### 23. **MISSING CI/CD PIPELINE** ⚠️
```
❌ GitHub Actions workflow
❌ Automated testing on PR
❌ Staging deployment
❌ Production deployment automation
❌ Database migration automation
```

---

### 24. **MISSING MONITORING** ❌
```
❌ Application performance monitoring
❌ Database query monitoring
❌ API latency tracking
❌ Error rate alerts
❌ Uptime monitoring
```

---

### 25. **MISSING BACKUP SYSTEM** ❌
```
❌ Automated database backups
❌ File storage backups
❌ Backup restoration testing
❌ Disaster recovery plan
```

---

### 26. **MISSING RATE LIMITING** ⚠️
```javascript
❌ API rate limiting per user
❌ AI API quota management
❌ DDoS protection
❌ Brute force prevention
```

---

### 27. **MISSING CACHING STRATEGY** ⚠️
```javascript
❌ Redis cache for frequent queries
❌ CDN caching for static assets
❌ Browser caching headers
❌ API response caching
```

---

### 28. **MISSING INTERNATIONALIZATION** ❌
```
❌ Multi-language support
❌ Currency conversion
❌ Timezone handling
❌ RTL language support
```

---

### 29. **MISSING LEGAL PAGES** ❌
```
❌ Terms of Service
❌ Privacy Policy
❌ Cookie Policy
❌ Refund Policy
❌ DMCA Policy
```

---

### 30. **MISSING SOCIAL FEATURES** ❌
```
❌ Social sharing (courses, certificates)
❌ LinkedIn integration
❌ GitHub integration (for code projects)
❌ Referral program
```

---

## 📊 COMPLETENESS ASSESSMENT

| Category | Completion % | Status |
|----------|-------------|---------|
| **Backend APIs** | 15% | 🔴 Critical |
| **Database Schema** | 10% | 🔴 Critical |
| **Frontend Pages** | 20% | 🔴 Critical |
| **Payment System** | 25% | 🔴 Critical |
| **Authentication** | 30% | 🟡 High |
| **AI Integration** | 20% | 🔴 Critical |
| **Course Content** | 0% | 🔴 Critical |
| **LMS Features** | 5% | 🔴 Critical |
| **Security** | 20% | 🟡 High |
| **DevOps** | 10% | 🟡 High |
| **Testing** | 0% | 🔴 Critical |
| **Documentation** | 10% | 🟢 Medium |

**Overall Project Completion: ~15%**

---

## 🎯 IMMEDIATE ACTION PLAN (Next 2 Weeks)

### Week 1: Foundation Setup

**Day 1-2: Database**
1. Create Prisma schema with all 14 tables
2. Run initial migration
3. Seed database with 10 starter courses
4. Test database connections

**Day 3-4: Authentication**
1. Implement email/password registration
2. Add JWT token generation
3. Create auth middleware
4. Build login/register pages

**Day 5-7: Payment System**
1. Set up Stripe account
2. Create checkout session endpoint
3. Implement webhook handler
4. Add subscription management
5. Test payment flows

### Week 2: Core Features

**Day 8-10: Course Management**
1. Create course CRUD APIs
2. Build admin course creator
3. Add 20 more courses to catalog
4. Implement course listing page

**Day 11-12: AI Integration**
1. Create AI service layer
2. Build curriculum generator
3. Implement skill assessment
4. Add learning path generation

**Day 13-14: Student Dashboard**
1. Build dashboard UI
2. Implement progress tracking
3. Add course enrollment
4. Create lesson player skeleton

---

## 📦 MISSING DEPENDENCIES

Add these to [package.json](file:///Users/mac/gsprompthero/package.json):

```json
{
  "dependencies": {
    // Already present ✅
    "express": "^4.18.2",
    "pg": "^8.20.0",
    "stripe": "^14.0.0",
    
    // MISSING - Add these ❌
    "@prisma/client": "^5.7.0",
    "nodemailer": "^6.9.7",        // Email sending
    "ioredis": "^5.3.2",            // Redis caching
    "winston": "^3.11.0",           // Logging (already listed)
    "helmet": "^7.1.0",             // Security headers
    "express-rate-limit": "^7.1.5", // Rate limiting
    "compression": "^1.7.4",        // Response compression
    "cors": "^2.8.5",               // CORS (already listed)
    "dotenv": "^16.3.1",            // Environment variables
    "joi": "^17.11.0",              // Input validation
    "uuid": "^9.0.0",               // UUID generation
    "sharp": "^0.33.0",             // Image processing
    "pdfkit": "^0.14.0",            // Certificate PDF generation
    "socket.io": "^4.7.2",          // WebSocket for real-time
    "bull": "^4.11.5",              // Job queue for background tasks
    "agenda": "^5.0.0",             // Task scheduler
    "sanitize-html": "^2.11.0",     // HTML sanitization
    "rate-limiter-flexible": "^4.0.0" // Advanced rate limiting
  }
}
```

---

## 🗂️ MISSING FOLDER STRUCTURE

Create these directories:

```
guidesoft-training/
├── prisma/                    # ❌ MISSING
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── components/
│   │   ├── auth/             # ❌ MISSING
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── courses/          # ❌ MISSING
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseList.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   └── LessonPlayer.jsx
│   │   ├── dashboard/        # ❌ MISSING
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── ProgressTracker.jsx
│   │   │   └── LearningPath.jsx
│   │   ├── billing/          # ❌ MISSING
│   │   │   ├── SubscriptionPlans.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   └── InvoiceHistory.jsx
│   │   ├── admin/            # ❌ MISSING
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CourseCreator.jsx
│   │   │   └── UserManagement.jsx
│   │   └── common/           # ❌ MISSING
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── ErrorBoundary.jsx
│   ├── pages/                # ❌ MISSING ENTIRE FOLDER
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── CourseDetailPage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── BillingPage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── hooks/                # ❌ MISSING
│   │   ├── useAuth.js
│   │   ├── useSubscription.js
│   │   ├── useCourses.js
│   │   └── useProgress.js
│   ├── context/              # ❌ MISSING
│   │   ├── AuthContext.js
│   │   ├── SubscriptionContext.js
│   │   └── ThemeContext.js
│   ├── services/             # ❌ MISSING
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── paymentService.js
│   │   └── aiService.js
│   ├── utils/                # ❌ MISSING
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   └── styles/               # Partially exists
│       └── globals.css
├── api/                      # Exists but incomplete
│   ├── auth.js               # Needs rewrite
│   ├── courses.js            # ❌ MISSING
│   ├── subscriptions.js      # ❌ MISSING
│   ├── webhooks/             # ❌ MISSING
│   │   └── stripe.js
│   ├── ai/                   # ❌ MISSING (restructure)
│   │   ├── curriculum.js
│   │   ├── assessment.js
│   │   └── recommendations.js
│   ├── admin/                # ❌ MISSING
│   │   ├── users.js
│   │   ├── courses.js
│   │   └── analytics.js
│   └── middleware/           # ❌ MISSING
│       ├── auth.js
│       ├── subscription.js
│       └── validation.js
├── lib/                      # Exists but minimal
│   ├── prisma.js             # ❌ MISSING
│   ├── stripe.js             # ❌ MISSING
│   ├── redis.js              # ❌ MISSING
│   └── logger.js             # ❌ MISSING
├── emails/                   # ❌ MISSING ENTIRE FOLDER
│   ├── templates/
│   │   ├── welcome.html
│   │   ├── payment-confirm.html
│   │   └── certificate.html
│   └── sendEmail.js
├── tests/                    # ❌ MISSING ENTIRE FOLDER
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                     # ❌ MISSING
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
└── scripts/                  # ❌ MISSING
    ├── seed-db.js
    ├── create-admin.js
    └── backup-db.js
```

---

## 🔐 SECURITY GAPS

### Critical Security Issues:

1. **❌ No input validation** - All APIs accept raw input
2. **❌ No SQL injection protection** - Using string concatenation
3. **❌ No XSS protection** - No sanitization
4. **❌ No CSRF tokens** - Forms vulnerable
5. **❌ No rate limiting** - APIs can be spammed
6. **❌ Exposed API keys** - GEMINI_API_KEY in .env (should use secrets manager)
7. **❌ No HTTPS enforcement** - HTTP allowed
8. **❌ No security headers** - Missing Helmet.js
9. **❌ Weak password policy** - No password strength requirements
10. **❌ No audit logging** - Can't track suspicious activity

---

## 🚀 PERFORMANCE GAPS

1. **❌ No database indexing** - Slow queries at scale
2. **❌ No query optimization** - N+1 query problems likely
3. **❌ No caching layer** - Every request hits DB
4. **❌ No CDN** - Static assets not optimized
5. **❌ No image optimization** - Large images slow loading
6. **❌ No lazy loading** - All components load upfront
7. **❌ No code splitting** - Large bundle size
8. **❌ No compression** - Responses not compressed
9. **❌ No connection pooling** - DB connections not managed
10. **❌ No background jobs** - Heavy tasks block requests

---

## 📋 RECOMMENDED PRIORITY ORDER

### Phase 1: MVP (Weeks 1-4)
1. ✅ Complete database schema
2. ✅ Implement Stripe payments
3. ✅ Build authentication system
4. ✅ Create 10 foundation courses
5. ✅ Build student dashboard
6. ✅ Implement basic AI curriculum generator
7. ✅ Add subscription tier enforcement
8. ✅ Create landing page

### Phase 2: Enhanced (Weeks 5-8)
9. ✅ Add remaining 32 courses
10. ✅ Build lesson player
11. ✅ Implement progress tracking
12. ✅ Add quiz system
13. ✅ Create certificate generation
14. ✅ Build admin panel
15. ✅ Add email notifications
16. ✅ Implement mentorship booking

### Phase 3: Scale (Weeks 9-12)
17. ✅ Add community features
18. ✅ Implement advanced AI features
19. ✅ Add mobile app (React Native)
20. ✅ Build analytics dashboard
21. ✅ Add search functionality
22. ✅ Implement gamification
23. ✅ Add internationalization
24. ✅ Optimize performance

---

## 💡 QUICK WINS (Can implement in 1-2 days)

1. Add meta tags for SEO
2. Create privacy policy page
3. Add terms of service
4. Implement basic rate limiting
5. Add error boundaries
6. Create loading states
7. Add form validation
8. Implement toast notifications
9. Add keyboard shortcuts
10. Create FAQ page

---

## 🎓 CONTENT CREATION CHECKLIST

### Courses to Create (42 Total):

**Foundation Level (7 courses):**
- [ ] AI Fundamentals for Beginners
- [ ] Introduction to Data Science
- [ ] Web Development Essentials
- [ ] Cloud Computing Basics
- [ ] Cybersecurity Fundamentals
- [ ] Design Thinking Fundamentals
- [ ] DevOps for Beginners

**Intermediate Level (12 courses):**
- [ ] Machine Learning Engineer Path
- [ ] Deep Learning Specialist
- [ ] Natural Language Processing
- [ ] Full-Stack JavaScript Developer
- [ ] Modern Frontend Engineering
- [ ] AWS Solutions Architect
- [ ] Azure Cloud Engineer
- [ ] Data Pipeline Development
- [ ] React Native Mobile Developer
- [ ] Advanced UX Research
- [ ] Design Systems & Component Libraries
- [ ] *(Add 1 more)*

**Advanced Level (12 courses):**
- [ ] Large Language Models Engineer
- [ ] MLOps Engineer
- [ ] Computer Vision Specialist
- [ ] Reinforcement Learning Engineer
- [ ] System Design & Architecture
- [ ] Backend Engineering Excellence
- [ ] Multi-Cloud Architect
- [ ] Ethical Hacker & Penetration Tester
- [ ] SOC Analyst
- [ ] Advanced Data Scientist
- [ ] AI Product Manager
- [ ] Tech Lead & Engineering Manager

**Expert Level (9 courses):**
- [ ] AI Research Scientist
- [ ] Autonomous AI Agents Developer
- [ ] Multimodal AI Engineer
- [ ] Blockchain & Web3 Developer
- [ ] Quantum Computing Programmer
- [ ] Edge AI & IoT Specialist
- [ ] Healthcare AI Specialist
- [ ] Financial AI Engineer
- [ ] AI for Autonomous Vehicles

**Master Level (3 courses):**
- [ ] Chief AI Officer Program
- [ ] AI Entrepreneurship & Startup Builder
- [ ] AI Ethics & Policy Advisor

**For EACH course, create:**
- [ ] Course description
- [ ] 5-10 modules
- [ ] 3-5 lessons per module
- [ ] Video content (or script)
- [ ] Code examples
- [ ] Practice exercises
- [ ] Quiz questions (10 per course)
- [ ] Capstone project
- [ ] Certificate template

---

## 📞 NEXT STEPS

### Immediate (Today):
1. Review this gap analysis
2. Prioritize tasks based on business goals
3. Set up project management tool (Trello/Jira/Notion)
4. Create development roadmap

### This Week:
1. Set up Prisma and database schema
2. Configure Stripe integration
3. Start building authentication system
4. Create first 5 courses manually

### This Month:
1. Complete MVP features
2. Beta test with 50 users
3. Gather feedback
4. Iterate and improve

---

**Total Estimated Development Time:** 12-16 weeks for full production-ready platform  
**Minimum Viable Product:** 4-6 weeks  
**Recommended Team Size:** 3-5 developers (full-stack + AI specialist + designer)

---

*This analysis is based on current project state as of 2026-05-10. Regular updates recommended as development progresses.*
