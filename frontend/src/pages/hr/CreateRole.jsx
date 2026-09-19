import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/common/Button';
import { roleService } from '../../services/roleService';

export function CreateRole() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    description: '',
    minExperience: 3,
    type: 'Full-time Internal Role',
    location: 'Bengaluru / Remote'
  });

  const [requirements, setRequirements] = useState([
    { skill: 'AWS', level: 80, weight: 'High', mandatory: true },
    { skill: 'Docker', level: 75, weight: 'High', mandatory: true },
    { skill: 'Kubernetes', level: 70, weight: 'High', mandatory: true },
    { skill: 'Terraform', level: 60, weight: 'Medium', mandatory: false }
  ]);

  const addRequirement = () => {
    setRequirements([...requirements, { skill: '', level: 70, weight: 'Medium', mandatory: false }]);
  };

  const updateRequirement = (index, field, value) => {
    const next = [...requirements];
    next[index][field] = value;
    setRequirements(next);
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await roleService.createRole({
      ...formData,
      requirements
    });

    setToast('Internal Role successfully created in mock state!');
    setTimeout(() => {
      navigate('/hr/roles');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/hr/roles')}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Internal Roles
      </button>

      <PageHeader
        title="Create Internal Role Opening"
        subtitle="Define role requirements and skill weights for AI candidate matching."
      />

      {toast && (
        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Role Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Cloud Engineer"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            >
              <option value="Engineering">Engineering</option>
              <option value="Platform">Platform</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Role Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe role responsibilities..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Minimum Experience (Years)</label>
            <input
              type="number"
              required
              value={formData.minExperience}
              onChange={(e) => setFormData({ ...formData, minExperience: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Location / Work Type</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
            />
          </div>
        </div>

        {/* Dynamic Required Skills Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm">Required Skills & Weights</h3>
            <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={addRequirement}>
              Add Skill
            </Button>
          </div>

          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={req.skill}
                    onChange={(e) => updateRequirement(idx, 'skill', e.target.value)}
                    placeholder="e.g. AWS"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Target Level ({req.level}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={req.level}
                    onChange={(e) => updateRequirement(idx, 'level', Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 mb-0.5">Importance</label>
                  <select
                    value={req.weight}
                    onChange={(e) => updateRequirement(idx, 'weight', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-3 sm:pt-0">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700 text-xs">
                    <input
                      type="checkbox"
                      checked={req.mandatory}
                      onChange={(e) => updateRequirement(idx, 'mandatory', e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                    Mandatory
                  </label>
                </div>

                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeRequirement(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/hr/roles')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Role & Match Talent
          </Button>
        </div>
      </form>
    </div>
  );
}
