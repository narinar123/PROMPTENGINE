# GUIDESOFT TRAINING - AI-Powered Premium Learning Platform

![GUIDESOFT TRAINING](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![Prisma](https://img.shields.io/badge/Prisma-5.7-blue)

## 🎯 Overview

**GUIDESOFT TRAINING** is a premium, subscription-based learning platform that uses AI to generate personalized courses based on student requirements. From beginner to master level, covering AI/ML, Web Development, Cloud Computing, Cybersecurity, UX/UI Design, and more.

### Key Features

✅ **AI-Powered Curriculum Generation** - Personalized learning paths  
✅ **42+ Industry Courses** - Foundation to Master level  
✅ **Subscription Model** - No free trials, premium only  
✅ **Expert Mentorship** - 1-on-1 sessions with professionals  
✅ **Verified Certificates** - Blockchain-verified credentials  
✅ **Real-time Progress Tracking** - Detailed analytics  
✅ **Interactive Code Editor** - Hands-on practice  
✅ **Quiz & Assessment System** - Automated evaluation  

---

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

### Backend
- **Runtime:** Node.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Payments:** Stripe
- **Email:** SendGrid
- **File Storage:** AWS S3
- **Caching:** Redis
- **Real-time:** Socket.IO

### AI/ML
- **Primary:** Google Gemini API
- **Backup:** OpenAI GPT-4
- **Embeddings:** Hugging Face

### DevOps
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry + PostHog
- **Logging:** Winston

---

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- SendGrid account
- AWS S3 bucket
- Google Gemini API key

---

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/guidesoft-training.git
cd guidesoft-training
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Database URL
- Stripe keys
- SendGrid API key
- AWS credentials
- Gemini API key

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
guidesoft-training/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── courses/      # Course management
│   │   ├── subscription/ # Payment handling
│   │   └── webhooks/     # Stripe webhooks
│   ├── dashboard/        # Student dashboard
│   ├── courses/          # Course pages
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── auth/             # Auth components
│   ├── courses/          # Course UI
│   ├── dashboard/        # Dashboard widgets
│   └── common/           # Shared components
├── lib/                   # Utilities
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth helpers
│   ├── stripe.ts         # Payment integration
│   └── email.ts          # Email service
├── prisma/               # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── migrations/       # Database migrations
├── public/               # Static assets
├── scripts/              # Utility scripts
└── docs/                 # Documentation
```

---

## 🔑 Environment Variables

See `.env.example` for complete list. Key variables:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_...
SENDGRID_API_KEY=SG...
AWS_ACCESS_KEY_ID=AKIA...
GEMINI_API_KEY=AIza...
```

---

## 🗄️ Database Schema

The platform uses 14 main tables:

- **User** - User accounts
- **UserProfile** - Student profiles & preferences
- **Subscription** - Subscription management
- **Payment** - Payment history
- **Course** - Course catalog
- **CourseModule** - Course modules
- **Lesson** - Individual lessons
- **UserProgress** - Learning progress
- **QuizResult** - Quiz scores
- **Certificate** - Earned certificates
- **LearningPath** - AI-generated paths
- **AIGenerationLog** - AI usage tracking
- **MentorshipSession** - Mentorship bookings
- **ActivityLog** - User activity tracking

---

## 💳 Subscription Tiers

### Starter - $49/month
- Foundation & Intermediate courses
- 1 personalized learning path
- Community access
- Email support

### Professional - $99/month ⭐
- ALL courses (Foundation to Advanced)
- Unlimited learning paths
- Monthly mentorship call
- Job placement assistance

### Enterprise - $299/month
- Everything in Professional
- Expert & Master courses
- Weekly mentorship calls
- Team collaboration tools
- API access

---

## 🎓 Course Categories

1. **AI & Machine Learning** (12 courses)
2. **Web Development** (8 courses)
3. **Cloud Computing** (6 courses)
4. **Cybersecurity** (5 courses)
5. **UX/UI Design** (4 courses)
6. **Data Science** (4 courses)
7. **DevOps** (3 courses)
8. **Mobile Development** (3 courses)
9. **Blockchain & Web3** (2 courses)
10. **Quantum Computing** (1 course)

Total: **42+ courses** from beginner to master level

---

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt (12 rounds)
- Rate limiting on all APIs
- CORS protection
- SQL injection prevention (Prisma ORM)
- XSS protection
- HTTPS enforcement
- Secure headers (Helmet)
- Input validation (Zod)

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password

### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/:slug` - Course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)

### Subscriptions
- `POST /api/subscription/checkout` - Create checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `GET /api/subscription/status` - Get subscription status

### AI Services
- `POST /api/ai/assess-skills` - Skill assessment
- `POST /api/ai/generate-curriculum` - Generate learning path
- `POST /api/ai/generate-quiz` - Create quiz questions

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📈 Monitoring

- **Error Tracking:** Sentry
- **Analytics:** PostHog
- **Performance:** Vercel Analytics
- **Logs:** Winston + ELK Stack

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👥 Support

- **Email:** support@guidesoft-training.com
- **Documentation:** https://docs.guidesoft-training.com
- **Community:** https://community.guidesoft-training.com

---

## 🎯 Roadmap

### Phase 1 (Completed) ✅
- [x] Project setup with Next.js
- [x] Database schema design
- [x] Authentication system
- [x] Stripe integration
- [x] Landing page

### Phase 2 (In Progress) 🚧
- [ ] Course management system
- [ ] Student dashboard
- [ ] Lesson player
- [ ] AI curriculum generator
- [ ] Progress tracking

### Phase 3 (Planned) 📋
- [ ] Quiz system
- [ ] Certificate generation
- [ ] Mentorship booking
- [ ] Admin panel
- [ ] Mobile app

---

**Built with ❤️ by GUIDESOFT TRAINING Team**
