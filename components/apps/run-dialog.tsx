"use client"

import type React from "react"

import { useState } from "react"
import { useWindows } from "../window-context"

export default function RunDialog() {
  const { openWindow, closeWindow } = useWindows()
  const [command, setCommand] = useState("")

  const handleRun = () => {
    const cmd = command.toLowerCase().trim()

    // Handle common Windows 95 commands
    switch (cmd) {
      case "notepad":
        openWindow({
          title: "Untitled - Notepad",
          component: "Notepad",
          isMinimized: false,
          isMaximized: false,
          position: { x: 150, y: 150 },
          size: { width: 500, height: 400 },
          icon: "📝",
        })
        break
      case "calc":
      case "calculator":
        openWindow({
          title: "Calculator",
          component: "Calculator",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 200 },
          size: { width: 264, height: 330 },
          icon: "🧮",
        })
        break
      case "mspaint":
      case "paint":
        openWindow({
          title: "Paint",
          component: "Paint",
          isMinimized: false,
          isMaximized: false,
          position: { x: 250, y: 250 },
          size: { width: 640, height: 480 },
          icon: "🎨",
        })
        break
      case "explorer":
        openWindow({
          title: "Exploring - My Computer",
          component: "FileExplorer",
          isMinimized: false,
          isMaximized: false,
          position: { x: 300, y: 300 },
          size: { width: 640, height: 480 },
          icon: "📁",
        })
        break
      case "cmd":
      case "command":
        openWindow({
          title: "MS-DOS Prompt",
          component: "Terminal",
          isMinimized: false,
          isMaximized: false,
          position: { x: 350, y: 350 },
          size: { width: 640, height: 400 },
          icon: "💻",
        })
        break
      case "control":
        openWindow({
          title: "Control Panel",
          component: "ControlPanel",
          isMinimized: false,
          isMaximized: false,
          position: { x: 400, y: 400 },
          size: { width: 480, height: 360 },
          icon: "⚙️",
        })
        break
      case "winmine":
      case "minesweeper":
        openWindow({
          title: "Minesweeper",
          component: "Minesweeper",
          isMinimized: false,
          isMaximized: false,
          position: { x: 450, y: 450 },
          size: { width: 300, height: 350 },
          icon: "💣",
        })
        break
      case "sol":
      case "solitaire":
        openWindow({
          title: "Solitaire",
          component: "Solitaire",
          isMinimized: false,
          isMaximized: false,
          position: { x: 500, y: 500 },
          size: { width: 800, height: 600 },
          icon: "🃏",
        })
        break
      default:
        if (cmd.startsWith("http://") || cmd.startsWith("https://") || cmd.includes(".com") || cmd.includes(".org")) {
          openWindow({
            title: "Internet Explorer",
            component: "WebBrowser",
            isMinimized: false,
            isMaximized: false,
            position: { x: 100, y: 100 },
            size: { width: 800, height: 600 },
            icon: "🌐",
            data: { url: cmd.startsWith("http") ? cmd : `https://${cmd}` },
          })
        } else {
          alert(`Cannot find '${command}'. Make sure you typed the name correctly, and then try again.`)
        }
    }

    setCommand("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRun()
    }
  }

  return (
    <div className="h-full bg-[#c0c0c0] p-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 flex items-center justify-center text-white text-lg">🏃</div>
        <div>
          <div className="font-bold text-sm">Run</div>
          <div className="text-xs text-gray-600">
            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Open:</label>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm focus:outline-none"
          placeholder="Type a command..."
          autoFocus
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={handleRun}
        >
          OK
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={() => {
            // Close dialog
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={() => alert("Browse dialog would open here")}
        >
          Browse...
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-100 border border-gray-300 text-xs">
        <div className="font-semibold mb-1">Common Commands:</div>
        <div>notepad, calc, paint, explorer, cmd, control, winmine, sol</div>
        <div className="mt-1">You can also type URLs like: google.com, github.com</div>
      </div>
    </div>
  )
}
