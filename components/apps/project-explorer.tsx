"use client"

import { useState } from "react"
import { usePortfolio } from "../portfolio-context"
import { useWindows } from "../window-context"

export default function ProjectExplorer() {
  const portfolio = usePortfolio()
  const { openWindow } = useWindows()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"icons" | "list">("icons")
  const [filter, setFilter] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(portfolio.projects.map((p) => p.category)))]
  const filteredProjects =
    filter === "all" ? portfolio.projects : portfolio.projects.filter((p) => p.category === filter)

  const openProjectDetails = (project: any) => {
    openWindow({
      title: `${project.name} - Properties`,
      component: "ProjectDetails",
      isMinimized: false,
      isMaximized: false,
      position: { x: 150, y: 150 },
      size: { width: 480, height: 360 },
      data: { project },
      icon: "📁",
    })
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">File</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Edit</button>
          <button
            className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white"
            onClick={() => setViewMode(viewMode === "icons" ? "list" : "icons")}
          >
            View
          </button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Help</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <select
          className="px-1 py-0 border border-[#808080] text-xs h-5"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <div className="flex space-x-1">
          <button
            className={`px-2 py-0 border text-xs h-5 ${viewMode === "icons" ? "bg-[#d0d0d0] border-[#808080]" : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"}`}
            onClick={() => setViewMode("icons")}
          >
            Icons
          </button>
          <button
            className={`px-2 py-0 border text-xs h-5 ${viewMode === "list" ? "bg-[#d0d0d0] border-[#808080]" : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"}`}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white p-2 overflow-auto">
        {viewMode === "icons" ? (
          <div className="grid grid-cols-4 gap-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`flex flex-col items-center p-2 cursor-pointer border ${
                  selectedProject === project.id
                    ? "border-blue-500 bg-blue-100"
                    : "border-transparent hover:bg-gray-100"
                }`}
                onClick={() => setSelectedProject(project.id)}
                onDoubleClick={() => openProjectDetails(project)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl mb-1">
                  📁
                </div>
                <div className="text-xs text-center font-semibold leading-tight">{project.name}</div>
                <div className="text-xs text-gray-500 text-center">{project.category}</div>
                {project.featured && <div className="text-xs bg-yellow-200 px-1">⭐</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            <div className="grid grid-cols-4 gap-2 p-1 bg-[#c0c0c0] border-b border-[#808080] text-xs font-bold">
              <div>Name</div>
              <div>Category</div>
              <div>Technologies</div>
              <div>Duration</div>
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`grid grid-cols-4 gap-2 p-1 cursor-pointer text-xs border-b border-gray-200 ${
                  selectedProject === project.id ? "bg-blue-100" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedProject(project.id)}
                onDoubleClick={() => openProjectDetails(project)}
              >
                <div className="font-semibold">{project.name}</div>
                <div>{project.category}</div>
                <div className="truncate">{project.technologies.slice(0, 2).join(", ")}</div>
                <div>{project.duration}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {filteredProjects.length} object(s) | {portfolio.projects.filter((p) => p.featured).length} featured
      </div>
    </div>
  )
}
