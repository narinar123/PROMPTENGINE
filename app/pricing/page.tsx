'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { CheckCircle, Star, Zap, Crown, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // GSAP animations
    gsap.from('.pricing-hero', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.pricing-card', {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });

    gsap.from('.feature-item', {
      opacity: 0,
      x: -20,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Floating animation for popular badge
    gsap.to('.popular-badge', {
      y: 'random(-5, 5)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  const handleSubscribe = async (tier: string) => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        router.push('/login?redirect=/pricing');
        return;
      }

      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tier }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 49 : 39,
      originalPrice: 49,
      description: 'Perfect for beginners starting their tech journey',
      icon: <Star className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Access to Foundation & Intermediate courses',
        '1 personalized learning path',
        'Basic AI course recommendations',
        'Community forum access',
        'Email support (48h response)',
        'Certificate of completion',
        'Mobile app access',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 99 : 79,
      originalPrice: 99,
      description: 'Most popular for serious learners',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-indigo-500 to-purple-500',
      features: [
        'Everything in Starter, plus:',
        'Access to ALL courses (Foundation to Advanced)',
        'Unlimited personalized learning paths',
        'Advanced AI curriculum generator',
        'Priority support (24h response)',
        '1-on-1 monthly mentorship call (30 min)',
        'Project reviews by industry experts',
        'Resume & LinkedIn optimization',
        'Job placement assistance',
        'Downloadable resources',
      ],
      cta: 'Start Professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 299 : 249,
      originalPrice: 299,
      description: 'For teams and organizations',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Everything in Professional, plus:',
        'Expert & Master level courses',
        'Weekly 1-on-1 mentorship calls (60 min)',
        'Custom enterprise training programs',
        'Dedicated account manager',
        'Team collaboration tools (up to 10 users)',
        'White-label certificates',
        'API access for integrations',
        'Quarterly strategy sessions',
        'Priority feature requests',
        'Custom content creation',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const savings = billingCycle === 'yearly' ? 20 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pricing-hero pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Premium Learning Platform</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your Learning Plan
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Invest in your future with AI-powered education. No free trials, premium quality only.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-white/5 rounded-xl border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                Save {savings}%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card relative glass-card rounded-2xl border ${
                  plan.popular ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20 scale-105' : 'border-white/10'
                } p-8 transition-all hover:scale-105`}
              >
                {plan.popular && (
                  <div className="popular-badge absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-slate-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="mt-2">
                      <span className="text-sm text-slate-500 line-through">${plan.originalPrice}/mo</span>
                      <span className="ml-2 text-sm text-green-400">Save ${plan.originalPrice - plan.price}/mo</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-item flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                  }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: 'Why no free trial?',
                answer: 'We believe in premium quality education. Our courses are carefully crafted by industry experts and powered by AI. We offer a 7-day money-back guarantee instead.',
              },
              {
                question: 'Can I switch plans later?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated automatically.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards through Stripe. Enterprise plans can also pay via invoice.',
              },
              {
                question: 'Is there a refund policy?',
                answer: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied, contact us within 7 days for a full refund.',
              },
              {
                question: 'Do I get lifetime access?',
                answer: 'Yes! As long as your subscription is active, you have unlimited access to all courses in your plan tier.',
              },
            ].map((faq, index) => (
              <div key={index} className="glass-card rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl border border-indigo-500/20 p-12 text-center bg-gradient-to-br from-indigo-600/10 to-purple-600/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Join thousands of students already transforming their careers
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
