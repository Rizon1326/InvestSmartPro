import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';
import { useLesson } from '../hooks/useLessons';
import { DifficultyBadge } from '../components/ui/Badge';
import { PageSpinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';

export function LessonDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lesson, loading, error } = useLesson(slug);

  if (loading) return <PageSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!lesson) return <ErrorState message="Lesson not found" />;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/learning')}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 bg-transparent border-0 p-0 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6" />
            <DifficultyBadge level={lesson.difficulty} />
          </div>
          <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-emerald-100 text-sm">{lesson.description}</p>
          <div className="flex items-center gap-1 mt-4 text-emerald-200 text-sm">
            <Clock className="w-4 h-4" />
            {lesson.duration_minutes} minutes read
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 prose">
          <Markdown>{lesson.content}</Markdown>
        </div>
      </div>
    </div>
  );
}
