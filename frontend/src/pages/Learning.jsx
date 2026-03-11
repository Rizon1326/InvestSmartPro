import { Link } from 'react-router-dom';
import { BookOpen, Clock, ChevronRight, GraduationCap, Zap, Award } from 'lucide-react';
import { useLessons } from '../hooks/useLessons';
import { DifficultyBadge } from '../components/ui/Badge';
import { CardSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';

const difficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-emerald-700', dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-green-600', icon: GraduationCap },
  intermediate: { label: 'Intermediate', color: 'text-amber-700', dot: 'bg-amber-500', gradient: 'from-amber-500 to-orange-500', icon: Zap },
  advanced: { label: 'Advanced', color: 'text-red-700', dot: 'bg-red-500', gradient: 'from-red-500 to-rose-600', icon: Award },
};

function LessonCard({ lesson, index, gradient }) {
  return (
    <Link
      to={`/learning/${lesson.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 no-underline"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0`}>
          {String(lesson.order || index + 1).padStart(2, '0')}
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-3" />
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
        {lesson.title}
      </h3>
      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{lesson.description}</p>
      <div className="flex items-center justify-between">
        <DifficultyBadge level={lesson.difficulty} />
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {lesson.duration_minutes}m
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({ difficulty, count }) {
  const cfg = difficultyConfig[difficulty] || {};
  const Icon = cfg.icon || BookOpen;
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-sm`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className={`text-base font-bold ${cfg.color}`}>{cfg.label}</h3>
      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{count} lessons</span>
    </div>
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
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Learning Hub</h2>
        <p className="text-slate-500 text-sm mt-1">Build your entrepreneurship skills with structured lessons.</p>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10">
          <div className="absolute right-4 top-4 w-32 h-32 bg-white rounded-full" />
          <div className="absolute right-20 bottom-2 w-16 h-16 bg-white rounded-full" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-0.5">Your Learning Journey</h3>
            <p className="text-emerald-100 text-sm">
              {loading ? '...' : `${lessons.length} lessons`} covering entrepreneurship fundamentals, pricing, finance, and risk management.
            </p>
          </div>
          <div className="ml-auto text-right flex-shrink-0 hidden sm:block">
            <p className="text-3xl font-black">{loading ? '-' : lessons.length}</p>
            <p className="text-emerald-200 text-xs">lessons</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : lessons.length === 0 ? (
        <EmptyState icon={BookOpen} title="No lessons available" description="Lessons will appear here once they are created." />
      ) : (
        <div className="space-y-8">
          {beginnerLessons.length > 0 && (
            <div>
              <SectionHeader difficulty="beginner" count={beginnerLessons.length} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {beginnerLessons.map((l, i) => <LessonCard key={l.id} lesson={l} index={i} gradient="from-emerald-500 to-green-600" />)}
              </div>
            </div>
          )}
          {intermediateLessons.length > 0 && (
            <div>
              <SectionHeader difficulty="intermediate" count={intermediateLessons.length} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {intermediateLessons.map((l, i) => <LessonCard key={l.id} lesson={l} index={i} gradient="from-amber-500 to-orange-500" />)}
              </div>
            </div>
          )}
          {advancedLessons.length > 0 && (
            <div>
              <SectionHeader difficulty="advanced" count={advancedLessons.length} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {advancedLessons.map((l, i) => <LessonCard key={l.id} lesson={l} index={i} gradient="from-red-500 to-rose-600" />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


