// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Briefcase, 
  Code, 
  Wrench, 
  GraduationCap, 
  Phone,
  User,
  Home
} from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl?: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubUrl, technologies }) => (
  <div className="bg-[#2A2A2A] rounded-xl p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
    <h3 className="text-xl font-semibold mb-2 flex items-center">
      {title}
      {githubUrl && (
        <Link href={githubUrl} className="ml-2 text-[#1E90FF] hover:text-blue-400">
          <ExternalLink className="h-4 w-4" />
        </Link>
      )}
    </h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <span key={tech} className="px-3 py-1 bg-[#1E90FF]/10 text-[#1E90FF] rounded-full text-sm">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

interface ExperienceCardProps {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, company, date, responsibilities }) => (
  <div className="bg-[#2A2A2A] rounded-xl p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-[#1E90FF] mb-4">{company}</p>
      </div>
      <span className="text-gray-400 text-sm">{date}</span>
    </div>
    <ul className="text-gray-300 space-y-2">
      {responsibilities.map((responsibility, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#1E90FF] mr-2">•</span>
          {responsibility}
        </li>
      ))}
    </ul>
  </div>
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
    className={`group flex flex-col items-center justify-center w-14 h-14 mb-4 rounded-xl transition-all duration-200 relative
      ${active ? 'bg-[#1E90FF]/20' : 'hover:bg-[#1E90FF]/10'}`}
  >
    <div className={`${active ? 'text-[#1E90FF]' : 'text-gray-400 group-hover:text-[#1E90FF]'} transition-colors`}>
      {icon}
    </div>
    <span className="absolute left-16 px-2 py-1 bg-[#2A2A2A] text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {label}
    </span>
  </button>
);

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('section');
    
    // Add detection for top of page
    const handleScroll = () => {
      if (window.scrollY < 100) { // Adjust this threshold as needed
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const experiences: ExperienceCardProps[] = [
    {
      title: "Communications Analyst",
      company: "Immigration, Refugees and Citizenship Canada",
      date: "Oct 2023 - Present",
      responsibilities: [
        "Revamped 550+ bilingual forms and implemented interstitial pages, enhancing user navigation",
        "Managed content updates and developed 1000+ pages using Adobe Experience Manager (AEM)",
        "Improved website functionality using Web Experience Toolkit (WET) for standards-compliant designs",
        "Ensured W3C Accessibility compliance using Wave and W3C validators"
      ]
    },
    {
      title: "Programming Instructor",
      company: "Ultimate Coders & Geek Education",
      date: "Aug 2019 - May 2023",
      responsibilities: [
        "Led programming courses in Python, Java, HTML, Unity, and Scratch for students aged 6-18",
        "Provided personalized instruction and mentorship in small group settings"
      ]
    },
    {
      title: "Information Systems Co-op",
      company: "Engineers and Geoscientists BC",
      date: "Jan 2022 - Aug 2022",
      responsibilities: [
        "Developed ASP.NET Core MVC applications using C# in Visual Studio",
        "Contributed to front-end development with React and Kendo UI",
        "Utilized Azure for deployment and Swagger for API documentation"
      ]
    }
  ];

  const projects: ProjectCardProps[] = [
    {
      title: "Train Track",
      description: "Android application for Physical Education instructors with Firebase authentication and real-time data tracking, implementing user management and assignment features.",
      githubUrl: "https://github.com/jam0ra/Train-Track",
      technologies: ["Java", "Android Studio", "Firebase"]
    },
    {
      title: "Fairtrade Rewards",
      description: "Built a rewards platform promoting fair trade products, implementing a points-based system to incentivize sustainable purchasing decisions.",
      githubUrl: "https://github.com/jam0ra/Fairtrade-Rewards",
      technologies: ["Python", "SQLite3"]
    },
    {
      title: "Minigames",
      description: "Created terminal-based games with persistent leaderboard functionality, featuring robust input validation and multiple game modes.",
      technologies: ["Python", "SQLite3"]
    }
  ];

  const technologies = {
    languages: ['Python', 'Java', 'C#', 'JavaScript', 'SQL', 'HTML/CSS'],
    frameworks: [
      'React',
      'ASP.NET Core MVC',
      'Azure DevOps',
      'Adobe Experience Manager',
      'Oracle APEX',
      'Git',
      'Web Experience Toolkit'
    ],
    devTools: [
      'Visual Studio',
      'VS Code',
      'Android Studio',
      'Figma',
      'GitHub',
      'GitLab',
      'Swagger'
    ]
  };

  return (
    <div className="min-h-screen bg-[#232323] text-white">
      {/* Left Dock */}
      <div className="fixed left-0 top-0 h-screen w-20 bg-[#2A2A2A] border-r border-[#363636] p-3 flex flex-col items-center">
        <DockItem 
          icon={<Home size={24} />} 
          label="Home"
          active={activeSection === 'home'}
          onClick={() => scrollToSection('home')}
        />
        <DockItem 
          icon={<User size={24} />} 
          label="About"
          active={activeSection === 'about'}
          onClick={() => scrollToSection('about')}
        />
        <DockItem 
          icon={<Briefcase size={24} />} 
          label="Experience"
          active={activeSection === 'experience'}
          onClick={() => scrollToSection('experience')}
        />
        <DockItem 
          icon={<Code size={24} />} 
          label="Projects"
          active={activeSection === 'projects'}
          onClick={() => scrollToSection('projects')}
        />
        <DockItem 
          icon={<GraduationCap size={24} />} 
          label="Education"
          active={activeSection === 'education'}
          onClick={() => scrollToSection('education')}
        />
        <DockItem 
          icon={<Wrench size={24} />} 
          label="Technologies"
          active={activeSection === 'technologies'}
          onClick={() => scrollToSection('technologies')}
        />
      </div>

      {/* Main Content */}
      <div className="ml-20 p-8">
        <div className="max-w-6xl mx-auto bg-[#232323] rounded-xl shadow-2xl overflow-hidden">
          {/* Window Header */}
          <div className="flex items-center px-4 h-12 bg-[#2A2A2A] border-b border-[#363636]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-400">jam0ra.github.io</div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Home Section */}
            <section id="home" className="mb-16">
              <h1 className="text-4xl font-bold mb-2">John Jamora</h1>
              <p className="text-gray-400 text-xl mb-4">Full-Stack Software Developer</p>
              <p className="text-gray-300 max-w-3xl">
                Bilingual software developer with 3+ years of experience in full-stack development, specializing in web 
                accessibility and inclusive design. Focused on creating user-friendly, accessible applications that make 
                a difference.
              </p>
            </section>

            {/* About Section */}
            <section id="about" className="mb-16">
              <div className="flex flex-wrap gap-4">
                <Link href="https://github.com/jam0ra" className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Github className="h-5 w-5 mr-2" />
                  <span>github.com/jam0ra</span>
                </Link>
                <Link href="https://linkedin.com/in/jam0ra" className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Linkedin className="h-5 w-5 mr-2" />
                  <span>linkedin.com/in/jam0ra</span>
                </Link>
                <Link href="mailto:jjamora@sfu.ca" className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>jjamora@sfu.ca</span>
                </Link>
                <Link href="tel:7788778148" className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>(778) 877-8148</span>
                </Link>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-[#1E90FF] mr-2" />
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <ExperienceCard key={index} {...experience} />
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-[#1E90FF] mr-2" />
                <h2 className="text-2xl font-bold">Projects</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="mb-16">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-[#1E90FF] mr-2" />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-[#2A2A2A] rounded-xl p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">BS in Software Systems</h3>
                      <p className="text-[#1E90FF]">Simon Fraser University</p>
                    </div>
                    <span className="text-gray-400 text-sm">Sep 2019 - Present</span>
                  </div>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Web Accessibility Certification</h3>
                      <p className="text-[#1E90FF]">Deque University</p>
                    </div>
                    <span className="text-gray-400 text-sm">2024</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Technologies Section */}
            <section id="technologies">
              <div className="flex items-center mb-6">
                <Wrench className="w-6 h-6 text-[#1E90FF] mr-2" />
                <h2 className="text-2xl font-bold">Technologies</h2>
              </div>
              <div className="bg-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {technologies.languages.map((lang) => (
                    <span key={lang} className="px-4 py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 rounded-full transition-colors">
                      {lang}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-4">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {technologies.frameworks.map((framework) => (
                    <span key={framework} className="px-4 py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 rounded-full transition-colors">
                      {framework}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.devTools.map((tool) => (
                    <span key={tool} className="px-4 py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 rounded-full transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}