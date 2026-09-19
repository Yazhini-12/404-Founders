import React, { useState } from 'react';
import { User, Mail, MapPin, Building2, Briefcase, Calendar, Award, Edit3, Save } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { mockEmployee } from '../../data/mockEmployee';

export function Profile() {
  const [profile, setProfile] = useState(mockEmployee);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...mockEmployee });

  const handleSave = () => {
    setProfile({ ...formData });
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Profile"
        subtitle="Manage your personal information, career goals, and profile visibility."
        actions={
          editing ? (
            <Button variant="primary" icon={Save} onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button variant="outline" icon={Edit3} onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <Avatar name={profile.fullName} src={profile.avatarUrl} size="xl" />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-slate-900">{profile.fullName}</h2>
            <p className="text-sm font-semibold text-indigo-600">{profile.jobTitle} • {profile.department}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" />{profile.email}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{profile.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-slate-400" />{profile.experienceYears} Years Experience</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center w-full sm:w-48 shrink-0">
            <span className="text-xs font-semibold text-slate-500 block">Profile Completion</span>
            <span className="text-2xl font-extrabold text-indigo-600 block my-1">{profile.profileCompletion}%</span>
            <ProgressBar value={profile.profileCompletion} color="indigo" size="sm" />
          </div>
        </div>

        {/* Form / View Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Career Goal / Target Role</label>
            {editing ? (
              <input
                type="text"
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            ) : (
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg font-bold text-indigo-900 text-sm">
                {profile.careerGoal}
              </div>
            )}
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Manager Validation</label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              {profile.manager}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Professional Bio / Summary</label>
            {editing ? (
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            ) : (
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
