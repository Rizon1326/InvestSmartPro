import { Link } from 'react-router-dom';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useLessons } from '../hooks/useLessons';
import { DifficultyBadge } from '../components/ui/Badge';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';

function LessonCard({ lesson, index }) {
  return (
    <Link
      to={`/learning/${lesson.slug}`}
      className="group block bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all no-underline"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
          {lesson.order || index + 1}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors">
        {lesson.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{lesson.description}</p>
      <div className="flex items-center justify-between">
        <DifficultyBadge level={lesson.difficulty} />
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {lesson.duration_minutes} min
        </div>
      </div>
    </Link>
  );
}

export function Learning() {
  const { lessons, loading, error, refetch } = useLessons();

  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const beginnerLessons = lessons.filter((l) => l.difficulty === 'beginner');
  const intermediateLessons = lessons.filter((l) => l.difficulty === 'intermediate');
  const advancedLessons = lessons.filter((l) => l.difficulty === 'advanced');

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Learning Hub</h2>
        <p className="text-slate-500 mt-1">Build your entrepreneurship skills with structured lessons.</p>
      </div>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Your Learning Journey</h3>
        </div>
        <p className="text-emerald-100 text-sm">
          {lessons.length} lessons available covering entrepreneurship fundamentals, pricing, finance, and risk management.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : lessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lessons available"
          description="Lessons will appear here once they are created by the admin."
        />
      ) : (
        <>
          {/* Beginner */}
          {beginnerLessons.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                <span className="text-emerald-500">●</span> Beginner
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {beginnerLessons.map((lesson, i) => (
                  <LessonCard key={lesson.id} lesson={lesson} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Intermediate */}
          {intermediateLessons.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                <span className="text-amber-500">●</span> Intermediate
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {intermediateLessons.map((lesson, i) => (
                  <LessonCard key={lesson.id} lesson={lesson} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Advanced */}
          {advancedLessons.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                <span className="text-red-500">●</span> Advanced
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {advancedLessons.map((lesson, i) => (
                  <LessonCard key={lesson.id} lesson={lesson} index={i} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
