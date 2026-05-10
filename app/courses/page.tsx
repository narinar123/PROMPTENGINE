'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { id: 'all', label: 'All Courses', icon: '📚' },
  { id: 'ai_ml', label: 'AI & ML', icon: '🤖' },
  { id: 'web_dev', label: 'Web Dev', icon: '💻' },
  { id: 'cloud', label: 'Cloud', icon: '☁️' },
  { id: 'cybersecurity', label: 'Security', icon: '🔒' },
  { id: 'ux_ui', label: 'UX/UI', icon: '🎨' },
];

const sampleCourses = [
  {
    id: 1,
    title: 'AI Fundamentals for Beginners',
    slug: 'ai-fundamentals-beginners',
    description: 'Master the basics of artificial intelligence and machine learning',
    category: 'ai_ml',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.9,
    students: 2543,
    image: '🤖',
    price: 'Included',
  },
  {
    id: 2,
    title: 'Full-Stack JavaScript Developer',
    slug: 'fullstack-js-developer',
    description: 'Become a complete JavaScript developer with React and Node.js',
    category: 'web_dev',
    level: 'Intermediate',
    duration: '12 weeks',
    rating: 4.8,
    students: 1876,
    image: '💻',
    price: 'Included',
  },
  {
    id: 3,
    title: 'AWS Solutions Architect',
    slug: 'aws-solutions-architect',
    description: 'Design and deploy scalable cloud solutions on AWS',
    category: 'cloud',
    level: 'Intermediate',
    duration: '10 weeks',
    rating: 4.9,
    students: 1234,
    image: '☁️',
    price: 'Included',
  },
  {
    id: 4,
    title: 'Machine Learning Engineer Path',
    slug: 'ml-engineer-path',
    description: 'Comprehensive ML course covering supervised and unsupervised learning',
    category: 'ai_ml',
    level: 'Intermediate',
    duration: '8 weeks',
    rating: 4.9,
    students: 3421,
    image: '🧠',
    price: 'Included',
  },
  {
    id: 5,
    title: 'Deep Learning Specialist',
    slug: 'deep-learning-specialist',
    description: 'Master neural networks, TensorFlow, and PyTorch',
    category: 'ai_ml',
    level: 'Advanced',
    duration: '10 weeks',
    rating: 4.8,
    students: 987,
    image: '🔬',
    price: 'Professional',
  },
  {
    id: 6,
    title: 'Large Language Models Engineer',
    slug: 'llm-engineer',
    description: 'Build applications with GPT, transformers, and RAG systems',
    category: 'ai_ml',
    level: 'Advanced',
    duration: '12 weeks',
    rating: 5.0,
    students: 654,
    image: '⚡',
    price: 'Professional',
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  useEffect(() => {
    // Hero animation
    gsap.from('.courses-hero', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Category buttons stagger
    gsap.from('.category-btn', {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Course cards with scroll trigger
    gsap.from('.course-card', {
      scrollTrigger: {
        trigger: '.courses-grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Floating animation for hero background
    gsap.to('.hero-blob', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      scale: 'random(0.9, 1.1)',
      duration: 'random(4, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.5,
        from: 'random',
      },
    });
  }, []);

  useEffect(() => {
    // Filter courses
    let filtered = sampleCourses;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(course => course.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);

    // Animate filtered results
    gsap.fromTo('.course-card', {
      opacity: 0,
      scale: 0.9,
      to: {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
      },
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-blob absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="hero-blob absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="hero-blob absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
        </div>

        <div className="courses-hero max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">42+ Industry Courses</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Explore Our Courses
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            From beginner to master level. AI-powered personalized learning paths for your career goals.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-btn px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <BookOpen className="w-4 h-4" />
              Sorted by: Popular
            </div>
          </div>

          <div className="courses-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="course-card group block"
              >
                <div className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2">
                  {/* Course Image */}
                  <div className="h-48 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {course.image}
                    </span>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {course.price}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                        course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {course.level}
                      </span>
                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-white">{course.rating}</span>
                        <span className="text-xs text-slate-500">({course.students})</span>
                      </div>
                      <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all hover:scale-105">
                Load More Courses
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
