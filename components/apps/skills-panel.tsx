"use client"

import { useState } from "react"
import { usePortfolio } from "../portfolio-context"

export default function SkillsPanel() {
  const portfolio = usePortfolio()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...Array.from(new Set(portfolio.skills.map((s) => s.category)))]
  const filteredSkills =
    selectedCategory === "all" ? portfolio.skills : portfolio.skills.filter((s) => s.category === selectedCategory)

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

      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-xl">🛠️</div>
          <div>
            <h2 className="text-lg font-bold">Skills & Technologies</h2>
            <p className="text-sm text-gray-600">Technical skills overview</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-bold mb-2 block">Category Filter:</label>
          <select
            className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="border border-gray-300 p-3 bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{skill.icon}</span>
                <div className="flex-1">
                  <span className="font-semibold text-sm">{skill.name}</span>
                  <div className="text-xs text-gray-600 mt-1">{skill.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-100 border border-gray-300">
          <h3 className="font-bold text-sm mb-2">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <strong>Total Skills:</strong> {portfolio.skills.length}
            </div>
            <div>
              <strong>Categories:</strong> {categories.length - 1}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {filteredSkills.length} skill(s) displayed
      </div>
    </div>
  )
}
