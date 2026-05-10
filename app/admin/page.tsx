'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Users, BookOpen, DollarSign, TrendingUp, 
  BarChart3, Settings, Shield, Bell, Search,
  Plus, Edit, Trash2, Eye, MoreVertical
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching admin stats
    setTimeout(() => {
      setStats({
        totalUsers: 10234,
        activeSubscriptions: 3456,
        monthlyRevenue: 342000,
        totalCourses: 42,
        completionRate: 78,
        averageRating: 4.8,
        newUsersToday: 45,
        revenueGrowth: 12.5,
      });
    }, 500);

    // GSAP animations
    gsap.from('.admin-sidebar', {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.from('.stat-card', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.2,
    });

    gsap.from('.content-section', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.4,
    });
  }, []);

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Professional', joined: '2 hours ago', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Starter', joined: '5 hours ago', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', plan: 'Enterprise', joined: '1 day ago', status: 'active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', plan: 'Professional', joined: '2 days ago', status: 'trial' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', plan: 'Starter', joined: '3 days ago', status: 'inactive' },
  ];

  const recentCourses = [
    { id: 1, title: 'AI Fundamentals', students: 2543, rating: 4.9, revenue: '$125,000', status: 'published' },
    { id: 2, title: 'Full-Stack JavaScript', students: 1876, rating: 4.8, revenue: '$98,000', status: 'published' },
    { id: 3, title: 'AWS Solutions Architect', students: 1234, rating: 4.9, revenue: '$87,000', status: 'published' },
    { id: 4, title: 'Deep Learning Specialist', students: 987, rating: 4.8, revenue: '$65,000', status: 'draft' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="admin-sidebar w-64 min-h-screen bg-slate-900/50 border-r border-white/5 p-6 fixed left-0 top-0">
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>

        <nav className="space-y-2">
          {[
            { id: 'overview', icon: <BarChart3 className="w-5 h-5" />, label: 'Overview' },
            { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Users' },
            { id: 'courses', icon: <BookOpen className="w-5 h-5" />, label: 'Courses' },
            { id: 'revenue', icon: <DollarSign className="w-5 h-5" />, label: 'Revenue' },
            { id: 'analytics', icon: <TrendingUp className="w-5 h-5" />, label: 'Analytics' },
            { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors">
            <Eye className="w-5 h-5" />
            <span className="font-medium">View as Student</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your learning platform</p>
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
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Users className="w-6 h-6" />, label: 'Total Users', value: stats?.totalUsers.toLocaleString(), change: '+12%', color: 'from-blue-500 to-cyan-500' },
            { icon: <DollarSign className="w-6 h-6" />, label: 'Monthly Revenue', value: `$${(stats?.monthlyRevenue / 1000).toFixed(0)}K`, change: `+${stats?.revenueGrowth}%`, color: 'from-green-500 to-emerald-500' },
            { icon: <BookOpen className="w-6 h-6" />, label: 'Active Courses', value: stats?.totalCourses, change: '+3', color: 'from-purple-500 to-pink-500' },
            { icon: <TrendingUp className="w-6 h-6" />, label: 'Completion Rate', value: `${stats?.completionRate}%`, change: '+5%', color: 'from-yellow-500 to-orange-500' },
          ].map((stat, index) => (
            <div key={index} className="stat-card glass-card p-6 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <span className="text-sm text-green-400 font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="content-section glass-card rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Users</h2>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>

            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      user.status === 'trial' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {user.status}
                    </span>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Courses */}
          <div className="content-section glass-card rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Courses</h2>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Course
              </button>
            </div>

            <div className="space-y-3">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">{course.title}</p>
                      <span className={`px-2 py-1 rounded text-xs ${
                        course.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{course.students.toLocaleString()} students</span>
                      <span>⭐ {course.rating}</span>
                      <span>{course.revenue}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-section mt-8 glass-card rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: <Plus className="w-6 h-6" />, label: 'Create Course', action: 'Create a new course' },
              { icon: <Users className="w-6 h-6" />, label: 'Manage Users', action: 'View all users' },
              { icon: <DollarSign className="w-6 h-6" />, label: 'View Revenue', action: 'Financial reports' },
              { icon: <Settings className="w-6 h-6" />, label: 'Settings', action: 'Platform configuration' },
            ].map((action, index) => (
              <button
                key={index}
                className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 rounded-xl transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{action.label}</h3>
                <p className="text-sm text-slate-400">{action.action}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
