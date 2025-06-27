"use client"

import { usePortfolio } from "../portfolio-context"

export default function SystemInfo() {
  const portfolio = usePortfolio()

  const systemSpecs = {
    os: "Windows 95 Portfolio Edition",
    version: "4.00.950 Build 1212",
    processor: "Creative Mind v3.0 @ 2.4 GHz",
    memory: "Unlimited Ideas RAM",
    storage: "∞ TB Available Space",
    graphics: "Imagination Graphics Accelerator",
    network: "High-Speed Internet Connection",
    uptime: "24/7 Availability",
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

      <div className="flex-1 p-4 overflow-auto">
        {/* System Overview */}
        <div className="border border-[#808080] p-4 mb-4 bg-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
              💻
            </div>
            <div>
              <h2 className="text-lg font-bold">{portfolio.name}'s Portfolio System</h2>
              <p className="text-sm text-gray-600">{systemSpecs.os}</p>
              <p className="text-xs text-gray-500">Version {systemSpecs.version}</p>
            </div>
          </div>
        </div>

        {/* System Specifications */}
        <div className="border border-[#808080] p-4 mb-4 bg-white">
          <h3 className="font-bold text-sm mb-3 border-b border-gray-300 pb-1">System Specifications</h3>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold">Operating System:</span>
              <span>{systemSpecs.os}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Processor:</span>
              <span>{systemSpecs.processor}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Memory (RAM):</span>
              <span>{systemSpecs.memory}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Storage:</span>
              <span>{systemSpecs.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Graphics:</span>
              <span>{systemSpecs.graphics}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Network:</span>
              <span>{systemSpecs.network}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">System Uptime:</span>
              <span>{systemSpecs.uptime}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Statistics */}
        <div className="border border-[#808080] p-4 mb-4 bg-white">
          <h3 className="font-bold text-sm mb-3 border-b border-gray-300 pb-1">Portfolio Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold mb-1">Projects</div>
              <div>Total Projects: {portfolio.projects.length}</div>
              <div>Featured Projects: {portfolio.projects.filter((p) => p.featured).length}</div>
              <div>Categories: {Array.from(new Set(portfolio.projects.map((p) => p.category))).length}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Skills & Experience</div>
              <div>Technical Skills: {portfolio.skills.length}</div>
              <div>Certifications: {portfolio.certifications.length}</div>
              <div>Languages: {portfolio.languages.length}</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border border-[#808080] p-4 mb-4 bg-white">
          <h3 className="font-bold text-sm mb-3 border-b border-gray-300 pb-1">Performance Status</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>CPU Usage (Creativity)</span>
                <span>Excellent</span>
              </div>
              <div className="w-full bg-gray-200 h-2 border border-[#808080]">
                <div className="h-full bg-green-500" style={{ width: "95%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Memory Usage (Ideas)</span>
                <span>Very Good</span>
              </div>
              <div className="w-full bg-gray-200 h-2 border border-[#808080]">
                <div className="h-full bg-blue-500" style={{ width: "87%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Innovation Level</span>
                <span>Outstanding</span>
              </div>
              <div className="w-full bg-gray-200 h-2 border border-[#808080]">
                <div className="h-full bg-purple-500" style={{ width: "92%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Problem Solving</span>
                <span>Exceptional</span>
              </div>
              <div className="w-full bg-gray-200 h-2 border border-[#808080]">
                <div className="h-full bg-orange-500" style={{ width: "98%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border border-[#808080] p-4 bg-white">
          <h3 className="font-bold text-sm mb-3 border-b border-gray-300 pb-1">Recent System Activity</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>🚀 LyangLang project updated</span>
              <span>2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span>📊 Page Fault Simulator deployed</span>
              <span>1 day ago</span>
            </div>
            <div className="flex justify-between">
              <span>🏆 LeetCode contest completed</span>
              <span>3 days ago</span>
            </div>
            <div className="flex justify-between">
              <span>📝 Portfolio system optimized</span>
              <span>1 week ago</span>
            </div>
            <div className="flex justify-between">
              <span>🎓 Academic performance updated</span>
              <span>2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        System Status: Optimal | Last Updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  )
}
