'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Award, Download, Share2, CheckCircle, Star, 
  Calendar, User, Trophy, ArrowLeft, Sparkles
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Simulate fetching certificate data
    setTimeout(() => {
      setCertificate({
        id: 'CERT-2026-001234',
        courseName: 'AI Fundamentals for Beginners',
        studentName: 'John Doe',
        completionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        instructor: 'Dr. Sarah Chen',
        duration: '4 weeks',
        score: '95%',
        issueDate: new Date().toISOString(),
        verificationUrl: `https://guidesoft-training.com/verify/${courseId}`,
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Placeholder
      });
      setLoading(false);
    }, 800);

    // GSAP animations
    gsap.from('.certificate-container', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.certificate-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.3,
    });

    gsap.from('.action-button', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Confetti effect
    createConfetti();
  }, []);

  const createConfetti = () => {
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: `random(-100, 100)`,
        rotation: `random(0, 720)`,
        duration: `random(2, 4)`,
        ease: 'power1.out',
        onComplete: () => confetti.remove(),
      });
    }
  };

  const downloadCertificate = () => {
    setDownloading(true);
    
    // Create PDF certificate
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Background gradient
    const gradient = doc.linearGradient(0, 0, 297, 210);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#a855f7');
    doc.setFillColor(gradient);
    doc.rect(0, 0, 297, 210, 'F');

    // White card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 20, 257, 170, 5, 5, 'F');

    // Border
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(2);
    doc.roundedRect(25, 25, 247, 160, 3, 3, 'S');

    // Title
    doc.setFontSize(40);
    doc.setTextColor(99, 102, 241);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE', 148.5, 60, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('OF COMPLETION', 148.5, 75, { align: 'center' });

    // Presented to
    doc.setFontSize(16);
    doc.setTextColor(150, 150, 150);
    doc.text('This is to certify that', 148.5, 95, { align: 'center' });

    // Student name
    doc.setFontSize(32);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.studentName, 148.5, 110, { align: 'center' });

    // Course name
    doc.setFontSize(18);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', 148.5, 125, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setTextColor(99, 102, 241);
    doc.setFont('helvetica', 'bold');
    doc.text(certificate.courseName, 148.5, 138, { align: 'center' });

    // Details
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Duration: ${certificate.duration}`, 60, 160);
    doc.text(`Score: ${certificate.score}`, 148.5, 160, { align: 'center' });
    doc.text(`Date: ${certificate.completionDate}`, 237, 160, { align: 'right' });

    // Instructor signature
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text('Instructor:', 60, 175);
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'bolditalic');
    doc.text(certificate.instructor, 60, 182);

    // Verification
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(`Certificate ID: ${certificate.id}`, 148.5, 175, { align: 'center' });
    doc.text(`Verify at: ${certificate.verificationUrl}`, 148.5, 180, { align: 'center' });

    // Save PDF
    doc.save(`${certificate.courseName.replace(/\s+/g, '_')}_Certificate.pdf`);
    
    setDownloading(false);

    // Success animation
    gsap.to('.download-button', {
      scale: [1, 1.1, 1],
      duration: 0.4,
      ease: 'back.out(1.7)',
    });
  };

  const shareCertificate = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I just completed ${certificate.courseName}!`,
          text: `Check out my certificate from GUIDESOFT TRAINING`,
          url: certificate.verificationUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(certificate.verificationUrl);
      alert('Verification link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Generating your certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-6 py-12">
      <div className="certificate-container max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Course Completed</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-slate-400">
            You've earned your certificate
          </p>
        </div>

        {/* Certificate Card */}
        <div className="certificate-card glass-card rounded-3xl border-2 border-indigo-500/30 p-12 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                CERTIFICATE
              </h2>
              <p className="text-2xl text-slate-400">of Completion</p>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-6">
              <p className="text-lg text-slate-400">This is to certify that</p>
              
              <h3 className="text-4xl font-bold text-white">{certificate.studentName}</h3>
              
              <p className="text-lg text-slate-400">has successfully completed the course</p>
              
              <h4 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {certificate.courseName}
              </h4>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Duration</p>
                  <p className="text-white font-semibold">{certificate.duration}</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Score</p>
                  <p className="text-white font-semibold">{certificate.score}</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Completed</p>
                  <p className="text-white font-semibold">{certificate.completionDate}</p>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-2">Instructor</p>
                <p className="text-xl font-semibold text-white italic">{certificate.instructor}</p>
              </div>

              {/* Certificate ID */}
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">Certificate ID: {certificate.id}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Verify at: <span className="text-indigo-400">{certificate.verificationUrl}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadCertificate}
            disabled={downloading}
            className="action-button px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Certificate
              </>
            )}
          </button>

          <button
            onClick={shareCertificate}
            className="action-button px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share on LinkedIn
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-12 glass-card rounded-2xl border border-white/10 p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            What's Next?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/courses"
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all group"
            >
              <h4 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                Continue Learning
              </h4>
              <p className="text-sm text-slate-400">Explore more courses in your learning path</p>
            </Link>
            <Link
              href="/dashboard"
              className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all group"
            >
              <h4 className="text-white font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                View Progress
              </h4>
              <p className="text-sm text-slate-400">Track your overall learning journey</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
