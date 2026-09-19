import React from 'react';
import { Play, ExternalLink, CheckCircle, Clock, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export function LearningCourseCard({ course, onStartLearning, onContinueLearning }) {
  const {
    id,
    title,
    provider,
    providerLogo,
    targetSkill,
    reason,
    description,
    courseUrl,
    duration,
    difficulty,
    progress = 0,
    status = 'Not Started',
    lastAccessed,
    learningMinutes,
    currentSkillLevel,
    requiredSkillLevel,
    recommendedForRole
  } = course;

  const getStatusBadgeVariant = (st) => {
    switch (st) {
      case 'Completed': return 'success';
      case 'In Progress': return 'primary';
      case 'Paused': return 'warning';
      default: return 'neutral';
    }
  };

  const isCompleted = status === 'Completed';
  const isInProgress = status === 'In Progress';

  const handleAction = () => {
    if (isInProgress) {
      if (onContinueLearning) onContinueLearning(course);
      else if (onStartLearning) onStartLearning(course);
    } else if (isCompleted) {
      if (courseUrl && courseUrl !== '#') {
        window.open(courseUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      if (onStartLearning) onStartLearning(course);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            {providerLogo ? (
              <img src={providerLogo} alt={provider} className="w-6 h-6 object-contain rounded-xs" />
            ) : (
              <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                {provider[0]}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{provider}</span>
          </div>
          <Badge variant={getStatusBadgeVariant(status)} size="sm">
            {status}
          </Badge>
        </div>

        <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {reason && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-md border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{reason}</span>
          </div>
        )}

        <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Skill Gap Context */}
        {targetSkill && (
          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Target Skill</span>
              <span className="font-semibold text-slate-800">{targetSkill}</span>
            </div>
            {currentSkillLevel !== undefined && requiredSkillLevel !== undefined && (
              <div>
                <span className="text-slate-400 block text-[11px]">Gap Match</span>
                <span className="font-medium text-slate-700">
                  <span className="text-indigo-600 font-bold">{currentSkillLevel}%</span> → <span className="text-emerald-600 font-bold">{requiredSkillLevel}%</span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Course Attributes */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            {difficulty}
          </span>
        </div>

        {/* Progress Bar if started */}
        {progress > 0 && (
          <div className="mt-3">
            <ProgressBar value={progress} showLabel color={isCompleted ? 'emerald' : 'indigo'} size="sm" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {lastAccessed ? `Active: ${lastAccessed}` : 'Not started yet'}
        </span>
        <Button
          variant={isCompleted ? 'outline' : isInProgress ? 'primary' : 'secondary'}
          size="sm"
          icon={isCompleted ? CheckCircle : isInProgress ? Play : ExternalLink}
          onClick={handleAction}
        >
          {isCompleted ? 'Review Course' : isInProgress ? 'Continue Learning' : 'Start Learning'}
        </Button>
      </div>
    </div>
  );
}
