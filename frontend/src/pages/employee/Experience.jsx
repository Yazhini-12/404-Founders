import React, { useState } from 'react';
import { Plus, Briefcase, Award } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockEmployee } from '../../data/mockEmployee';

export function Experience() {
  const [experiences, setExperiences] = useState(mockEmployee.experiences);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    duration: '',
    level: 'Intermediate',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const newExp = {
      id: `exp-${Date.now()}`,
      ...formData,
      skills: skillsArray
    };
    setExperiences([newExp, ...experiences]);
    setIsModalOpen(false);
    setFormData({ area: '', duration: '', level: 'Intermediate', skills: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Experience Areas"
        subtitle="Categorized domain experience and technical mastery levels."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Experience Area
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">{exp.area}</h3>
                <Badge variant={exp.level === 'Advanced' ? 'primary' : 'neutral'} size="sm">
                  {exp.level}
                </Badge>
              </div>
              <span className="text-xs text-slate-500 block mb-3 font-medium">Duration: {exp.duration}</span>

              <div className="mt-3">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Key Skills Utilized</span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((sk, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Experience Area"
        subtitle="Record domain exposure and skills used."
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Experience Area</label>
            <input
              type="text"
              required
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="e.g. Cloud Security & Compliance"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 2 Years"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Proficiency Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              >
                <option value="Developing">Developing</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skills Used (comma separated)</label>
            <input
              type="text"
              required
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="AWS, IAM, Vault, SSL"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Experience
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
