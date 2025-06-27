"use client"

import type React from "react"

import { useState } from "react"
import { useWindows } from "./window-context"
import { useSound } from "./sound-context"

interface StartMenuProps {
  onClose: () => void
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindows()
  const { playSound } = useSound()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 })

  const handleMenuClick = (action: () => void) => {
    playSound("click")
    action()
    onClose()
  }

  const handleSubmenuHover = (itemName: string, event: React.MouseEvent) => {
    setHoveredItem(itemName)
    const rect = event.currentTarget.getBoundingClientRect()
    setSubmenuPosition({ x: rect.right, y: rect.top })
  }

  const openApplication = (
    appName: string,
    component: string,
    title: string,
    size: { width: number; height: number },
    icon: string,
  ) => {
    openWindow({
      title,
      component,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 },
      size,
      icon,
    })
  }

  const menuItems = [
    {
      name: "Programs",
      icon: "📁",
      hasSubmenu: true,
      submenu: [
        {
          name: "Accessories",
          icon: "📁",
          hasSubmenu: true,
          submenu: [
            {
              name: "Notepad",
              icon: "📝",
              action: () =>
                openApplication("Notepad", "Notepad", "Untitled - Notepad", { width: 500, height: 400 }, "📝"),
            },
            {
              name: "Paint",
              icon: "🎨",
              action: () => openApplication("Paint", "Paint", "Paint", { width: 640, height: 480 }, "🎨"),
            },
            {
              name: "Calculator",
              icon: "🧮",
              action: () =>
                openApplication("Calculator", "Calculator", "Calculator", { width: 264, height: 330 }, "🧮"),
            },
            {
              name: "WordPad",
              icon: "📄",
              action: () =>
                openApplication("WordPad", "WordPad", "Document - WordPad", { width: 600, height: 450 }, "📄"),
            },
            {
              name: "Character Map",
              icon: "🔤",
              action: () =>
                openApplication("CharMap", "CharacterMap", "Character Map", { width: 400, height: 300 }, "🔤"),
            },
          ],
        },
        {
          name: "Games",
          icon: "🎮",
          hasSubmenu: true,
          submenu: [
            {
              name: "Minesweeper",
              icon: "💣",
              action: () =>
                openApplication("Minesweeper", "Minesweeper", "Minesweeper", { width: 300, height: 350 }, "💣"),
            },
            {
              name: "Solitaire",
              icon: "🃏",
              action: () => openApplication("Solitaire", "Solitaire", "Solitaire", { width: 800, height: 600 }, "🃏"),
            },
            {
              name: "FreeCell",
              icon: "🎴",
              action: () => openApplication("FreeCell", "FreeCell", "FreeCell", { width: 700, height: 500 }, "🎴"),
            },
            {
              name: "Hearts",
              icon: "♥️",
              action: () => openApplication("Hearts", "Hearts", "Hearts", { width: 600, height: 450 }, "♥️"),
            },
          ],
        },
        {
          name: "Internet Explorer",
          icon: "🌐",
          action: () => openApplication("IE", "WebBrowser", "Internet Explorer", { width: 800, height: 600 }, "🌐"),
        },
        {
          name: "Windows Explorer",
          icon: "📁",
          action: () =>
            openApplication("Explorer", "FileExplorer", "Exploring - My Computer", { width: 640, height: 480 }, "📁"),
        },
        {
          name: "MS-DOS Prompt",
          icon: "💻",
          action: () => openApplication("DOS", "Terminal", "MS-DOS Prompt", { width: 640, height: 400 }, "💻"),
        },
      ],
    },
    {
      name: "Documents",
      icon: "📄",
      action: () => openApplication("Documents", "FileExplorer", "My Documents", { width: 600, height: 400 }, "📄"),
    },
    {
      name: "Settings",
      icon: "⚙️",
      hasSubmenu: true,
      submenu: [
        {
          name: "Control Panel",
          icon: "⚙️",
          action: () =>
            openApplication("ControlPanel", "ControlPanel", "Control Panel", { width: 480, height: 360 }, "⚙️"),
        },
        {
          name: "Printers",
          icon: "🖨️",
          action: () => openApplication("Printers", "Printers", "Printers", { width: 400, height: 300 }, "🖨️"),
        },
        {
          name: "Taskbar...",
          icon: "📊",
          action: () =>
            openApplication("Taskbar", "TaskbarProperties", "Taskbar Properties", { width: 350, height: 250 }, "📊"),
        },
      ],
    },
    { separator: true },
    {
      name: "Find",
      icon: "🔍",
      hasSubmenu: true,
      submenu: [
        {
          name: "Files or Folders...",
          icon: "📁",
          action: () => openApplication("Find", "FindFiles", "Find: All Files", { width: 450, height: 350 }, "🔍"),
        },
        {
          name: "Computer...",
          icon: "💻",
          action: () =>
            openApplication("FindComputer", "FindComputer", "Find Computer", { width: 400, height: 200 }, "💻"),
        },
      ],
    },
    {
      name: "Help",
      icon: "❓",
      action: () => openApplication("Help", "Help", "Windows Help", { width: 500, height: 400 }, "❓"),
    },
    {
      name: "Run...",
      icon: "🏃",
      action: () => openApplication("Run", "RunDialog", "Run", { width: 350, height: 150 }, "🏃"),
    },
    { separator: true },
    {
      name: "Shut Down...",
      icon: "🔌",
      action: () =>
        openApplication("Shutdown", "ShutdownDialog", "Shut Down Windows", { width: 300, height: 200 }, "🔌"),
    },
  ]

  const renderSubmenu = (items: any[], level = 0) => (
    <div
      className="absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50 min-w-48"
      style={{
        left: level === 0 ? 256 : submenuPosition.x,
        top: level === 0 ? 0 : submenuPosition.y,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-sm transition-colors duration-75 relative"
          onClick={() => item.action && handleMenuClick(item.action)}
          onMouseEnter={(e) => item.hasSubmenu && handleSubmenuHover(item.name, e)}
        >
          <span className="mr-2 w-4">{item.icon}</span>
          <span className="flex-1">{item.name}</span>
          {item.hasSubmenu && <span className="ml-auto">▶</span>}
          {item.hasSubmenu && hoveredItem === item.name && renderSubmenu(item.submenu, level + 1)}
        </div>
      ))}
    </div>
  )

  return (
    <div className="start-menu absolute bottom-7 left-0 w-64 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg animate-slide-up z-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 text-sm font-bold flex items-center">
        <span className="mr-2 text-lg">🪟</span>
        Windows 95
      </div>
      <div className="p-1 relative">
        {menuItems.map((item, index) =>
          item.separator ? (
            <div key={index} className="h-px bg-[#808080] my-1 mx-2" />
          ) : (
            <div
              key={index}
              className="flex items-center px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-sm transition-colors duration-75 relative"
              onClick={() => !item.hasSubmenu && item.action && handleMenuClick(item.action)}
              onMouseEnter={(e) => item.hasSubmenu && handleSubmenuHover(item.name, e)}
              onMouseLeave={() => !item.hasSubmenu && setHoveredItem(null)}
            >
              <span className="mr-2 w-4">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.hasSubmenu && <span className="ml-auto">▶</span>}
              {item.hasSubmenu && hoveredItem === item.name && renderSubmenu(item.submenu)}
            </div>
          ),
        )}
      </div>
    </div>
  )
}
