'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl?: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubUrl, technologies }) => (
  <article className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
      {title}
      {githubUrl && (
        <Link 
          href={githubUrl} 
          className="ml-2 text-[#1E90FF] hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] p-2 -m-2"
          aria-label={`View ${title} project on GitHub (opens in new tab)`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
        </Link>
      )}
    </h3>
    <p className="text-gray-300 mb-4 text-sm sm:text-base">{description}</p>
    <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
      {technologies.map((tech) => (
        <span 
          key={tech} 
          className="px-2 sm:px-3 py-1 bg-[#1E90FF]/10 text-[#1E90FF] rounded-full text-xs sm:text-sm"
          role="listitem"
        >
          {tech}
        </span>
      ))}
    </div>
  </article>
);

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, date, responsibilities }) => (
  <article className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-1">{title}</h3>
        <p className="text-[#1E90FF] mb-2 sm:mb-4">{company}</p>
      </div>
      <span className="text-gray-400 text-xs sm:text-sm">{date}</span>
    </div>
    <ul className="text-gray-300 space-y-2 text-sm sm:text-base" aria-label="Job responsibilities">
      {responsibilities.map((responsibility, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#1E90FF] mr-2 flex-shrink-0" aria-hidden="true">•</span>
          {responsibility}
        </li>
      ))}
    </ul>
  </article>
);

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`group flex flex-col items-center justify-center w-12 sm:w-14 h-12 sm:h-14 mb-4 rounded-xl transition-all duration-200 relative touch-manipulation
      ${active ? 'bg-[#1E90FF]/20' : 'hover:bg-[#1E90FF]/10'}
      focus:outline-none focus:ring-2 focus:ring-[#1E90FF]`}
    aria-label={`Navigate to ${label} section`}
    aria-current={active ? 'page' : undefined}
  >
    <div className={`${active ? 'text-[#1E90FF]' : 'text-gray-400 group-hover:text-[#1E90FF]'} transition-colors`}
         aria-hidden="true">
      {icon}
    </div>
    <span 
      className="hidden sm:block absolute left-16 px-2 py-1 bg-[#2A2A2A] text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      role="tooltip"
    >
      {label}
    </span>
  </button>
);

export { ProjectCard, ExperienceCard, DockItem };
export type { ProjectCardProps, ExperienceCardProps, DockItemProps };