"use client"

import { useState } from "react"
import { usePortfolio } from "../portfolio-context"
import WindowMenuBar from "../window-menu-bar"

export default function Resume() {
  const portfolio = usePortfolio()
  const [isModified, setIsModified] = useState(false)
  const [viewMode, setViewMode] = useState<"document" | "preview">("preview") // Default to PDF preview

  // Convert Google Drive view link to embed link
  const driveEmbedUrl = "https://drive.google.com/file/d/1dyYe-Of4aB8Eko1hhVVxhZmsOoLtY8eU/preview"

  const downloadResume = () => {
    // Direct download from Google Drive
    const downloadUrl = "https://drive.google.com/uc?export=download&id=1dyYe-Of4aB8Eko1hhVVxhZmsOoLtY8eU"
    window.open(downloadUrl, "_blank")
  }

  const saveResume = () => {
    const resumeContent = generateResumeText()
    localStorage.setItem("resume_content", resumeContent)
    alert("Resume saved successfully!")
    setIsModified(false)
  }

  const printResume = () => {
    if (viewMode === "preview") {
      // Print the embedded PDF
      const iframe = document.querySelector('iframe[src*="drive.google.com"]') as HTMLIFrameElement
      if (iframe) {
        iframe.contentWindow?.print()
      }
    } else {
      // Print the document view
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${portfolio.name} - Resume</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; border-bottom: 2px solid #333; }
                h2 { color: #666; border-bottom: 1px solid #ccc; }
                .contact { margin-bottom: 20px; }
              </style>
            </head>
            <body>
              ${generateResumeHTML()}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const generateResumeText = () => {
    return `
${portfolio.name}
${portfolio.title}
${portfolio.email} | ${portfolio.phone} | ${portfolio.location}

PROFESSIONAL SUMMARY
${portfolio.bio}

PROFESSIONAL EXPERIENCE
${portfolio.experience
  .map(
    (exp) => `
${exp.position} at ${exp.company} (${exp.duration})
${exp.description}
Technologies: ${exp.technologies.join(", ")}
`,
  )
  .join("\n")}

TECHNICAL SKILLS
${Array.from(new Set(portfolio.skills.map((s) => s.category)))
  .map(
    (category) => `
${category}:
${portfolio.skills
  .filter((s) => s.category === category)
  .map((s) => s.name)
  .join(", ")}
`,
  )
  .join("\n")}

KEY PROJECTS
${portfolio.projects
  .filter((p) => p.featured)
  .map(
    (project) => `
${project.name}
${project.description}
Technologies: ${project.technologies.join(", ")}
`,
  )
  .join("\n")}

EDUCATION
${portfolio.education
  .map(
    (edu) => `
${edu.degree}
${edu.institution} (${edu.duration})
CGPA: ${edu.cgpa}
`,
  )
  .join("\n")}
    `.trim()
  }

  const generateResumeHTML = () => {
    return `
      <h1>${portfolio.name}</h1>
      <div class="contact">
        <p><strong>${portfolio.title}</strong></p>
        <p>${portfolio.email} | ${portfolio.phone} | ${portfolio.location}</p>
      </div>
      
      <h2>Professional Summary</h2>
      <p>${portfolio.bio}</p>
      
      <h2>Professional Experience</h2>
      ${portfolio.experience
        .map(
          (exp) => `
        <div>
          <h3>${exp.position} at ${exp.company}</h3>
          <p><em>${exp.duration}</em></p>
          <p>${exp.description}</p>
          <p><strong>Technologies:</strong> ${exp.technologies.join(", ")}</p>
        </div>
      `,
        )
        .join("")}
      
      <h2>Technical Skills</h2>
      ${Array.from(new Set(portfolio.skills.map((s) => s.category)))
        .map(
          (category) => `
        <div>
          <h3>${category}</h3>
          <p>${portfolio.skills
            .filter((s) => s.category === category)
            .map((s) => s.name)
            .join(", ")}</p>
        </div>
      `,
        )
        .join("")}
    `
  }

  const menuItems = [
    {
      label: "File",
      items: [
        {
          label: "New",
          action: () => {
            if (isModified && !confirm("Discard changes?")) return
            setIsModified(false)
          },
          shortcut: "Ctrl+N",
        },
        {
          label: "Open...",
          action: () => {
            const content = localStorage.getItem("resume_content")
            if (content) {
              alert("Resume loaded from storage!")
            } else {
              alert("No saved resume found")
            }
          },
          shortcut: "Ctrl+O",
        },
        {
          label: "Save",
          action: saveResume,
          shortcut: "Ctrl+S",
        },
        {
          label: "Save As...",
          action: () => {
            const filename = prompt("Enter filename:", `${portfolio.name}_Resume`)
            if (filename) {
              saveResume()
              alert(`Resume saved as ${filename}`)
            }
          },
        },
        { separator: true },
        {
          label: "Page Setup...",
          action: () => alert("Page setup: A4, Portrait, 1 inch margins"),
        },
        {
          label: "Print Preview",
          action: () => {
            setViewMode("preview")
            alert("Switched to PDF preview mode")
          },
        },
        {
          label: "Print...",
          action: printResume,
          shortcut: "Ctrl+P",
        },
        { separator: true },
        {
          label: "Exit",
          action: () => {
            if (isModified && !confirm("Discard changes?")) return
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Copy All",
          action: () => {
            navigator.clipboard.writeText(generateResumeText())
            alert("Resume copied to clipboard!")
          },
          shortcut: "Ctrl+A, Ctrl+C",
        },
        { separator: true },
        {
          label: "Find...",
          action: () => {
            const searchTerm = prompt("Find what:")
            if (searchTerm) {
              alert(`Searching for: ${searchTerm}`)
            }
          },
          shortcut: "Ctrl+F",
        },
        {
          label: "Select All",
          action: () => {
            if (window.getSelection) {
              const selection = window.getSelection()
              const range = document.createRange()
              range.selectNodeContents(document.body)
              selection?.removeAllRanges()
              selection?.addRange(range)
            }
          },
          shortcut: "Ctrl+A",
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Document View",
          action: () => {
            setViewMode("document")
            alert("Switched to document view")
          },
        },
        {
          label: "PDF Preview",
          action: () => {
            setViewMode("preview")
            alert("Switched to PDF preview")
          },
        },
        { separator: true },
        {
          label: "Zoom In",
          action: () => {
            document.body.style.zoom = (Number.parseFloat(document.body.style.zoom || "1") + 0.1).toString()
          },
          shortcut: "Ctrl++",
        },
        {
          label: "Zoom Out",
          action: () => {
            document.body.style.zoom = Math.max(
              0.5,
              Number.parseFloat(document.body.style.zoom || "1") - 0.1,
            ).toString()
          },
          shortcut: "Ctrl+-",
        },
        {
          label: "Normal Size",
          action: () => {
            document.body.style.zoom = "1"
          },
          shortcut: "Ctrl+0",
        },
        { separator: true },
        {
          label: "Full Screen",
          action: () => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else {
              document.documentElement.requestFullscreen()
            }
          },
          shortcut: "F11",
        },
      ],
    },
    {
      label: "Tools",
      items: [
        {
          label: "Download Resume",
          action: downloadResume,
        },
        {
          label: "Email Resume",
          action: () => {
            const subject = encodeURIComponent(`Resume - ${portfolio.name}`)
            const body = encodeURIComponent(
              `Hi,\n\nPlease find my resume attached. You can also view it online at:\n${driveEmbedUrl}\n\nBest regards,\n${portfolio.name}`,
            )
            window.open(`mailto:?subject=${subject}&body=${body}`)
          },
        },
        {
          label: "Share Resume",
          action: () => {
            navigator.clipboard.writeText(driveEmbedUrl)
            alert("Resume link copied to clipboard!")
          },
        },
        {
          label: "Export as PDF",
          action: () => {
            window.open(driveEmbedUrl, "_blank")
          },
        },
        { separator: true },
        {
          label: "Word Count",
          action: () => {
            const text = generateResumeText()
            const words = text.split(/\s+/).length
            const chars = text.length
            alert(`Word Count: ${words} words, ${chars} characters`)
          },
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () =>
            alert(
              "Resume Viewer Help:\n- Use View menu to switch between document and PDF\n- Download button gets the latest version\n- Print works in both modes",
            ),
        },
        { separator: true },
        {
          label: "About Resume Viewer",
          action: () =>
            alert(
              "Resume Viewer\nVersion 1.0\nPart of Windows 95 Portfolio Edition\n\nIntegrated with Google Drive for live updates",
            ),
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <WindowMenuBar menus={menuItems} />

      {/* Toolbar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={() => setIsModified(false)}
            title="New"
          >
            📄 New
          </button>
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={saveResume}
            title="Save"
          >
            💾 Save
          </button>
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={printResume}
            title="Print"
          >
            🖨️ Print
          </button>
          <div className="w-px h-6 bg-[#808080] mx-1" />
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={downloadResume}
            title="Download"
          >
            📥 Download
          </button>
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={() => {
              const subject = encodeURIComponent(`Resume - ${portfolio.name}`)
              const body = encodeURIComponent(`Please find my resume: ${driveEmbedUrl}`)
              window.open(`mailto:?subject=${subject}&body=${body}`)
            }}
            title="Email"
          >
            📧 Email
          </button>
          <div className="w-px h-6 bg-[#808080] mx-1" />
          <button
            className={`px-2 py-1 border border-[#808080] text-xs hover:bg-[#d0d0d0] ${viewMode === "document" ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080]" : "bg-[#c0c0c0] border-t-white border-l-white"}`}
            onClick={() => setViewMode("document")}
            title="Document View"
          >
            📝 Doc
          </button>
          <button
            className={`px-2 py-1 border border-[#808080] text-xs hover:bg-[#d0d0d0] ${viewMode === "preview" ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080]" : "bg-[#c0c0c0] border-t-white border-l-white"}`}
            onClick={() => setViewMode("preview")}
            title="PDF Preview"
          >
            📄 PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "preview" ? (
          <div className="h-full w-full">
            <iframe
              src={driveEmbedUrl}
              className="w-full h-full border-none"
              title="Resume PDF Preview"
              allow="autoplay"
            />
          </div>
        ) : (
          <div className="h-full bg-white p-6 overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header */}
              <div className="text-center border-b-2 border-black pb-4">
                <h1 className="text-2xl font-bold">{portfolio.name}</h1>
                <p className="text-lg text-gray-700">{portfolio.title}</p>
                <div className="text-sm text-gray-600 mt-2">
                  {portfolio.email} | {portfolio.phone} | {portfolio.location}
                </div>
                <div className="mt-2">
                  <a
                    href={driveEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📄 View Latest PDF Version
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-2">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm leading-relaxed">{portfolio.bio}</p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-2">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  {portfolio.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-sm">{exp.position}</h3>
                          <p className="text-sm text-gray-700">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      <p className="text-sm mt-1 leading-relaxed">{exp.description}</p>
                      <div className="text-xs text-gray-600 mt-1">
                        <strong>Technologies:</strong> {exp.technologies.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-2">TECHNICAL SKILLS</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from(new Set(portfolio.skills.map((s) => s.category))).map((category) => (
                    <div key={category}>
                      <h3 className="font-bold text-sm mb-1">{category}</h3>
                      <div className="text-sm">
                        {portfolio.skills
                          .filter((s) => s.category === category)
                          .map((s) => s.name)
                          .join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-2">KEY PROJECTS</h2>
                <div className="space-y-3">
                  {portfolio.projects
                    .filter((p) => p.featured)
                    .map((project, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-sm">{project.name}</h3>
                        <p className="text-sm leading-relaxed">{project.description}</p>
                        <div className="text-xs text-gray-600">
                          <strong>Technologies:</strong> {project.technologies.join(", ")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-lg font-bold border-b border-gray-400 mb-2">EDUCATION</h2>
                <div className="space-y-2">
                  {portfolio.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-sm">{edu.degree}</h3>
                      <p className="text-sm text-gray-700">{edu.institution}</p>
                      <div className="text-xs text-gray-600">
                        {edu.duration} | CGPA: {edu.cgpa}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {viewMode === "preview" ? "PDF Preview Mode" : "Document View Mode"} |{isModified ? " Modified" : " Ready"} |
        Google Drive Integration Active
      </div>
    </div>
  )
}
