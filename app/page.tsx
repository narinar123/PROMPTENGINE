'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, BookOpen, Award, Users, Zap,
  CheckCircle, Star, TrendingUp, Shield, Globe, Cpu
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all');

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Learning',
      description: 'Personalized curriculum generated based on your goals and skill level',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: '42+ Industry Courses',
      description: 'From beginner to master level in AI/ML, Web Dev, Cloud, UX, and more',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Verified Certificates',
      description: 'Earn blockchain-verified certificates recognized by top employers',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Mentorship',
      description: '1-on-1 sessions with industry professionals and career guidance',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Hands-On Projects',
      description: 'Build real-world projects that showcase your skills to employers',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Career Support',
      description: 'Resume optimization, interview prep, and job placement assistance',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'ai_ml', label: 'AI & ML' },
    { id: 'web_dev', label: 'Web Development' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'ux_ui', label: 'UX/UI Design' },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '42+', label: 'Expert Courses' },
    { number: '95%', label: 'Completion Rate' },
    { number: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              GUIDESOFT TRAINING
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-sm text-slate-300 hover:text-white transition">Courses</Link>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white transition">Pricing</Link>
            <Link href="/about" className="text-sm text-slate-300 hover:text-white transition">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master Tech Skills with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Guidance
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
              Personalized learning paths from beginner to expert. Auto-generated courses based on your goals. 
              Join 10,000+ students transforming their careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2">
                Start Learning Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/courses" className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Browse Courses
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose GUIDESOFT?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Cutting-edge platform combining AI technology with expert-curated content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-indigo-400">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories Preview */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Our Courses</h2>
            <p className="text-slate-400">Industry-relevant curriculum designed for 2026</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-indigo-400/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
                      Beginner
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      8 Weeks
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition">
                    AI Fundamentals for Beginners
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Learn the basics of artificial intelligence and machine learning
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">4.9</span>
                    </div>
                    <Link href="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-all">
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl border border-indigo-500/20">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of students already learning with AI-powered guidance
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">G</span>
                </div>
                <span className="text-lg font-bold">GUIDESOFT</span>
              </div>
              <p className="text-sm text-slate-400">
                AI-powered learning platform for the next generation of tech professionals
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/courses" className="hover:text-white transition">Courses</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/mentors" className="hover:text-white transition">Mentors</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-sm text-slate-400">
            © 2026 GUIDESOFT TRAINING. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
