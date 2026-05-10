# GUIDESOFT TRAINING - QUICK SETUP GUIDE

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies (Running...)
```bash
npm install
```

### Step 2: Configure Environment Variables

Edit `.env` file with your actual credentials:

**Required:**
```env
DATABASE_URL=postgresql://your_user:password@host:5432/dbname
JWT_SECRET=generate_a_random_32_character_string_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key
SENDGRID_API_KEY=SG.your_sendgrid_key
GEMINI_API_KEY=AIzaSyYourGeminiKey
```

**Optional:**
```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
REDIS_URL=redis://localhost:6379
```

### Step 3: Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed
```

This will:
- ✅ Create all 14 database tables
- ✅ Create admin user (admin@guidesoft-training.com)
- ✅ Add 10 starter courses
- ✅ Set up course modules and lessons

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 🔑 Default Admin Credentials

After seeding:
- **Email:** admin@guidesoft-training.com
- **Password:** Admin123! (or what you set in .env)

**⚠️ Change this password immediately in production!**

---

## 💳 Stripe Setup

1. Create Stripe account at https://stripe.com
2. Get API keys from Dashboard → Developers → API keys
3. Create products for each tier:
   ```bash
   # Use Stripe CLI or Dashboard to create prices
   # Starter: $49/month
   # Professional: $99/month  
   # Enterprise: $299/month
   ```
4. Add price IDs to `.env`:
   ```env
   STRIPE_PRICE_STARTER=price_xxx
   STRIPE_PRICE_PROFESSIONAL=price_xxx
   STRIPE_PRICE_ENTERPRISE=price_xxx
   ```
5. Setup webhook:
   - Endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
   - Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

---

## 📧 SendGrid Setup

1. Create SendGrid account at https://sendgrid.com
2. Generate API key (Settings → API Keys)
3. Verify sender email (noreply@yourdomain.com)
4. Add API key to `.env`:
   ```env
   SENDGRID_API_KEY=SG.xxx
   EMAIL_FROM=noreply@guidesoft-training.com
   ```

---

## ☁️ AWS S3 Setup (for file storage)

1. Create AWS account
2. Create S3 bucket: `guidesoft-training-courses`
3. Create IAM user with S3 permissions
4. Add credentials to `.env`:
   ```env
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   AWS_S3_BUCKET=guidesoft-training-courses
   AWS_REGION=us-east-1
   ```

---

## 🤖 Google Gemini API Setup

1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Add to `.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```

---

## 🗄️ Database Options

### Option 1: Neon (Recommended - Free Tier)
1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string to `DATABASE_URL`

### Option 2: Local PostgreSQL
```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Start service
brew services start postgresql

# Create database
createdb guidesoft_training

# Update DATABASE_URL
DATABASE_URL=postgresql://localhost:5432/guidesoft_training
```

### Option 3: Railway/Render
- Deploy PostgreSQL on Railway.app or Render.com
- Copy connection string

---

## 🧪 Testing the Setup

### 1. Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "fullName": "Test User"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### 3. View Courses
Visit: http://localhost:3000/courses

---

## 🐛 Troubleshooting

### Issue: "Prisma Client not generated"
```bash
npm run db:generate
```

### Issue: "Database connection failed"
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Test connection: `psql YOUR_DATABASE_URL`

### Issue: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

---

## 📱 Next Steps

1. ✅ Complete setup (you are here)
2. 🎨 Customize landing page branding
3. 📚 Add more courses via admin panel
4. 💳 Configure Stripe webhooks
5. 📧 Test email notifications
6. 🚀 Deploy to production

---

## 🆘 Need Help?

- **Documentation:** See README.md
- **Issues:** GitHub Issues
- **Email:** support@guidesoft-training.com

---

**Happy Building! 🚀**
