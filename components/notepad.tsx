"use client"

import { useState } from "react"

export default function Notepad() {
  const [content, setContent] = useState("")

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
            Search
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Help
          </button>
        </div>
      </div>

      <div className="flex-1 p-1">
        <textarea
          className="w-full h-full resize-none border-2 border-[#808080] border-t-black border-l-black p-2 font-mono text-sm focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your text here..."
        />
      </div>
    </div>
  )
}
