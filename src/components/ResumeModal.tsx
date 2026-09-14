import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, ExternalLink, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal, experience, education, projects } = usePortfolioData();
  const [copied, setCopied] = useState(false);

  if (!isResumeModalOpen) return null;

  const handleCopyText = () => {
    const plainTextCV = `
AHMED RAZA
${PERSONAL_INFO.title}
Islamabad, Pakistan | Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bio}

CORE TECHNICAL SKILLS
• Programming & Frameworks: Python (Scikit-learn, Flask, Selenium), TypeScript, React.js, Next.js, Flutter, Dart, Tailwind CSS, HTML5/CSS3.
• AI & Machine Learning: Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), NLP, Sentence Transformers, Speech Sentiment Analysis.
• Databases & Cloud: PostgreSQL, Microsoft SQL Server (SSMS), SQLite, RESTful APIs, Git/GitHub, DevSecOps.
• Security & Tools: Cryptography (AES, RSA, DES), Phishing Detection, Postman, Linux, Docker basics.

PROFESSIONAL EXPERIENCE
${experience.map(e => `• ${e.title} - ${e.organization} (${e.period})
  ${e.description}
  ${e.bullets?.map(b => `  - ${b}`).join('\n') || ''}`).join('\n\n')}

FEATURED PROJECTS
${projects.slice(0, 6).map(p => `• ${p.title} [${p.category}]
  ${p.description}
  Key Outcome: ${p.metrics || 'Completed successfully'}`).join('\n\n')}

EDUCATION
${education.map(ed => `• ${ed.title} - ${ed.organization} (${ed.period})
  ${ed.description}`).join('\n\n')}

CERTIFICATIONS & HONORS
• Vyrothon 2026 AI Hackathon Finalist
• Python for Data Science & AI - IBM Certified
• Foundations of AI - Microsoft Certified
• 500+ GitHub Contributions in the past year
`.trim();

    navigator.clipboard.writeText(plainTextCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <h2 className="text-base font-bold text-neutral-900">
              Verified Curriculum Vitae – Ahmed Raza
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition-colors cursor-pointer"
              title="Copy as plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#10b981] hover:bg-[#059669] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={closeResumeModal}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Body (Formatted for screen and print) */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:p-0 print:overflow-visible font-sans">
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              AHMED RAZA
            </h1>
            <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1">
              Full Stack Developer &amp; AI Solutions Engineer
            </p>
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-neutral-600 mt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" /> Islamabad, Pakistan (PKT / UTC+5)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-neutral-500" /> +92 334 5216102
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-neutral-500" /> araza2125012.pgc@gmail.com
              </span>
              <span>•</span>
              <a href="https://linkedin.com/in/ahmed-r-43b6a1266/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                linkedin.com/in/ahmed-r-43b6a1266
              </a>
              <span>•</span>
              <a href="https://github.com/AhmedRaza-2" target="_blank" rel="noopener noreferrer" className="text-neutral-800 hover:underline">
                github.com/AhmedRaza-2
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify">
              Results-oriented Full Stack Developer &amp; AI Solutions Engineer with hands-on experience developing and deploying production LLM-powered applications, workflow automations, and secure web &amp; mobile systems. Proven track record cutting high-volume bank compliance audits from 32 hours to 10 minutes at Askari Bank AI team, implementing RAG chatbots at INARA Tech, and actively maintaining 500+ contributions on GitHub.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Technical Core Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-800">
              <div>
                <span className="font-bold text-neutral-900">Languages:</span> Python, TypeScript, JavaScript, Dart, SQL, C++, HTML5, CSS3
              </div>
              <div>
                <span className="font-bold text-neutral-900">AI &amp; ML:</span> LLMs, RAG, NLP, Scikit-learn, Sentence Transformers, Audio Sentiment
              </div>
              <div>
                <span className="font-bold text-neutral-900">Web &amp; Mobile:</span> React.js, Next.js, Flutter, Node.js, Flask, Tailwind CSS, Bootstrap
              </div>
              <div>
                <span className="font-bold text-neutral-900">Data &amp; Security:</span> SQL Server (SSMS), PostgreSQL, Cryptography (AES, RSA), Phishing Defense
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between flex-wrap">
                    <span className="font-bold text-neutral-900 text-sm">{exp.title}</span>
                    <span className="text-xs font-medium text-neutral-500">{exp.period}</span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-700">{exp.organization}</div>
                  <ul className="list-disc list-outside pl-4 mt-1.5 space-y-1 text-neutral-700 text-xs">
                    {exp.bullets?.map((bullet, idx) => (
                      <li key={idx} className="leading-normal">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Key Production Projects */}
          <section className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Selected Impact Projects
            </h3>
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between flex-wrap">
                    <span className="font-bold text-neutral-900">{project.title}</span>
                    {project.metrics && (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-700 mt-0.5 leading-normal">
                    {project.description}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    <strong className="text-neutral-700">Tech:</strong> {project.techStack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Education
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="flex items-baseline justify-between flex-wrap">
                    <span className="font-bold text-neutral-900">{edu.title}</span>
                    <span className="text-xs text-neutral-500 font-medium">{edu.period}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <span>{edu.organization}</span>
                    {edu.grade && <span className="font-semibold text-neutral-700">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Hackathons */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Honors, Hackathons &amp; Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              <div>• <strong>Vyrothon 2026 AI Hackathon Finalist:</strong> Top competing AI/ML team.</div>
              <div>• <strong>IBM Certified:</strong> Python for Data Science &amp; AI</div>
              <div>• <strong>Microsoft Certified:</strong> Career Essentials in Generative AI</div>
              <div>• <strong>GitHub Contributor:</strong> 500+ verified contributions in the past 12 months.</div>
            </div>
          </section>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between print:hidden">
          <span>Available immediately for Full-Time Remote, Hybrid, or Contract roles worldwide.</span>
          <button
            type="button"
            onClick={closeResumeModal}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
