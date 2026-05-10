'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Clock, CheckCircle, XCircle, ArrowRight, RotateCcw,
  Trophy, Star, Award, ChevronRight, Sparkles
} from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Simulate fetching quiz data
    setTimeout(() => {
      setQuiz({
        title: 'AI Fundamentals Quiz',
        description: 'Test your knowledge of AI basics',
        totalQuestions: 5,
        passingScore: 70,
        timeLimit: 600, // 10 minutes
        questions: [
          {
            id: 1,
            question: 'What does AI stand for?',
            options: [
              'Automated Intelligence',
              'Artificial Intelligence',
              'Advanced Integration',
              'Algorithmic Processing',
            ],
            correctAnswer: 1,
            explanation: 'AI stands for Artificial Intelligence, which is the simulation of human intelligence by machines.',
          },
          {
            id: 2,
            question: 'Which of these is NOT a type of machine learning?',
            options: [
              'Supervised Learning',
              'Unsupervised Learning',
              'Reinforcement Learning',
              'Deterministic Learning',
            ],
            correctAnswer: 3,
            explanation: 'Deterministic Learning is not a recognized type of machine learning. The three main types are Supervised, Unsupervised, and Reinforcement Learning.',
          },
          {
            id: 3,
            question: 'What is a neural network inspired by?',
            options: [
              'Computer circuits',
              'Human brain structure',
              'Mathematical equations',
              'Data structures',
            ],
            correctAnswer: 1,
            explanation: 'Neural networks are inspired by the structure and function of the human brain, with interconnected nodes (neurons).',
          },
          {
            id: 4,
            question: 'Which programming language is most commonly used for AI?',
            options: [
              'Java',
              'C++',
              'Python',
              'Ruby',
            ],
            correctAnswer: 2,
            explanation: 'Python is the most popular language for AI due to its simplicity and extensive libraries like TensorFlow and PyTorch.',
          },
          {
            id: 5,
            question: 'What is the purpose of training data in machine learning?',
            options: [
              'To test the final model',
              'To teach the model patterns',
              'To store results',
              'To visualize data',
            ],
            correctAnswer: 1,
            explanation: 'Training data is used to teach the model patterns and relationships so it can make predictions on new data.',
          },
        ],
      });
    }, 500);

    // GSAP animations
    gsap.from('.quiz-container', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  // Timer countdown
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    
    gsap.to('.quiz-start-screen', {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      onComplete: () => {
        gsap.from('.question-card', {
          opacity: 0,
          x: 50,
          duration: 0.5,
          ease: 'power3.out',
        });
      },
    });
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);

    // Animate selection
    gsap.fromTo('.selected-option', {
      scale: [1, 1.05, 1],
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      gsap.to('.question-card', {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          setCurrentQuestion(currentQuestion + 1);
          gsap.fromTo('.question-card', {
            opacity: 0,
            x: 50,
            to: {
              opacity: 1,
              x: 0,
              duration: 0.3,
            },
          });
        },
      });
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);

    // Animate results
    gsap.from('.result-card', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });

    // Confetti if passed
    if (finalScore >= quiz.passingScore) {
      createConfetti();
    }
  };

  const createConfetti = () => {
    const colors = ['#10b981', '#6366f1', '#f59e0b', '#ec4899'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confetti);

      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: `random(-50, 50)`,
        rotation: `random(0, 360)`,
        duration: `random(2, 3)`,
        ease: 'power1.out',
        onComplete: () => confetti.remove(),
      });
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeRemaining(600);
    setQuizStarted(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6">
        <div className="quiz-container max-w-2xl w-full">
          <div className="quiz-start-screen glass-card rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">{quiz.title}</h1>
              <p className="text-slate-400">{quiz.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Clock className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Time Limit</p>
                <p className="text-white font-semibold">{formatTime(quiz.timeLimit)}</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Questions</p>
                <p className="text-white font-semibold">{quiz.totalQuestions}</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Passing Score</p>
                <p className="text-white font-semibold">{quiz.passingScore}%</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Multiple choice questions</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>You can review answers before submitting</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Immediate feedback provided</span>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (quizCompleted) {
    const passed = score >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6">
        <div className="quiz-container max-w-2xl w-full">
          <div className={`result-card glass-card rounded-2xl border ${passed ? 'border-green-500/30' : 'border-red-500/30'} p-8`}>
            <div className="text-center mb-8">
              {passed ? (
                <>
                  <Award className="w-20 h-20 text-green-400 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">Quiz Passed! 🎉</h1>
                  <p className="text-green-400">Congratulations! You've successfully completed the quiz.</p>
                </>
              ) : (
                <>
                  <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-white mb-2">Keep Learning</h1>
                  <p className="text-red-400">You need {quiz.passingScore}% to pass. Review the material and try again.</p>
                </>
              )}
            </div>

            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-indigo-500 mb-4">
                <span className="text-4xl font-bold text-white">{score}%</span>
              </div>
              <p className="text-slate-400">
                {selectedAnswers.filter((a, i) => a === quiz.questions[i].correctAnswer).length} out of {quiz.questions.length} correct
              </p>
            </div>

            {/* Question Review */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Review Answers</h3>
              {quiz.questions.map((q: any, index: number) => {
                const isCorrect = selectedAnswers[index] === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">{q.question}</p>
                        <p className="text-sm text-slate-400">
                          Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {q.options[selectedAnswers[index]]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-400 mt-1">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                        )}
                        <p className="text-xs text-slate-500 mt-2">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <Link
                href="/dashboard"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Continue Learning
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-6 py-12">
      <div className="quiz-container max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
            <p className="text-sm text-slate-400">Question {currentQuestion + 1} of {quiz.questions.length}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeRemaining < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white'}`}>
            <Clock className="w-5 h-5" />
            <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="question-card glass-card rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold text-white mb-6">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`selected-option w-full p-4 rounded-xl border text-left transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {quiz.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentQuestion ? 'bg-indigo-500' :
                    selectedAnswers[index] !== undefined ? 'bg-green-500' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
