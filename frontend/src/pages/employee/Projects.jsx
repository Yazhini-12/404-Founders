import React, { useState } from 'react';
import { Plus, Sparkles, FolderKanban } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProjectCard } from '../../components/employee/ProjectCard';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { projectService } from '../../services/projectService';
import { mockProjects } from '../../data/mockProjects';

export function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    role: '',
    description: '',
    contribution: '',
    technologies: '',
    startDate: '',
    endDate: '',
    status: 'Completed'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const newProj = await projectService.addProject({
      ...formData,
      technologies: techArray
    });

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setToastMessage('Project added. AI skill analysis will be triggered when backend integration is enabled.');
    setTimeout(() => setToastMessage(null), 5000);

    setFormData({
      title: '',
      role: '',
      description: '',
      contribution: '',
      technologies: '',
      startDate: '',
      endDate: '',
      status: 'Completed'
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects & Contributions"
        subtitle="AI analyzes your project contributions to extract verified skills for your Skill Passport."
        actions={
          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Add Project
          </Button>
        }
      />

      {toastMessage && (
        <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-indigo-200 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-xs text-indigo-200 font-bold">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Project Contribution"
        subtitle="Describe your role and technologies used for AI skill extraction."
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Cloud Migration Platform"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Your Role in Project</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Backend Developer"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Description</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of the project objective..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Your Contribution</label>
            <textarea
              rows={2}
              required
              value={formData.contribution}
              onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
              placeholder="Developed REST APIs, containerized services using Docker, deployed to AWS..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Technologies Used (comma separated)</label>
            <input
              type="text"
              required
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="Python, Docker, AWS, PostgreSQL"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save & Analyze Skills
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
