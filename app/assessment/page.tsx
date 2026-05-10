'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { 
  Sparkles, Brain, Zap, Target, ArrowRight, CheckCircle,
  Clock, Star, TrendingUp, Award, ChevronRight
} from 'lucide-react';

export default function SkillAssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: 1,
      question: 'What is your current experience level with technology?',
      options: [
        { value: 'beginner', label: 'Complete Beginner', description: 'I\'m new to tech' },
        { value: 'basic', label: 'Basic Knowledge', description: 'I know some basics' },
        { value: 'intermediate', label: 'Intermediate', description: 'I have some experience' },
        { value: 'advanced', label: 'Advanced', description: 'I work in tech' },
      ],
    },
    {
      id: 2,
      question: 'Which area interests you most?',
      options: [
        { value: 'ai_ml', label: 'AI & Machine Learning', icon: '🤖' },
        { value: 'web_dev', label: 'Web Development', icon: '💻' },
        { value: 'cloud', label: 'Cloud Computing', icon: '☁️' },
        { value: 'cybersecurity', label: 'Cybersecurity', icon: '🔒' },
        { value: 'data_science', label: 'Data Science', icon: '📊' },
        { value: 'ux_ui', label: 'UX/UI Design', icon: '🎨' },
      ],
    },
    {
      id: 3,
      question: 'What is your primary goal?',
      options: [
        { value: 'career_change', label: 'Career Change', description: 'Switch to tech career' },
        { value: 'skill_upgrade', label: 'Skill Upgrade', description: 'Advance current skills' },
        { value: 'certification', label: 'Get Certified', description: 'Earn credentials' },
        { value: 'personal_project', label: 'Build Projects', description: 'Create something cool' },
      ],
    },
    {
      id: 4,
      question: 'How much time can you commit weekly?',
      options: [
        { value: '5_hours', label: '5 hours/week', description: 'Casual learning' },
        { value: '10_hours', label: '10 hours/week', description: 'Part-time study' },
        { value: '20_hours', label: '20 hours/week', description: 'Serious commitment' },
        { value: '40_hours', label: '40+ hours/week', description: 'Full-time focus' },
      ],
    },
    {
      id: 5,
      question: 'What\'s your preferred learning style?',
      options: [
        { value: 'video', label: 'Video Tutorials', icon: '🎥' },
        { value: 'hands_on', label: 'Hands-on Projects', icon: '🛠️' },
        { value: 'reading', label: 'Reading & Theory', icon: '📚' },
        { value: 'interactive', label: 'Interactive Coding', icon: '⌨️' },
      ],
    },
  ];

  useEffect(() => {
    // GSAP animations
    gsap.from('.assessment-container', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.question-card', {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'back.out(1.7)',
    });

    gsap.from('.option-button', {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.2,
    });

    // Progress bar animation
    gsap.from('.progress-fill', {
      width: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [step]);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[step - 1].id]: value });
    
    // Animate selection
    gsap.to('.selected-option', {
      scale: [1, 1.05, 1],
      duration: 0.3,
      ease: 'power2.out',
    });

    // Move to next step after delay
    setTimeout(() => {
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        generateRecommendation();
      }
    }, 500);
  };

  const generateRecommendation = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate personalized recommendation based on answers
    const recommendation = {
      level: answers[1] === 'beginner' ? 'Foundation' : 
             answers[1] === 'basic' ? 'Intermediate' : 'Advanced',
      category: answers[2],
      path: getPersonalizedPath(answers),
      estimatedDuration: getEstimatedDuration(answers),
      courses: getRecommendedCourses(answers),
    };
    
    setResult(recommendation);
    setLoading(false);

    // Animate result
    gsap.from('.result-card', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const getPersonalizedPath = (answers: any) => {
    const paths: any = {
      ai_ml: 'AI Fundamentals → Machine Learning → Deep Learning → LLM Engineer',
      web_dev: 'HTML/CSS Basics → JavaScript → React → Full-Stack Development',
      cloud: 'Cloud Basics → AWS/Azure → Cloud Architecture → DevOps',
      cybersecurity: 'Security Fundamentals → Network Security → Ethical Hacking → Security Architect',
      data_science: 'Python Basics → Data Analysis → Machine Learning → Data Scientist',
      ux_ui: 'Design Principles → Figma → UX Research → UI/UX Designer',
    };
    return paths[answers[2]] || 'Custom Learning Path';
  };

  const getEstimatedDuration = (answers: any) => {
    const hours = parseInt(answers[4]);
    const baseWeeks = 12;
    return Math.ceil(baseWeeks * (5 / hours)) + ' weeks';
  };

  const getRecommendedCourses = (answers: any) => {
    const courseMap: any = {
      ai_ml: [
        { title: 'AI Fundamentals for Beginners', level: 'Foundation', duration: '4 weeks' },
        { title: 'Machine Learning Engineer Path', level: 'Intermediate', duration: '8 weeks' },
        { title: 'Deep Learning Specialist', level: 'Advanced', duration: '10 weeks' },
      ],
      web_dev: [
        { title: 'Web Development Essentials', level: 'Foundation', duration: '6 weeks' },
        { title: 'Full-Stack JavaScript Developer', level: 'Intermediate', duration: '12 weeks' },
        { title: 'System Design & Architecture', level: 'Advanced', duration: '10 weeks' },
      ],
      cloud: [
        { title: 'Cloud Computing Basics', level: 'Foundation', duration: '4 weeks' },
        { title: 'AWS Solutions Architect', level: 'Intermediate', duration: '10 weeks' },
        { title: 'Cloud Native Development', level: 'Advanced', duration: '8 weeks' },
      ],
    };
    return courseMap[answers[2]] || [];
  };

  const progress = (step / questions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
            <Brain className="absolute inset-0 m-auto w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Analyzing Your Profile...</h2>
          <p className="text-slate-400">Creating your personalized learning path</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">Assessment Complete</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Personalized Learning Path
            </h1>
            <p className="text-xl text-slate-400">
              Based on your goals and experience level
            </p>
          </div>

          {/* Result Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="result-card glass-card p-6 rounded-2xl border border-white/10">
              <Target className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Your Level</h3>
              <p className="text-2xl font-bold text-indigo-400">{result.level}</p>
            </div>

            <div className="result-card glass-card p-6 rounded-2xl border border-white/10">
              <Clock className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Estimated Time</h3>
              <p className="text-2xl font-bold text-purple-400">{result.estimatedDuration}</p>
            </div>

            <div className="result-card glass-card p-6 rounded-2xl border border-white/10">
              <TrendingUp className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Career Path</h3>
              <p className="text-lg font-bold text-green-400 capitalize">{result.category.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Learning Path */}
          <div className="result-card glass-card rounded-2xl border border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              Your Learning Journey
            </h2>
            
            <div className="space-y-4">
              {result.path.split(' → ').map((stage: string, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white font-medium">{stage}</p>
                  </div>
                  {index < result.path.split(' → ').length - 1 && (
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="result-card glass-card rounded-2xl border border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-400" />
              Recommended Courses
            </h2>
            
            <div className="space-y-4">
              {result.courses.map((course: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{course.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded">{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-slate-400">
              Or{' '}
              <button onClick={() => window.location.reload()} className="text-indigo-400 hover:text-indigo-300">
                retake assessment
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6">
      <div className="assessment-container w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Question {step} of {questions.length}</span>
            <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="progress-fill h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card glass-card rounded-2xl border border-white/10 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{questions[step - 1].question}</h2>
            </div>
          </div>

          <div className="space-y-3">
            {questions[step - 1].options.map((option: any, index: number) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="option-button w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-4">
                  {option.icon && <span className="text-2xl">{option.icon}</span>}
                  <div className="flex-1">
                    <p className="text-white font-semibold group-hover:text-indigo-400 transition-colors">
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-slate-400 mt-1">{option.description}</p>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index + 1 === step ? 'bg-indigo-500' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
