const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@guidesoft-training.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@guidesoft-training.com',
      passwordHash: adminPassword,
      fullName: 'Admin User',
      emailVerified: true,
      profile: {
        create: {
          currentLevel: 'expert',
          timezone: 'UTC',
          language: 'en',
        },
      },
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Sample courses data (first 10 courses)
  const courses = [
    {
      title: 'AI Fundamentals for Beginners',
      slug: 'ai-fundamentals-beginners',
      description: 'Master the basics of artificial intelligence and machine learning. Perfect starting point for your AI journey.',
      tier: 'foundation',
      category: 'ai_ml',
      durationWeeks: 4,
      difficultyLevel: 'beginner',
      isPublished: true,
      tags: ['AI', 'Machine Learning', 'Beginner', 'Python'],
      learningOutcomes: [
        'Understand core AI concepts and terminology',
        'Learn Python programming basics for AI',
        'Build your first ML model',
        'Understand ethics in AI',
      ],
      prerequisites: ['Basic computer skills'],
    },
    {
      title: 'Introduction to Data Science',
      slug: 'intro-data-science',
      description: 'Learn data collection, cleaning, analysis, and visualization with Python.',
      tier: 'foundation',
      category: 'data_science',
      durationWeeks: 4,
      difficultyLevel: 'beginner',
      isPublished: true,
      tags: ['Data Science', 'Python', 'Pandas', 'Visualization'],
      learningOutcomes: [
        'Perform exploratory data analysis',
        'Clean and preprocess datasets',
        'Create data visualizations',
        'Apply statistical methods',
      ],
      prerequisites: ['Basic math knowledge'],
    },
    {
      title: 'Web Development Essentials',
      slug: 'web-dev-essentials',
      description: 'Build modern websites with HTML5, CSS3, and JavaScript from scratch.',
      tier: 'foundation',
      category: 'web_dev',
      durationWeeks: 6,
      difficultyLevel: 'beginner',
      isPublished: true,
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      learningOutcomes: [
        'Create responsive web pages',
        'Master CSS layouts and Flexbox',
        'Write interactive JavaScript',
        'Use Git for version control',
      ],
      prerequisites: [],
    },
    {
      title: 'Machine Learning Engineer Path',
      slug: 'ml-engineer-path',
      description: 'Comprehensive machine learning course covering supervised and unsupervised learning algorithms.',
      tier: 'intermediate',
      category: 'ai_ml',
      durationWeeks: 8,
      difficultyLevel: 'intermediate',
      isPublished: true,
      tags: ['Machine Learning', 'Scikit-learn', 'Algorithms', 'Feature Engineering'],
      learningOutcomes: [
        'Implement supervised learning algorithms',
        'Apply unsupervised learning techniques',
        'Evaluate and optimize models',
        'Engineer features for better performance',
      ],
      prerequisites: ['Python programming', 'Basic statistics'],
    },
    {
      title: 'Deep Learning Specialist',
      slug: 'deep-learning-specialist',
      description: 'Master neural networks, TensorFlow, PyTorch, and advanced deep learning architectures.',
      tier: 'intermediate',
      category: 'ai_ml',
      durationWeeks: 10,
      difficultyLevel: 'intermediate',
      isPublished: true,
      tags: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Neural Networks'],
      learningOutcomes: [
        'Build and train neural networks',
        'Implement CNNs for computer vision',
        'Create RNNs for sequence data',
        'Apply transfer learning techniques',
      ],
      prerequisites: ['Machine Learning basics', 'Linear algebra'],
    },
    {
      title: 'Full-Stack JavaScript Developer',
      slug: 'fullstack-js-developer',
      description: 'Become a complete JavaScript developer with React, Node.js, and databases.',
      tier: 'intermediate',
      category: 'web_dev',
      durationWeeks: 12,
      difficultyLevel: 'intermediate',
      isPublished: true,
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Full-Stack'],
      learningOutcomes: [
        'Build SPAs with React',
        'Create RESTful APIs with Node.js',
        'Work with MongoDB and PostgreSQL',
        'Implement authentication & authorization',
      ],
      prerequisites: ['JavaScript fundamentals', 'HTML/CSS'],
    },
    {
      title: 'AWS Solutions Architect',
      slug: 'aws-solutions-architect',
      description: 'Design and deploy scalable cloud solutions on Amazon Web Services.',
      tier: 'intermediate',
      category: 'cloud',
      durationWeeks: 10,
      difficultyLevel: 'intermediate',
      isPublished: true,
      tags: ['AWS', 'Cloud Architecture', 'Serverless', 'DevOps'],
      learningOutcomes: [
        'Design scalable cloud architectures',
        'Implement serverless solutions',
        'Manage AWS security and IAM',
        'Optimize cloud costs',
      ],
      prerequisites: ['Basic networking', 'Linux fundamentals'],
    },
    {
      title: 'Large Language Models Engineer',
      slug: 'llm-engineer',
      description: 'Advanced course on building applications with GPT, transformers, and RAG systems.',
      tier: 'advanced',
      category: 'ai_ml',
      durationWeeks: 12,
      difficultyLevel: 'advanced',
      isPublished: true,
      tags: ['LLM', 'GPT', 'Transformers', 'RAG', 'LangChain'],
      learningOutcomes: [
        'Fine-tune large language models',
        'Build RAG applications',
        'Implement prompt engineering strategies',
        'Deploy LLM-powered applications',
      ],
      prerequisites: ['Deep Learning', 'Python advanced'],
    },
    {
      title: 'System Design & Architecture',
      slug: 'system-design-architecture',
      description: 'Learn to design scalable distributed systems and microservices architecture.',
      tier: 'advanced',
      category: 'web_dev',
      durationWeeks: 10,
      difficultyLevel: 'advanced',
      isPublished: true,
      tags: ['System Design', 'Microservices', 'Distributed Systems', 'Scalability'],
      learningOutcomes: [
        'Design microservices architecture',
        'Implement event-driven systems',
        'Handle distributed system challenges',
        'Optimize for scalability and reliability',
      ],
      prerequisites: ['Backend development experience', 'Database design'],
    },
    {
      title: 'MLOps Engineer',
      slug: 'mlops-engineer',
      description: 'Deploy, monitor, and maintain machine learning models in production.',
      tier: 'advanced',
      category: 'ai_ml',
      durationWeeks: 10,
      difficultyLevel: 'advanced',
      isPublished: true,
      tags: ['MLOps', 'Docker', 'Kubernetes', 'CI/CD', 'Model Deployment'],
      learningOutcomes: [
        'Containerize ML applications',
        'Orchestrate ML pipelines',
        'Monitor model performance',
        'Implement CI/CD for ML',
      ],
      prerequisites: ['Machine Learning', 'Docker basics'],
    },
  ];

  // Insert courses
  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: {
        ...courseData,
        modules: {
          create: [
            {
              title: 'Introduction & Setup',
              description: 'Course overview and environment setup',
              orderIndex: 1,
              estimatedHours: 2,
              lessons: {
                create: [
                  {
                    title: 'Welcome to the Course',
                    contentType: 'video',
                    contentJson: { videoUrl: '', transcript: 'Welcome...' },
                    orderIndex: 1,
                    durationMinutes: 15,
                    isFreePreview: true,
                  },
                  {
                    title: 'Setting Up Your Environment',
                    contentType: 'text',
                    contentJson: { content: 'Installation instructions...' },
                    orderIndex: 2,
                    durationMinutes: 30,
                  },
                ],
              },
            },
            {
              title: 'Core Concepts',
              description: 'Fundamental concepts and theory',
              orderIndex: 2,
              estimatedHours: 8,
              lessons: {
                create: [
                  {
                    title: 'Understanding the Basics',
                    contentType: 'video',
                    contentJson: { videoUrl: '', transcript: 'Core concepts...' },
                    orderIndex: 1,
                    durationMinutes: 45,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    console.log(`✅ Course created: ${course.title}`);
  }

  console.log('\n🎉 Database seeding completed successfully!');
  console.log(`📊 Total courses: ${courses.length}`);
  console.log(`👤 Admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
