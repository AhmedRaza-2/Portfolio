import React, { useState } from 'react';
import { X, Lock, KeyRound, Plus, Trash2, ArrowUp, ArrowDown, Edit2, Check, RefreshCw, LogOut, Save, ShieldAlert, FolderGit2, Briefcase, Settings } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { Project, TimelineItem } from '../types/portfolio';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    closeAdmin,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    changePin,
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProject,
    experience,
    addExperience,
    updateExperience,
    deleteExperience,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    resetToDefaults,
  } = usePortfolioData();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'settings'>('projects');

  // New/Edit Project Form State
  const [isEditingProject, setIsEditingProject] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'AI & ML',
    description: '',
    techStack: [],
    metrics: '',
    image: '/assets/portfolio-01.png',
    liveUrl: '',
    githubUrl: '',
    featured: true,
  });
  const [techStackInput, setTechStackInput] = useState('');

  // Settings State
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN. Default is ahmed2026');
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    const stack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isEditingProject) {
      updateProject(isEditingProject, {
        ...projectForm,
        techStack: stack.length > 0 ? stack : projectForm.techStack,
      });
      setIsEditingProject(null);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectForm.title || 'Untitled Project',
        category: (projectForm.category as any) || 'AI & ML',
        description: projectForm.description || '',
        image: projectForm.image || '/assets/portfolio-01.png',
        techStack: stack.length > 0 ? stack : ['Python', 'TypeScript'],
        metrics: projectForm.metrics || undefined,
        liveUrl: projectForm.liveUrl || undefined,
        githubUrl: projectForm.githubUrl || undefined,
        featured: projectForm.featured ?? true,
      };
      addProject(newProj);
    }

    // Reset form
    setProjectForm({
      title: '',
      category: 'AI & ML',
      description: '',
      techStack: [],
      metrics: '',
      image: '/assets/portfolio-01.png',
      liveUrl: '',
      githubUrl: '',
      featured: true,
    });
    setTechStackInput('');
  };

  const startEditProject = (proj: Project) => {
    setIsEditingProject(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      metrics: proj.metrics,
      image: proj.image,
      liveUrl: proj.liveUrl,
      githubUrl: proj.githubUrl,
      featured: proj.featured,
      techStack: proj.techStack,
    });
    setTechStackInput(proj.techStack.join(', '));
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (changePin(newPin)) {
      setPinChangeSuccess(true);
      setNewPin('');
      setTimeout(() => setPinChangeSuccess(false), 3000);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Portfolio Admin Panel
                <span className="text-[10px] font-mono bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                  Private
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                Shortcut: <code className="text-emerald-400">Ctrl+Shift+A</code> or URL hash <code className="text-emerald-400">#admin</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            )}
            <button
              type="button"
              onClick={closeAdmin}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
              <KeyRound className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Admin Authentication</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Enter your passcode to manage projects, edit experience, and update content in real-time.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Passcode (Default: ahmed2026)"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-emerald-500 text-center tracking-widest"
                  autoFocus
                />
                {pinError && <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800 bg-neutral-950/60">
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('experience')}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'experience'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Experience &amp; Roles ({experience.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings &amp; Reset</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Add / Edit Project Form */}
                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
                      <span>{isEditingProject ? 'Edit Project' : 'Add New Project'}</span>
                      {isEditingProject && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProject(null);
                            setProjectForm({
                              title: '',
                              category: 'AI & ML',
                              description: '',
                              techStack: [],
                              metrics: '',
                              image: '/assets/portfolio-01.png',
                              liveUrl: '',
                              githubUrl: '',
                              featured: true,
                            });
                            setTechStackInput('');
                          }}
                          className="text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h4>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={projectForm.title || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. AI Customer Service Agent"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Category
                          </label>
                          <select
                            value={projectForm.category || 'AI & ML'}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          >
                            <option value="AI & ML">AI &amp; ML</option>
                            <option value="AI & Web">AI &amp; Web</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Application">Mobile Application</option>
                            <option value="Enterprise Automation">Enterprise Automation</option>
                            <option value="Desktop & Tools">Desktop &amp; Tools</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                          Short Description *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={projectForm.description || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Brief description of project impact, technology, and what was achieved..."
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Key Metrics / Highlight
                          </label>
                          <input
                            type="text"
                            value={projectForm.metrics || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                            placeholder="e.g. Cut 32h work to 10 mins (50K+ docs)"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Tech Stack (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={techStackInput}
                            onChange={(e) => setTechStackInput(e.target.value)}
                            placeholder="Python, RAG, Scikit-learn, React"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Live URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={projectForm.liveUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            GitHub URL (Optional)
                          </label>
                          <input
                            type="url"
                            value={projectForm.githubUrl || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            placeholder="Leave empty if internal"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                            Thumbnail Asset Path
                          </label>
                          <input
                            type="text"
                            value={projectForm.image || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                            placeholder="/assets/portfolio-08.png"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                          <input
                            type="checkbox"
                            checked={projectForm.featured ?? true}
                            onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                            className="rounded text-emerald-500 focus:ring-emerald-500"
                          />
                          <span>Show in Featured Projects</span>
                        </label>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isEditingProject ? 'Update Project' : 'Add to Portfolio'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Existing Projects List */}
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                      Current Projects ({projects.length}) – Reorder or Edit
                    </h4>

                    <div className="space-y-2">
                      {projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs font-mono text-neutral-500 w-5 text-center">
                              #{idx + 1}
                            </span>
                            <img
                              src={proj.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-neutral-800 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/portfolio-01.png';
                              }}
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white truncate">{proj.title}</p>
                              <p className="text-[10px] text-neutral-400 truncate">
                                <span className="text-emerald-400 font-semibold">{proj.category}</span>
                                {proj.metrics && <span> • {proj.metrics}</span>}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => reorderProject(proj.id, 'up')}
                              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === projects.length - 1}
                              onClick={() => reorderProject(proj.id, 'down')}
                              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => startEditProject(proj)}
                              className="p-1.5 rounded text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800 cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete project "${proj.title}"?`)) {
                                  deleteProject(proj.id);
                                }
                              }}
                              className="p-1.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                      Professional Experience Entries ({experience.length})
                    </h4>
                    <div className="space-y-3">
                      {experience.map((exp) => (
                        <div key={exp.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                          <div className="flex items-baseline justify-between mb-1">
                            <h5 className="text-xs font-bold text-white">{exp.title}</h5>
                            <span className="text-[10px] text-neutral-400 font-mono">{exp.period}</span>
                          </div>
                          <p className="text-xs text-emerald-400 font-semibold mb-2">{exp.organization}</p>
                          <p className="text-xs text-neutral-300 mb-2">{exp.description}</p>
                          {exp.bullets && exp.bullets.length > 0 && (
                            <ul className="list-disc pl-4 text-[11px] text-neutral-400 space-y-0.5">
                              {exp.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                      Education Entries ({education.length})
                    </h4>
                    <div className="space-y-3">
                      {education.map((edu) => (
                        <div key={edu.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                          <div className="flex items-baseline justify-between mb-1">
                            <h5 className="text-xs font-bold text-white">{edu.title}</h5>
                            <span className="text-[10px] text-neutral-400 font-mono">{edu.period}</span>
                          </div>
                          <p className="text-xs text-emerald-400 font-semibold mb-1">{edu.organization}</p>
                          <p className="text-xs text-neutral-300">{edu.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-lg">
                  {/* Change PIN */}
                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                      Update Admin PIN
                    </h4>
                    <p className="text-xs text-neutral-400 mb-4">
                      Change the passcode required to open this admin dashboard.
                    </p>

                    <form onSubmit={handleUpdatePin} className="flex gap-2">
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="New PIN (min 4 chars)"
                        className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Update PIN
                      </button>
                    </form>
                    {pinChangeSuccess && (
                      <p className="text-xs text-emerald-400 mt-2 font-semibold">PIN updated successfully!</p>
                    )}
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-5 rounded-xl bg-neutral-950 border border-rose-950/40">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      Factory Reset Data
                    </h4>
                    <p className="text-xs text-neutral-400 mb-4">
                      Revert all projects, education, and experience back to the default portfolio values.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all data back to original defaults?')) {
                          resetToDefaults();
                          alert('Data reset to original defaults.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-900/40 hover:bg-rose-900/70 text-rose-200 border border-rose-800/60 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Portfolio to Defaults</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
