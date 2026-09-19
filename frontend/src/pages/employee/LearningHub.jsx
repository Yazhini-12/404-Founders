import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Flame,
  Target,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  History,
  Info
} from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LearningCourseCard } from '../../components/employee/LearningCourseCard';
import { LearningConsistencyCard } from '../../components/employee/LearningConsistencyCard';
import { LearningActivityChart } from '../../components/employee/LearningActivityChart';
import { MonthlyConsistencyCalendar } from '../../components/employee/MonthlyConsistencyCalendar';
import { SkillConnectionWidget } from '../../components/employee/SkillConnectionWidget';
import { RoleConnectionWidget } from '../../components/employee/RoleConnectionWidget';
import { learningTrackingService } from '../../services/learningTrackingService';

export function LearningHub() {
  const [courses, setCourses] = useState([]);
  const [consistencyData, setConsistencyData] = useState(null);
  const [historyTimeline, setHistoryTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');
  const [toastMessage, setToastMessage] = useState(null);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState(5);

  useEffect(() => {
    loadLearningData();
  }, []);

  const loadLearningData = async () => {
    const [cList, cData, hData] = await Promise.all([
      learningTrackingService.getCourses(),
      learningTrackingService.getLearningConsistency(),
      learningTrackingService.getLearningHistory()
    ]);
    setCourses(cList);
    setConsistencyData(cData);
    setHistoryTimeline(hData);
  };

  const handleStartLearning = async (course) => {
    await learningTrackingService.startLearningSession('emp-101', course.id);
    setToastMessage(`Learning session started for "${course.title}". Gateway launch simulated.`);
    setTimeout(() => setToastMessage(null), 4000);
    await loadLearningData();

    if (course.courseUrl && course.courseUrl !== '#') {
      window.open(course.courseUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const recommendedCourses = courses.filter(c => c.status === 'Not Started' || c.status === 'In Progress');
  const inProgressCourses = courses.filter(c => c.status === 'In Progress');
  const completedCourses = courses.filter(c => c.status === 'Completed');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Hub"
        subtitle="Build the skills you need for your next opportunity."
        badgeText="Centralized Gateway"
      />

      {/* Simulated Gateway Launch Toast Alert */}
      {toastMessage && (
        <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-indigo-200 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-indigo-200 hover:text-white text-xs font-bold px-2 py-1">
            Dismiss
          </button>
        </div>
      )}

      {/* Learning Consistency Top Header Banner */}
      {consistencyData && <LearningConsistencyCard data={consistencyData} />}

      {/* Goal & Skill/Role Linkage Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkillConnectionWidget />
        </div>
        <div>
          {/* Weekly Learning Goal Widget */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-sm">Weekly Learning Goal</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {weeklyGoalHours} Hours Target
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">Completed 4h 10m (83% of target)</p>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: '83%' }} />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Set Goal:</span>
              <div className="flex gap-1">
                {[3, 5, 7].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => setWeeklyGoalHours(hrs)}
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      weeklyGoalHours === hrs
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {hrs}h
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-6">
        {[
          { id: 'recommended', label: 'Recommended Learning', count: recommendedCourses.length },
          { id: 'in_progress', label: 'In Progress', count: inProgressCourses.length },
          { id: 'completed', label: 'Completed', count: completedCourses.length },
          { id: 'history', label: 'Learning History', icon: History }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <p className="text-xs text-indigo-900 leading-relaxed">
              These courses are dynamically recommended by SkillSync AI to close your identified skill gaps for the <span className="font-bold">Cloud Engineer</span> role. Clicking "Start Learning" launches the external platform gateway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <LearningCourseCard
                key={course.id}
                course={course}
                onStartLearning={handleStartLearning}
                onContinueLearning={handleStartLearning}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'in_progress' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <LearningCourseCard
              key={course.id}
              course={course}
              onStartLearning={handleStartLearning}
              onContinueLearning={handleStartLearning}
            />
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCourses.map((course) => (
            <LearningCourseCard
              key={course.id}
              course={course}
              onStartLearning={handleStartLearning}
            />
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-4">Learning Activity History</h3>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
            {historyTimeline.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className="absolute -left-2 top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <span className="text-xs text-slate-500">{item.provider} • {item.duration}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{item.date} at {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Analytics Grid: Weekly Activity & Monthly Consistency Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        <LearningActivityChart data={consistencyData?.weeklyActivity} />
        <MonthlyConsistencyCalendar data={consistencyData?.calendarHeatmap} />
      </div>

      {/* Role Connection Projection Footer */}
      <RoleConnectionWidget />
    </div>
  );
}
