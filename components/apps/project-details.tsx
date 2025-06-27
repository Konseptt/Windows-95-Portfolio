"use client"

interface ProjectDetailsProps {
  data?: { project?: any }
}

export default function ProjectDetails({ data }: ProjectDetailsProps) {
  const project = data?.project

  if (!project) {
    return (
      <div className="h-full bg-[#c0c0c0] p-4">
        <div className="bg-white border-2 border-[#808080] border-t-white border-l-white p-4 h-full">
          <div className="text-center">No project data available</div>
        </div>
      </div>
    )
  }

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
      {/* Menu Bar */}
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">File</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Edit</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">View</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Help</button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Project Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                📁
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
                <p className="text-sm text-gray-600">{project.category}</p>
                <p className="text-xs text-gray-500">{project.duration}</p>
              </div>
            </div>
            {project.featured && (
              <div className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 text-xs font-semibold">
                ⭐ Featured Project
              </div>
            )}
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">Description</h2>
            <p className="text-sm leading-relaxed text-gray-700">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links - Now Clickable */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-1">Project Links</h2>
            <div className="space-y-2">
              {project.demoUrl && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌐</span>
                  <button
                    onClick={() => handleLinkClick(project.demoUrl)}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm cursor-pointer bg-none border-none p-0"
                  >
                    Live Demo: {project.demoUrl}
                  </button>
                </div>
              )}
              {project.githubUrl && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💻</span>
                  <button
                    onClick={() => handleLinkClick(project.githubUrl)}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm cursor-pointer bg-none border-none p-0"
                  >
                    Source Code: {project.githubUrl}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-4 border border-gray-200">
            <h3 className="font-semibold text-sm mb-2">Project Information</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong>Category:</strong> {project.category}
              </div>
              <div>
                <strong>Duration:</strong> {project.duration}
              </div>
              <div>
                <strong>Status:</strong> {project.featured ? "Featured" : "Completed"}
              </div>
              <div>
                <strong>Tech Stack:</strong> {project.technologies.length} technologies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        Project Properties - {project.name}
      </div>
    </div>
  )
}
