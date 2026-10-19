/* ═══════════════════════════════════════════════════
   resume.ts — ALL text content lives here.
   Edit this file to update every word on the site.
═══════════════════════════════════════════════════ */

/* ── Type definitions ── */

export interface Highlight {
  text: string;
  color: 'yellow' | 'mint';
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  date: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export type ProjectDoodle = 'pdf' | 'face-check' | 'huffman';

export interface Project {
  title: string;
  date: string;
  link: string;
  linkLabel: string;
  doodle: ProjectDoodle;
  desc: string;
}

export interface CourseEntry {
  name: string;
  org: string;
  date: string;
  desc: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  pitch: string;
  summary: string;
  highlights: Highlight[];
  education: Education;
  experience: ExperienceEntry[];
  skills: SkillCategory[];
  projects: Project[];
  courses: CourseEntry[];
  contact: ContactInfo;
}

/* ── Content ── */

export const resume: ResumeData = {
  name: 'Mohamed Hussein Tammaa',
  title: 'Software Engineer · Junior Backend Developer',
  location: 'Cairo, Egypt',
  pitch:
    'I build reliable, scalable backends that solve real problems and hold up under pressure.',

  summary:
    'Junior Backend Developer focused on building reliable and scalable systems that solve real-world problems. Passionate about designing backend architectures that are efficient, maintainable, and capable of supporting growth and real-time interactions. Possesses a solid foundation in software engineering along with hands-on experience in developing APIs and data-driven applications. Continuously learning and refining skills to deliver high-quality backend solutions and contribute to meaningful products.',

  highlights: [
    { text: 'reliable and scalable', color: 'yellow' },
    { text: 'efficient, maintainable', color: 'mint' },
    { text: 'high-quality backend', color: 'yellow' },
  ],

  education: {
    school: 'ElShorouk Academy',
    degree: "Bachelor's Degree in Computer Science",
    location: 'Cairo, Egypt',
    date: 'Sep 2022 – Aug 2026',
  },

  experience: [
    {
      role: 'Backend Engineer',
      company: 'Centr (E-Learning Platform)',
      location: 'Cairo, Egypt',
      date: '15 Aug 2026 – Present',
      bullets: [
        'Engineered core administrative systems, access control, and centralized logging infrastructure for the e-learning platform.',
        'Architected and implemented end-to-end CI/CD pipelines, automating testing, builds, and deployment workflows.',
        'Configured production servers and managed cloud deployment environments, ensuring system reliability and uptime.',
      ],
    },
    {
      role: 'Intern',
      company: 'EALB (Egyptian Arab Land Bank)',
      location: 'Giza, Egypt',
      date: 'Jul – Aug 2025',
      bullets: [
        'Gained hands-on experience with core banking systems, focusing on database security, data integrity, and access control.',
        'Collaborated with IT and cross-functional teams to resolve system and compatibility issues.',
      ],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['C#', 'C++', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'Rust', 'HTML', 'CSS'],
    },
    { category: 'Frameworks', items: ['Node.js', 'Express', 'RESTful Services'] },
    { category: 'Databases', items: ['MS SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'GitLab'] },
    { category: 'Concepts', items: ['OOP', 'SDLC', 'Agile', 'CI/CD'] },
    { category: 'AI', items: ['GenAI', 'AI-powered tools'] },
    {
      category: 'Soft Skills',
      items: [
        'Problem-solving',
        'Debugging',
        'Performance Opt.',
        'Teamwork',
        'Communication',
        'Adaptability',
        'Time Management',
        'Critical Thinking',
      ],
    },
  ],

  projects: [
    {
      title: 'AmpliCV',
      date: 'Mar 2026',
      link: 'https://amplicv.com',
      linkLabel: 'amplicv.com',
      doodle: 'pdf',
      desc: 'LaTeX-based PDF generation for ATS-friendly resumes. Job-tracking module, AI-driven suggestions, conversational chat agent, controller-service APIs, and a full CI/CD pipeline deployed on public cloud.',
    },
    {
      title: 'FixPay',
      date: 'Nov 2025',
      link: '#fixpay-placeholder',
      linkLabel: 'private repo',
      doodle: 'face-check',
      desc: 'On-demand home-service marketplace. Led cross-functional teams (mobile, backend, frontend). Implemented identity verification via AI face recognition, a rating system, and a task-offer-selection workflow.',
    },
    {
      title: 'Huffman Compression Tool',
      date: 'Jan 2024',
      link: 'https://github.com/MohamedHusseinTammaa/Compression_Tool',
      linkLabel: 'GitHub Repo',
      doodle: 'huffman',
      desc: 'High-performance Huffman coding utility achieving up to 40% lossless compression. Optimised data structures for 30% faster encode/decode, preserving 100% data integrity for text and image files.',
    },
  ],

  courses: [
    {
      name: 'Backend Using .NET',
      org: 'DEPI — Digital Egypt Pioneers Initiative',
      date: 'Jun 2024',
      desc: 'Intensive backend training with ASP.NET Core MVC. Built full-stack projects, APIs, and databases. Advanced skills in C#, JavaScript, SQL, and software development best practices.',
    },
  ],

  contact: {
    email: 'muhamed.tammaa@gmail.com',
    phone: '+201118707169',
    linkedin: 'linkedin.com/in/mohamed--hussein-career/',
    github: 'github.com/MohamedHusseinTammaa',
  },
};
