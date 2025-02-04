import { ExperienceCardProps, ProjectCardProps } from './components';

export const experiences: ExperienceCardProps[] = [
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

export const projects: ProjectCardProps[] = [
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

export const technologies = {
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