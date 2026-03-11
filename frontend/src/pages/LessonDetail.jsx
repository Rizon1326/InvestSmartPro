import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { useLesson } from '../hooks/useLessons';
import { DifficultyBadge } from '../components/ui/Badge';
import { PageSpinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';

const difficultyGradient = {
  beginner: 'from-emerald-500 to-green-600',
  intermediate: 'from-amber-500 to-orange-500',
  advanced: 'from-red-500 to-rose-600',
};

export function LessonDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lesson, loading, error } = useLesson(slug);

  if (loading) return <PageSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!lesson) return <ErrorState message="Lesson not found" />;

  const gradient = difficultyGradient[lesson.difficulty] || 'from-primary-500 to-violet-600';

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/learning')}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 bg-transparent border-0 p-0 cursor-pointer font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
      </button>

      {/* Article */}
      <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Hero header */}
        <div className={`bg-gradient-to-br ${gradient} px-6 py-10 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-white rounded-full" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <DifficultyBadge level={lesson.difficulty} />
            </div>
            <h1 className="text-2xl font-black leading-tight mb-3">{lesson.title}</h1>
            <p className="text-white/80 text-sm leading-relaxed mb-5">{lesson.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <Clock className="w-4 h-4" />
                {lesson.duration_minutes} min read
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                {lesson.difficulty} level
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-10 py-8 prose">
          <Markdown>{lesson.content}</Markdown>
        </div>

        {/* Footer nav */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => navigate('/learning')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-transparent border-0 p-0 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all lessons
          </button>
        </div>
      </article>
    </div>
  );
}


