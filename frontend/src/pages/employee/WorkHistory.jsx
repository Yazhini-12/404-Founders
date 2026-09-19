import React, { useState } from 'react';
import { Plus, Building2, Calendar, Briefcase } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { mockEmployee } from '../../data/mockEmployee';

export function WorkHistory() {
  const [history, setHistory] = useState(mockEmployee.workHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    period: '',
    role: '',
    organization: '',
    duration: '',
    responsibilities: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArr = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const newItem = {
      id: `wh-${Date.now()}`,
      ...formData,
      skills: skillsArr
    };
    setHistory([newItem, ...history]);
    setIsModalOpen(false);
    setFormData({ period: '', role: '', organization: '', duration: '', responsibilities: '', skills: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Work History Timeline"
        subtitle="Your organizational career progression within SkillSync Corp."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Work History
          </Button>
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8">
          {history.map((item) => (
            <div key={item.id} className="relative pl-6">
              <div className="absolute -left-2.5 top-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-indigo-50">
                •
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-bold text-slate-900 text-base">{item.role}</h3>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {item.period} ({item.duration})
                </span>
              </div>

              <span className="text-xs font-medium text-slate-500 block mb-2">{item.organization}</span>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.responsibilities}</p>

              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((sk, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Work History Entry"
        subtitle="Record past role experience and responsibilities."
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Title / Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Software Developer"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization / Dept</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Platform Team"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Period</label>
              <input
                type="text"
                required
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="2024 - 2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2 Years"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Responsibilities</label>
            <textarea
              rows={2}
              required
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Key responsibilities and achievements..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              required
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Python, PostgreSQL, REST API"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Work History
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
