"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { usePortfolio } from "../portfolio-context"

export default function Terminal() {
  const portfolio = usePortfolio()
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows 95 Portfolio Edition [Version 4.00.950]",
    "(C) Copyright Microsoft Corp 1981-1995.",
    "",
    "Welcome to my portfolio terminal!",
    "Type 'help' for available commands.",
    "",
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [currentPath, setCurrentPath] = useState("C:\\Portfolio>")
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: () => [
      "Available commands:",
      "  help       - Show this help message",
      "  about      - Display information about me",
      "  skills     - List my technical skills",
      "  projects   - Show my projects",
      "  experience - Display work experience",
      "  contact    - Show contact information",
      "  clear      - Clear the terminal",
      "  dir        - List directory contents",
      "  cd         - Change directory",
      "  whoami     - Display current user",
      "  date       - Show current date and time",
      "  ver        - Show system version",
      "",
    ],
    about: () => [
      `Name: ${portfolio.name}`,
      `Title: ${portfolio.title}`,
      `Location: ${portfolio.location}`,
      "",
      portfolio.bio,
      "",
    ],
    skills: () => [
      "Technical Skills:",
      ...portfolio.skills.map(
        (skill) => `  ${skill.icon} ${skill.name.padEnd(15)} - ${skill.level}% (${skill.category})`,
      ),
      "",
    ],
    projects: () => [
      "Projects:",
      ...portfolio.projects.map((project) => `  📁 ${project.name} - ${project.description}`),
      "",
    ],
    experience: () => [
      "Work Experience:",
      ...portfolio.experience.map((exp) => `  🏢 ${exp.position} at ${exp.company} (${exp.duration})`),
      "",
    ],
    contact: () => [
      "Contact Information:",
      `  📧 Email: ${portfolio.email}`,
      `  📱 Phone: ${portfolio.phone}`,
      `  🔗 GitHub: ${portfolio.social.github}`,
      `  🔗 LinkedIn: ${portfolio.social.linkedin}`,
      "",
    ],
    clear: () => {
      setHistory([])
      return []
    },
    dir: () => [
      "Directory of C:\\Portfolio",
      "",
      "12/25/2024  10:30 AM    <DIR>          .",
      "12/25/2024  10:30 AM    <DIR>          ..",
      "12/25/2024  10:30 AM    <DIR>          Projects",
      "12/25/2024  10:30 AM    <DIR>          Skills",
      "12/25/2024  10:30 AM    <DIR>          Experience",
      "12/25/2024  10:30 AM         1,024     README.TXT",
      "12/25/2024  10:30 AM         2,048     RESUME.DOC",
      "               2 File(s)          3,072 bytes",
      "               3 Dir(s)   999,999,999 bytes free",
      "",
    ],
    cd: (args: string[]) => {
      if (args.length === 0) {
        return ["Current directory: C:\\Portfolio", ""]
      }
      const dir = args[0].toLowerCase()
      if (["projects", "skills", "experience"].includes(dir)) {
        setCurrentPath(`C:\\Portfolio\\${dir.charAt(0).toUpperCase() + dir.slice(1)}>`)
        return [`Changed to C:\\Portfolio\\${dir.charAt(0).toUpperCase() + dir.slice(1)}`, ""]
      }
      return [`The system cannot find the path specified: ${args[0]}`, ""]
    },
    whoami: () => [`${portfolio.name} (Portfolio Owner)`, ""],
    date: () => [new Date().toLocaleString(), ""],
    ver: () => ["Windows 95 Portfolio Edition Version 4.00.950", ""],
  }

  const executeCommand = (input: string) => {
    const [command, ...args] = input.toLowerCase().trim().split(" ")

    if (command === "") return []

    if (commands[command as keyof typeof commands]) {
      return (commands[command as keyof typeof commands] as any)(args)
    } else {
      return [
        `'${command}' is not recognized as an internal or external command,`,
        "operable program or batch file.",
        "",
      ]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newHistory = [...history, `${currentPath} ${currentInput}`, ...executeCommand(currentInput)]

    setHistory(newHistory)
    setCurrentInput("")
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm flex flex-col">
      <div ref={terminalRef} className="flex-1 p-2 overflow-auto whitespace-pre-wrap">
        {history.map((line, index) => (
          <div key={index}>{line}</div>
        ))}

        <form onSubmit={handleSubmit} className="flex">
          <span className="text-green-400">{currentPath} </span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none border-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}
