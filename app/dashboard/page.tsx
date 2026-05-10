'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  BookOpen, TrendingUp, Award, Clock, Play, CheckCircle,
  Star, Calendar, Zap, ArrowRight, Bell, Search, User
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);

    // Dashboard entrance animation
    const tl = gsap.timeline();
    
    tl.from('.dashboard-sidebar', {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .from('.dashboard-header', {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.stat-card', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2')
    .from('.content-section', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.2');

    // Continuous pulse animation for notification bell
    gsap.to('.notification-bell', {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Progress bar animation
    gsap.from('.progress-bar', {
      width: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Floating cards animation
    gsap.to('.floating-card', {
      y: 'random(-10, 10)',
      duration: 'random(2, 3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        from: 'random',
      },
    });
  }, []);

  const stats = [
    { icon: <BookOpen className="w-6 h-6" />, label: 'Courses Enrolled', value: '3', color: 'from-blue-500 to-cyan-500' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Completed', value: '12', color: 'from-green-500 to-emerald-500' },
    { icon: <Clock className="w-6 h-6" />, label: 'Hours Learned', value: '48', color: 'from-purple-500 to-pink-500' },
    { icon: <Award className="w-6 h-6" />, label: 'Certificates', value: '2', color: 'from-yellow-500 to-orange-500' },
  ];

  const currentCourses = [
    {
      title: 'AI Fundamentals for Beginners',
      progress: 75,
      nextLesson: 'Neural Networks Basics',
      timeLeft: '2 hours',
    },
    {
      title: 'Full-Stack JavaScript Developer',
      progress: 45,
      nextLesson: 'React Hooks Deep Dive',
      timeLeft: '5 hours',
    },
    {
      title: 'AWS Solutions Architect',
      progress: 20,
      nextLesson: 'EC2 Instance Types',
      timeLeft: '8 hours',
    },
  ];

  const recommendedCourses = [
    {
      title: 'Machine Learning Engineer Path',
      level: 'Intermediate',
      duration: '8 weeks',
      rating: 4.9,
    },
    {
      title: 'Deep Learning Specialist',
      level: 'Advanced',
      duration: '10 weeks',
      rating: 4.8,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="dashboard-sidebar w-64 min-h-screen bg-slate-900/50 border-r border-white/5 p-6 fixed left-0 top-0">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">G</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              GUIDESOFT
            </span>
          </Link>

          <nav className="space-y-2">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: 'Dashboard', active: true },
              { icon: <Play className="w-5 h-5" />, label: 'My Courses' },
              { icon: <Award className="w-5 h-5" />, label: 'Certificates' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Schedule' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Analytics' },
              { icon: <User className="w-5 h-5" />, label: 'Profile' },
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <Link href="/billing" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-indigo-400 hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Upgrade Plan</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <header className="dashboard-header flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome back, {user?.fullName || 'Student'}! 👋
              </h1>
              <p className="text-slate-400">Continue your learning journey</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
              <button className="notification-bell relative p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card floating-card glass-card p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Courses */}
            <div className="lg:col-span-2 content-section">
              <div className="glass-card rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                  <Link href="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {currentCourses.map((course, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-slate-400">Next: {course.nextLesson}</p>
                        </div>
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium text-white transition-colors">
                          Continue
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="progress-bar h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400 whitespace-nowrap">{course.progress}%</span>
                      </div>
                      <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.timeLeft} remaining
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="content-section">
              <div className="glass-card rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recommended for You</h2>
                
                <div className="space-y-4">
                  {recommendedCourses.map((course, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                      <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded">
                          {course.level}
                        </span>
                        <span className="text-xs text-slate-400">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-white">{course.rating}</span>
                        </div>
                        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                          Enroll →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/courses" className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center text-white font-medium transition-all block">
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="content-section mt-8">
            <div className="glass-card rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl">
                    🔥
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">7 Day Streak!</h3>
                    <p className="text-slate-400">Keep learning daily to maintain your streak</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                        i < 7
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
