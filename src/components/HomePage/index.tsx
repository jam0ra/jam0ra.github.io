'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Briefcase, 
  Code, 
  Wrench, 
  GraduationCap,
  User,
  Home
} from 'lucide-react';
import { ProjectCard, ExperienceCard } from './components';
import { AdaptiveNav, DockItem } from './AdaptiveNav';
import { experiences, projects, technologies } from './data';

export default function HomePage() {
    
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = isMobile ? 60 : 0; // Account for bottom navigation on mobile
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ 
          top: elementPosition - offset, 
          behavior: 'smooth' 
        });
        setActiveSection(sectionId);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && window.scrollY > 0) {  // Only update if we've scrolled
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: isMobile ? '-60px 0px 0px 0px' : '0px' // Keep the mobile nav adjustment
    });
  
    const sections = document.querySelectorAll('section');
    
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    sections.forEach((section) => observer.observe(section));
  
    // Set initial active section
    setActiveSection('home');
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isMobile]);

  const navigationItems = (
    <>
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
    </>
  );

  return (
    <div className="min-h-screen bg-[#232323] text-white">
      <AdaptiveNav>
        {navigationItems}
      </AdaptiveNav>

      <main 
        className={`
          transition-all duration-300
          ${isMobile 
            ? 'mb-16 p-4' // Mobile styles
            : 'ml-20 p-6 sm:p-8' // Desktop and tablet styles
          }
        `}
      >
        <div className="max-w-6xl mx-auto bg-[#232323] rounded-xl shadow-2xl overflow-hidden">
          <header className="flex items-center px-4 h-12 bg-[#2A2A2A] border-b border-[#363636]" role="banner">
            <div className="flex space-x-2" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <h1 className="flex-1 text-center text-sm text-gray-400">John Jamora's Portfolio</h1>
          </header>

          <div className="p-4 sm:p-8">
            <section id="home" className="mb-12 sm:mb-16" aria-labelledby="home-title">
              <h2 id="home-title" className="text-3xl sm:text-4xl font-bold mb-2">John Jamora</h2>
              <p className="text-gray-400 text-lg sm:text-xl mb-4">Full-Stack Software Developer</p>
              <p className="text-gray-300 max-w-3xl text-sm sm:text-base">
                Bilingual software developer with 3+ years of experience in full-stack development, specializing in web 
                accessibility and inclusive design. Focused on creating user-friendly, accessible applications that make 
                a difference.
              </p>
            </section>

            <section id="about" className="mb-12 sm:mb-16" aria-labelledby="about-title">
              <h2 id="about-title" className="sr-only">Contact Information</h2>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link 
                  href="https://github.com/jam0ra" 
                  className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded p-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (opens in new tab)"
                >
                  <Github className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm sm:text-base">github.com/jam0ra</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/jam0ra" 
                  className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded p-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile (opens in new tab)"
                >
                  <Linkedin className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm sm:text-base">linkedin.com/in/jam0ra</span>
                </Link>
                <Link 
                  href="mailto:jjamora@sfu.ca" 
                  className="flex items-center text-gray-400 hover:text-[#1E90FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded p-2"
                  aria-label="Send email"
                >
                  <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="text-sm sm:text-base">jjamora@sfu.ca</span>
                </Link>
              </div>
            </section>

            <section id="experience" className="mb-12 sm:mb-16" aria-labelledby="experience-title">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-[#1E90FF] mr-2" aria-hidden="true" />
                <h2 id="experience-title" className="text-xl sm:text-2xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <ExperienceCard key={index} {...experience} />
                ))}
              </div>
            </section>

            <section id="projects" className="mb-12 sm:mb-16" aria-labelledby="projects-title">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-[#1E90FF] mr-2" aria-hidden="true" />
                <h2 id="projects-title" className="text-xl sm:text-2xl font-bold">Projects</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </section>

            <section id="education" className="mb-12 sm:mb-16" aria-labelledby="education-title">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-6 h-6 text-[#1E90FF] mr-2" aria-hidden="true" />
                <h2 id="education-title" className="text-xl sm:text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                <article className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">BS in Software Systems</h3>
                      <p className="text-[#1E90FF]">Simon Fraser University</p>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 sm:mt-0">Sep 2019 - Present</span>
                  </div>
                </article>
                <article className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6 hover:ring-1 hover:ring-[#1E90FF] transition-all">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">Web Accessibility Certification</h3>
                      <p className="text-[#1E90FF]">Deque University</p>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 sm:mt-0">2024</span>
                  </div>
                </article>
              </div>
            </section>

            <section id="technologies" aria-labelledby="technologies-title">
              <div className="flex items-center mb-6">
                <Wrench className="w-6 h-6 text-[#1E90FF] mr-2" aria-hidden="true" />
                <h2 id="technologies-title" className="text-xl sm:text-2xl font-bold">Technologies</h2>
              </div>
              <div className="bg-[#2A2A2A] rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Programming languages">
                  {technologies.languages.map((lang) => (
                    <span 
                      key={lang} 
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 text-sm sm:text-base rounded-full transition-colors"
                      role="listitem"
                    >
                      {lang}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-4">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Frameworks and tools">
                  {technologies.frameworks.map((framework) => (
                    <span 
                      key={framework} 
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 text-sm sm:text-base rounded-full transition-colors"
                      role="listitem"
                    >
                      {framework}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-4">Development Tools</h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Development tools">
                  {technologies.devTools.map((tool) => (
                    <span 
                      key={tool} 
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-[#323232] hover:bg-[#383838] text-gray-200 text-sm sm:text-base rounded-full transition-colors"
                      role="listitem"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}