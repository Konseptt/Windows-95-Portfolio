"use client"

import { createContext, useContext, type ReactNode } from "react"

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  category: string
  featured: boolean
  duration: string
}

interface Skill {
  name: string
  level: number
  category: string
  icon: string
}

interface Experience {
  company: string
  position: string
  duration: string
  description: string
  technologies: string[]
}

interface Achievement {
  title: string
  description: string
  icon: string
  date: string
}

interface Certification {
  name: string
  issuer: string
  date: string
  icon: string
}

interface PortfolioData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  social: {
    github: string
    linkedin: string
    twitter: string
    website: string
    leetcode: string
  }
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  achievements: Achievement[]
  certifications: Certification[]
  education: {
    degree: string
    institution: string
    duration: string
    cgpa: string
    details: string
  }[]
  languages: string[]
  papers: {
    title: string
    organization: string
    date: string
    description: string
  }[]
}

const portfolioData: PortfolioData = {
  name: "Ranjan Sharma",
  title: "Computer Science Engineering Student & Full Stack Developer",
  bio: "Passionate developer and researcher with expertise in systems programming, web development, and AI. Currently pursuing B.Tech CSE at GITAM with a CGPA of 9.53. Experienced in building programming languages, simulators, and web applications using cutting-edge technologies.",
  email: "hello@ranjansharma.info.np",
  phone: "+917483038659",
  location: "Visakhapatnam, India",
  social: {
    github: "https://github.com/konseptt",
    linkedin: "https://linkedin.com/in/ranjansharma",
    twitter: "https://twitter.com/thekonsept",
    website: "https://ranjansharma.info.np",
    leetcode: "https://leetcode.com/ranjansharma",
  },
  projects: [
    {
      id: "1",
      name: "LyangLang",
      description:
        "A programming language with natural Nepali-like syntax to make coding accessible to Nepali speakers. Built with Rust featuring lexer, parser, and interpreter.",
      technologies: ["Rust", "Cargo", "Custom Interpreter", "Language Design"],
      image: "/placeholder.svg?height=200&width=300",
      githubUrl: "https://github.com/konseptt/lyanglang",
      category: "Programming Languages",
      featured: true,
      duration: "Jun 2024 – Feb 2025",
    },
    {
      id: "2",
      name: "Page Fault Simulator",
      description:
        "Interactive simulator to visualize page replacement algorithms with step-by-step animations. Supports FIFO, LRU, Optimal, Clock, MRU algorithms with comparative analysis.",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Recharts"],
      image: "/placeholder.svg?height=200&width=300",
      demoUrl: "https://pagefault.ranjansharma.info.np",
      githubUrl: "https://github.com/konseptt/page-fault-simulator",
      category: "Web Development",
      featured: true,
      duration: "Mar 2024 – Nov 2024",
    },
    {
      id: "3",
      name: "Autonomous Vehicle Simulation",
      description:
        "2D simulation for autonomous vehicle control with AI for adaptive steering and pathfinding. Enhanced with genetic algorithms and realistic physics.",
      technologies: ["Rust", "Bevy Game Engine", "Rapier2D", "Genetic Algorithms"],
      image: "/placeholder.svg?height=200&width=300",
      githubUrl: "https://github.com/konseptt/autonomous-vehicle-sim",
      category: "AI/Simulation",
      featured: true,
      duration: "Jan 2023 – Jan 2024",
    },
    {
      id: "4",
      name: "Hashword CLI & Web App",
      description:
        "Secure password generation tool available as CLI and web application with Argon2id hashing for robust security.",
      technologies: ["Rust", "TypeScript", "Argon2id", "CLI Tools"],
      image: "/placeholder.svg?height=200&width=300",
      demoUrl: "https://hashword.ranjansharma.info.np",
      githubUrl: "https://github.com/konseptt/hashword",
      category: "Security Tools",
      featured: false,
      duration: "Apr 2022 – Sep 2022",
    },
    {
      id: "5",
      name: "Netflix-Inspired Web App",
      description:
        "User-friendly web application with custom themes, responsive design, and smooth navigation using React and Redux.",
      technologies: ["React", "Redux", "MUI", "TypeScript"],
      image: "/placeholder.svg?height=200&width=300",
      demoUrl: "https://netflix-clone.ranjansharma.info.np",
      githubUrl: "https://github.com/konseptt/netflix-clone",
      category: "Web Development",
      featured: false,
      duration: "Jun 2021 – Dec 2021",
    },
    {
      id: "6",
      name: "Code2Image",
      description:
        "Tool to convert code snippets into customizable images with various themes, syntax highlighting, and export options.",
      technologies: ["React", "NextUI", "TailwindCSS", "Zustand"],
      image: "/placeholder.svg?height=200&width=300",
      demoUrl: "https://code2image.ranjansharma.info.np",
      githubUrl: "https://github.com/konseptt/code2image",
      category: "Developer Tools",
      featured: false,
      duration: "Nov 2020 – Feb 2021",
    },
  ],
  skills: [
    { name: "Rust", level: 95, category: "Systems Programming", icon: "🦀" },
    { name: "Zig", level: 85, category: "Systems Programming", icon: "⚡" },
    { name: "Python", level: 90, category: "Backend", icon: "🐍" },
    { name: "JavaScript", level: 95, category: "Frontend", icon: "🟨" },
    { name: "TypeScript", level: 90, category: "Frontend", icon: "🔷" },
    { name: "React", level: 95, category: "Frontend", icon: "⚛️" },
    { name: "Next.js", level: 90, category: "Frontend", icon: "▲" },
    { name: "HTML/CSS", level: 95, category: "Frontend", icon: "🌐" },
    { name: "C/C++", level: 85, category: "Systems Programming", icon: "⚙️" },
    { name: "R", level: 75, category: "Data Science", icon: "📊" },
    { name: "Git", level: 90, category: "DevOps", icon: "🔧" },
    { name: "Linux", level: 85, category: "DevOps", icon: "🐧" },
  ],
  experience: [
    {
      company: "Gandhi Institute of Technology and Management (GITAM)",
      position: "B.Tech Computer Science Engineering Student",
      duration: "2023 – Present",
      description:
        "Pursuing Bachelor of Technology in Computer Science and Engineering with a CGPA of 9.53. Active in research projects and competitive programming.",
      technologies: ["Data Structures", "Algorithms", "System Design", "Software Engineering"],
    },
    {
      company: "St. Xavier's College, Nepal",
      position: "High School Graduate",
      duration: "2020 – 2022",
      description:
        "Completed Cambridge International GCE AS and A Level with distinction. Developed foundational programming skills and participated in various tech competitions.",
      technologies: ["Mathematics", "Physics", "Computer Science", "Research Methods"],
    },
  ],
  achievements: [
    {
      title: "LeetCode Contest Rating: 2,242",
      description: "Global ranking: 5,132/697,019, placing in top 0.78%. Earned the Guardian badge.",
      icon: "🏆",
      date: "2024",
    },
    {
      title: "Asteroid Detection Research",
      description: "Discovered over 100 preliminary asteroid detections using Astrometrica software.",
      icon: "🌌",
      date: "2021",
    },
    {
      title: "Academic Excellence",
      description: "Maintaining CGPA of 9.53 in Computer Science Engineering at GITAM University.",
      icon: "🎓",
      date: "2023-Present",
    },
  ],
  certifications: [
    {
      name: "Meta Back-End Developer Professional Certificate",
      issuer: "Meta",
      date: "2024",
      icon: "🔧",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta",
      date: "2024",
      icon: "🎨",
    },
    {
      name: "Introduction to Cyber Security Specialization",
      issuer: "NYU",
      date: "2023",
      icon: "🔒",
    },
    {
      name: "IBM Cybersecurity Analyst Professional Certificate",
      issuer: "IBM",
      date: "2023",
      icon: "🛡️",
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Gandhi Institute of Technology and Management (GITAM), India",
      duration: "2023 – Present",
      cgpa: "9.53",
      details: "Specializing in systems programming, AI, and software engineering",
    },
    {
      degree: "High School Degree",
      institution: "St. Xavier's College, Nepal",
      duration: "2020 – 2022",
      cgpa: "Distinction",
      details: "Cambridge International GCE AS and A Level",
    },
  ],
  languages: ["English", "Hindi", "Nepali", "Maithili"],
  papers: [
    {
      title:
        "Near-Earth Objects (NEO) 2030; Forecasting The Future Of NEO Studies And Youth Involvement For Sustainable Development Goals (SDGs)",
      organization: "Space Generation Advisory Council - Near Earth Object (NEO), GLEX-2021",
      date: "Jan 2021 - Dec 2021",
      description:
        "Provides insights into current trends, policies, and potential solutions for planetary protection, emphasizing youth involvement in NEO research development.",
    },
  ],
}

const PortfolioContext = createContext<PortfolioData | undefined>(undefined)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  return <PortfolioContext.Provider value={portfolioData}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
