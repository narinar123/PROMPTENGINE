'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Maximize, BookOpen, Code, CheckCircle, ArrowLeft,
  ArrowRight, MessageSquare, Download, Bookmark,
  Lightbulb, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;
  
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  const [completed, setCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Simulate fetching lesson data
    setTimeout(() => {
      setLesson({
        id: parseInt(lessonId),
        title: 'What is Artificial Intelligence?',
        type: 'video', // video, text, interactive, code_challenge, quiz, project
        duration: '15 min',
        content: {
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
          transcript: `Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.

In this lesson, we'll explore:
1. Definition of AI
2. Types of AI (Narrow vs General)
3. Real-world applications
4. Future of AI

AI is already transforming industries from healthcare to finance, and understanding its fundamentals is crucial for anyone entering the tech field today.`,
          code: `# Python example - Simple AI concept
class AIModel:
    def __init__(self):
        self.knowledge = []
    
    def learn(self, data):
        self.knowledge.append(data)
        print(f"Learned: {data}")
    
    def predict(self, input_data):
        # Simple prediction logic
        return "Prediction based on learned patterns"

# Create and train model
model = AIModel()
model.learn("Pattern 1")
model.learn("Pattern 2")
prediction = model.predict("New data")
print(prediction)`,
        },
        resources: [
          { name: 'Lesson Slides.pdf', size: '2.3 MB' },
          { name: 'Code Examples.zip', size: '156 KB' },
          { name: 'Additional Reading.pdf', size: '890 KB' },
        ],
        nextLesson: { id: 2, title: 'History of AI' },
        prevLesson: null,
      });
      setLoading(false);
    }, 500);

    // GSAP animations
    gsap.from('.lesson-container', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.from('.sidebar-item', {
      x: -20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, [lessonId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const markComplete = () => {
    setCompleted(true);
    
    // Success animation
    gsap.to('.complete-button', {
      scale: [1, 1.2, 1],
      duration: 0.4,
      ease: 'back.out(1.7)',
    });

    // Auto-advance after delay
    setTimeout(() => {
      if (lesson.nextLesson) {
        router.push(`/learn/${courseId}/lesson/${lesson.nextLesson.id}`);
      }
    }, 2000);
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Main Content */}
      <div className="lesson-container flex-1">
        {/* Header */}
        <header className="bg-slate-900/50 border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/courses/${courseId}`} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-white">{lesson.title}</h1>
                <p className="text-sm text-slate-400">{lesson.duration}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Video Player or Content */}
        <div className="bg-black aspect-video relative group">
          {lesson.type === 'video' && (
            <>
              <video
                ref={videoRef}
                src={lesson.content.videoUrl}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Custom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div className="h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                    </button>
                    <button onClick={skipBackward} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <SkipBack className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={skipForward} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <SkipForward className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Volume2 className="w-5 h-5 text-white" />
                    </button>
                    <span className="text-sm text-white">
                      {videoRef.current ? Math.floor(videoRef.current.currentTime / 60) : 0}:
                      {videoRef.current ? String(Math.floor(videoRef.current.currentTime % 60)).padStart(2, '0') : '00'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Maximize className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {lesson.type === 'text' && (
            <div className="w-full h-full overflow-y-auto p-12 bg-slate-900">
              <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-3xl font-bold text-white mb-6">{lesson.title}</h1>
                <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                  {lesson.content.transcript}
                </div>
              </div>
            </div>
          )}

          {lesson.type === 'code_challenge' && (
            <div className="w-full h-full flex">
              <div className="flex-1 p-6 bg-slate-900 overflow-y-auto">
                <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
                <p className="text-slate-300 mb-6">Complete the code challenge below:</p>
                <pre className="bg-slate-800 p-4 rounded-lg text-sm text-slate-300 overflow-x-auto">
                  {lesson.content.code}
                </pre>
              </div>
              <div className="flex-1 p-6 bg-slate-950 border-l border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Your Code</h3>
                <textarea
                  ref={editorRef}
                  className="w-full h-[calc(100%-2rem)] bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="// Write your code here..."
                  defaultValue={lesson.content.code}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tabs Section */}
        <div className="bg-slate-900/50 border-t border-white/5">
          <div className="flex border-b border-white/5">
            {[
              { id: 'content', label: 'Content', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'notes', label: 'Notes', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'resources', label: 'Resources', icon: <Download className="w-4 h-4" /> },
              { id: 'discussion', label: 'Discussion', icon: <MessageSquare className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <div className="max-w-4xl">
                <h3 className="text-xl font-bold text-white mb-4">Lesson Transcript</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                    {lesson.content.transcript}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Your Notes</h3>
                <textarea
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Take notes here..."
                />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white mb-4">Downloadable Resources</h3>
                {lesson.resources.map((resource: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-indigo-400" />
                      <div>
                        <p className="text-white font-medium">{resource.name}</p>
                        <p className="text-sm text-slate-400">{resource.size}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No discussions yet</h3>
                <p className="text-slate-400">Be the first to ask a question!</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-slate-900 border-t border-white/5 px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <button
              disabled={!lesson.prevLesson}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Lesson
            </button>

            <button
              onClick={markComplete}
              className={`complete-button flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
                completed
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30'
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Completed!
                </>
              ) : (
                <>
                  Mark as Complete
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              disabled={!lesson.nextLesson}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next Lesson
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Course Content */}
      <aside className="w-80 bg-slate-900/50 border-l border-white/5 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Course Content</h3>
          
          <div className="space-y-2">
            {[
              { id: 1, title: 'What is Artificial Intelligence?', duration: '15 min', completed: true },
              { id: 2, title: 'History of AI', duration: '20 min', completed: false, current: true },
              { id: 3, title: 'AI vs ML vs Deep Learning', duration: '25 min', completed: false },
              { id: 4, title: 'Setting Up Python', duration: '30 min', completed: false },
              { id: 5, title: 'NumPy Basics', duration: '45 min', completed: false },
            ].map((item, index) => (
              <Link
                key={item.id}
                href={`/learn/${courseId}/lesson/${item.id}`}
                className={`sidebar-item block p-3 rounded-lg transition-all ${
                  item.current
                    ? 'bg-indigo-600/20 border border-indigo-500/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                      item.current ? 'border-indigo-500' : 'border-slate-600'
                    }`} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      item.current ? 'text-indigo-400' : 'text-slate-300'
                    }`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.duration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
