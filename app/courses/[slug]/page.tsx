'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Play, Clock, Star, Users, BookOpen, CheckCircle, 
  Lock, ArrowLeft, Share2, Bookmark, Download,
  ChevronRight, Trophy, Zap
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate fetching course data (replace with actual API call)
    setTimeout(() => {
      setCourse({
        title: 'AI Fundamentals for Beginners',
        slug: 'ai-fundamentals-beginners',
        description: 'Master the basics of artificial intelligence and machine learning. Perfect starting point for your AI journey with hands-on projects and real-world applications.',
        category: 'ai_ml',
        level: 'Beginner',
        duration: '4 weeks',
        rating: 4.9,
        students: 2543,
        instructor: 'Dr. Sarah Chen',
        instructorBio: 'AI Research Scientist with 10+ years experience at Google Brain',
        price: 'Included in subscription',
        thumbnail: '🤖',
        modules: [
          {
            id: 1,
            title: 'Introduction to AI',
            lessons: [
              { id: 1, title: 'What is Artificial Intelligence?', duration: '15 min', type: 'video', free: true, completed: false },
              { id: 2, title: 'History of AI', duration: '20 min', type: 'video', free: true, completed: false },
              { id: 3, title: 'AI vs Machine Learning vs Deep Learning', duration: '25 min', type: 'video', free: false, completed: false },
            ],
          },
          {
            id: 2,
            title: 'Python for AI',
            lessons: [
              { id: 4, title: 'Setting Up Python Environment', duration: '30 min', type: 'video', free: false, completed: false },
              { id: 5, title: 'NumPy Basics', duration: '45 min', type: 'interactive', free: false, completed: false },
              { id: 6, title: 'Data Manipulation with Pandas', duration: '60 min', type: 'code_challenge', free: false, completed: false },
            ],
          },
          {
            id: 3,
            title: 'Machine Learning Basics',
            lessons: [
              { id: 7, title: 'Supervised Learning', duration: '40 min', type: 'video', free: false, completed: false },
              { id: 8, title: 'Unsupervised Learning', duration: '35 min', type: 'video', free: false, completed: false },
              { id: 9, title: 'Your First ML Model', duration: '90 min', type: 'project', free: false, completed: false },
            ],
          },
        ],
        learningOutcomes: [
          'Understand core AI concepts and terminology',
          'Learn Python programming basics for AI',
          'Build your first machine learning model',
          'Understand ethics in AI development',
          'Apply AI techniques to real-world problems',
        ],
        prerequisites: ['Basic computer skills', 'High school math'],
        includes: [
          '24 hours of video content',
          '12 interactive exercises',
          '3 hands-on projects',
          'Certificate of completion',
          'Lifetime access',
          'Community support',
        ],
      });
      setLoading(false);
    }, 500);

    // GSAP animations
    gsap.from('.course-hero', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.module-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  const handleEnroll = () => {
    // Animation before navigation
    gsap.to('.enroll-button', {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setEnrolled(true);
        router.push(`/learn/${slug}/lesson/1`);
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Back Navigation */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="course-hero pt-12 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-slate-400 mb-6">
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">{course.rating}</span>
                  <span className="text-slate-500">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">Taught by {course.instructor}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="glass-card p-6 rounded-xl border border-white/10 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{course.instructor}</h3>
                    <p className="text-slate-400 text-sm">{course.instructorBio}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/10 mb-6">
                <div className="flex gap-8">
                  {['overview', 'curriculum', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-sm font-medium transition-colors relative ${
                        activeTab === tab
                          ? 'text-indigo-400'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">What You'll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Prerequisites</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.prerequisites.map((prereq: string, index: number) => (
                        <span key={index} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 text-sm">
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Course Includes */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">This Course Includes</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.includes.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-indigo-400" />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  {course.modules.map((module: any) => (
                    <div key={module.id} className="module-card glass-card rounded-xl border border-white/10 overflow-hidden">
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                          <span className="text-sm text-slate-400">{module.lessons.length} lessons</span>
                        </div>
                      </div>
                      <div className="divide-y divide-white/5">
                        {module.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                              {lesson.free ? (
                                <Play className="w-5 h-5 text-indigo-400" />
                              ) : (
                                <Lock className="w-5 h-5 text-slate-500" />
                              )}
                              <span className="text-slate-300">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">{lesson.duration}</span>
                              <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-400 capitalize">
                                {lesson.type.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-bold text-white mb-2">Reviews Coming Soon</h3>
                  <p className="text-slate-400">Be the first to review this course!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Enrollment Card */}
                <div className="glass-card rounded-2xl border border-white/10 p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{course.thumbnail}</div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {course.price}
                    </div>
                    <p className="text-sm text-slate-400">with subscription</p>
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="enroll-button w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all mb-4 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    {enrolled ? 'Continue Learning' : 'Enroll Now'}
                  </button>

                  <div className="space-y-3 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Full lifetime access
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Access on mobile and desktop
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Certificate of completion
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
