"use client"

import { useState } from "react"

interface FileExplorerProps {
  data?: { path?: string }
}

export default function FileExplorer({ data }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState(data?.path || "My Computer")

  const folders = [
    { name: "My Documents", icon: "📁", type: "folder" },
    { name: "Desktop", icon: "📁", type: "folder" },
    { name: "Program Files", icon: "📁", type: "folder" },
    { name: "Windows", icon: "📁", type: "folder" },
    { name: "System", icon: "📁", type: "folder" },
  ]

  const files = [
    { name: "readme.txt", icon: "📄", type: "file", size: "1 KB" },
    { name: "config.sys", icon: "⚙️", type: "file", size: "2 KB" },
    { name: "autoexec.bat", icon: "📄", type: "file", size: "1 KB" },
  ]

  const items = currentPath === "My Computer" ? folders : [...folders.slice(0, 2), ...files]

  return (
    <div className="h-full flex flex-col">
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            File
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Edit
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            View
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Help
          </button>
        </div>
      </div>

      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <span className="text-xs">Address: {currentPath}</span>
      </div>

      <div className="flex-1 bg-white p-2 overflow-auto">
        <div className="grid grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 hover:bg-blue-100 cursor-pointer rounded"
              onDoubleClick={() => {
                if (item.type === "folder") {
                  setCurrentPath(item.name)
                }
              }}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-center">{item.name}</div>
              {item.size && <div className="text-xs text-gray-500">{item.size}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {items.length} object(s)
      </div>
    </div>
  )
}
