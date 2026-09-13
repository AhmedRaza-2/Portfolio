import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, TimelineItem } from '../types/portfolio';
import { PROJECTS as DEFAULT_PROJECTS, EXPERIENCE as DEFAULT_EXPERIENCE, EDUCATION as DEFAULT_EDUCATION } from '../data/portfolioData';

interface PortfolioDataContextType {
  projects: Project[];
  experience: TimelineItem[];
  education: TimelineItem[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProject: (id: string, direction: 'up' | 'down') => void;
  addExperience: (item: TimelineItem) => void;
  updateExperience: (id: string, updated: Partial<TimelineItem>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (item: TimelineItem) => void;
  updateEducation: (id: string, updated: Partial<TimelineItem>) => void;
  deleteEducation: (id: string) => void;
  resetToDefaults: () => void;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  isAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  changePin: (newPin: string) => boolean;
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'ahmed_portfolio_custom_projects',
  EXPERIENCE: 'ahmed_portfolio_custom_experience',
  EDUCATION: 'ahmed_portfolio_custom_education',
  PIN: 'ahmed_portfolio_admin_pin',
  AUTH: 'ahmed_portfolio_admin_auth',
};

const DEFAULT_PIN = 'ahmed2026';

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure any outdated asset paths are upgraded to the current high-res SVGs
            return parsed.map((p: Project) => {
              const defaultMatch = DEFAULT_PROJECTS.find((dp) => dp.id === p.id);
              if (defaultMatch && (!p.image || p.image.startsWith('/assets/') || p.image.endsWith('.png'))) {
                return { ...p, image: defaultMatch.image };
              }
              return p;
            });
          }
        }
      } catch (err) {
        console.error('Error loading custom projects:', err);
      }
    }
    return DEFAULT_PROJECTS;
  });

  // Experience
  const [experience, setExperience] = useState<TimelineItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Error loading custom experience:', err);
      }
    }
    return DEFAULT_EXPERIENCE;
  });

  // Education
  const [education, setEducation] = useState<TimelineItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Error loading custom education:', err);
      }
    }
    return DEFAULT_EDUCATION;
  });

  // Admin Modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    }
    return false;
  });

  // Resume Modal state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(newProjects));
    } catch {
      // ignore
    }
  };

  const saveExperience = (newExp: TimelineItem[]) => {
    setExperience(newExp);
    try {
      localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(newExp));
    } catch {
      // ignore
    }
  };

  const saveEducation = (newEdu: TimelineItem[]) => {
    setEducation(newEdu);
    try {
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(newEdu));
    } catch {
      // ignore
    }
  };

  // Keyboard shortcut listener for hidden Admin Panel: Ctrl+Shift+A or Cmd+Shift+A or #admin in URL
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    // Check initial hash
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', ' ');
    }
  };

  const loginAdmin = (pin: string): boolean => {
    const savedPin = localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;
    if (pin.trim() === savedPin.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const changePin = (newPin: string): boolean => {
    if (!newPin || newPin.trim().length < 4) return false;
    localStorage.setItem(STORAGE_KEYS.PIN, newPin.trim());
    return true;
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    saveProjects(updated);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    const newProjects = projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
    saveProjects(newProjects);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((p) => p.id !== id);
    saveProjects(newProjects);
  };

  const reorderProject = (id: string, direction: 'up' | 'down') => {
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const copy = [...projects];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    saveProjects(copy);
  };

  const addExperience = (item: TimelineItem) => {
    saveExperience([item, ...experience]);
  };

  const updateExperience = (id: string, updated: Partial<TimelineItem>) => {
    saveExperience(experience.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteExperience = (id: string) => {
    saveExperience(experience.filter((e) => e.id !== id));
  };

  const addEducation = (item: TimelineItem) => {
    saveEducation([item, ...education]);
  };

  const updateEducation = (id: string, updated: Partial<TimelineItem>) => {
    saveEducation(education.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEducation = (id: string) => {
    saveEducation(education.filter((e) => e.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    setProjects(DEFAULT_PROJECTS);
    setExperience(DEFAULT_EXPERIENCE);
    setEducation(DEFAULT_EDUCATION);
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        projects,
        experience,
        education,
        addProject,
        updateProject,
        deleteProject,
        reorderProject,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        resetToDefaults,
        isAdminOpen,
        openAdmin,
        closeAdmin,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        changePin,
        isResumeModalOpen,
        openResumeModal: () => setIsResumeModalOpen(true),
        closeResumeModal: () => setIsResumeModalOpen(false),
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
