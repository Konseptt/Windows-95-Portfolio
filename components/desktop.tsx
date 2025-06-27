"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useWindows } from "./window-context"
import { useSound } from "./sound-context"
import DesktopIcon from "./desktop-icon"
import ContextMenu from "./context-menu"

export default function Desktop() {
  const { openWindow } = useWindows()
  const { playSound } = useSound()
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })
  const [showIcons, setShowIcons] = useState(true)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [wallpaper, setWallpaper] = useState("#008080")
  const desktopRef = useRef<HTMLDivElement>(null)

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    playSound("click")
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    })
  }

  const handleClick = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }))
    setSelectedIcon(null)
  }

  const handleWallpaperChange = (newWallpaper: string) => {
    const wallpaperColors: { [key: string]: string } = {
      teal: "#008080",
      blue: "#0066cc",
      green: "#006600",
      purple: "#663399",
      red: "#cc0000",
      black: "#000000",
    }
    setWallpaper(wallpaperColors[newWallpaper] || "#008080")
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu((prev) => ({ ...prev, visible: false }))
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Windows 95 desktop icon grid - 4 columns, proper spacing
  const desktopIcons = [
    {
      id: "about",
      name: "About Ranjan",
      icon: "👨‍💻",
      gridPosition: { col: 0, row: 0 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "About Ranjan Sharma - System Properties",
          component: "AboutMe",
          isMinimized: false,
          isMaximized: false,
          position: { x: 100, y: 100 },
          size: { width: 480, height: 360 },
          icon: "👨‍💻",
        })
      },
    },
    {
      id: "projects",
      name: "My Projects",
      icon: "📁",
      gridPosition: { col: 0, row: 1 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "My Projects",
          component: "ProjectExplorer",
          isMinimized: false,
          isMaximized: false,
          position: { x: 120, y: 120 },
          size: { width: 640, height: 480 },
          icon: "📁",
        })
      },
    },
    {
      id: "skills",
      name: "Skills & Tech",
      icon: "⚡",
      gridPosition: { col: 0, row: 2 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Skills & Technologies",
          component: "SkillsPanel",
          isMinimized: false,
          isMaximized: false,
          position: { x: 140, y: 140 },
          size: { width: 560, height: 420 },
          icon: "⚡",
        })
      },
    },
    {
      id: "resume",
      name: "Resume",
      icon: "📄",
      gridPosition: { col: 0, row: 3 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Resume - Notepad",
          component: "Resume",
          isMinimized: false,
          isMaximized: false,
          position: { x: 160, y: 160 },
          size: { width: 600, height: 450 },
          icon: "📄",
        })
      },
    },
    {
      id: "contact",
      name: "Contact Me",
      icon: "📧",
      gridPosition: { col: 0, row: 4 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Contact Form",
          component: "ContactForm",
          isMinimized: false,
          isMaximized: false,
          position: { x: 180, y: 180 },
          size: { width: 400, height: 350 },
          icon: "📧",
        })
      },
    },
    {
      id: "achievements",
      name: "Achievements",
      icon: "🏆",
      gridPosition: { col: 0, row: 5 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Achievements & Certifications",
          component: "Achievements",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 200 },
          size: { width: 520, height: 400 },
          icon: "🏆",
        })
      },
    },
    {
      id: "terminal",
      name: "MS-DOS Prompt",
      icon: "💻",
      gridPosition: { col: 1, row: 0 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "MS-DOS Prompt",
          component: "Terminal",
          isMinimized: false,
          isMaximized: false,
          position: { x: 220, y: 220 },
          size: { width: 640, height: 400 },
          icon: "💻",
        })
      },
    },
    {
      id: "paint",
      name: "Paint",
      icon: "🎨",
      gridPosition: { col: 1, row: 1 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Paint",
          component: "Paint",
          isMinimized: false,
          isMaximized: false,
          position: { x: 240, y: 240 },
          size: { width: 640, height: 480 },
          icon: "🎨",
        })
      },
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: "🧮",
      gridPosition: { col: 1, row: 2 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Calculator",
          component: "Calculator",
          isMinimized: false,
          isMaximized: false,
          position: { x: 260, y: 260 },
          size: { width: 264, height: 330 },
          icon: "🧮",
        })
      },
    },
    {
      id: "games",
      name: "Games",
      icon: "🎮",
      gridPosition: { col: 1, row: 3 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Games",
          component: "GamesFolder",
          isMinimized: false,
          isMaximized: false,
          position: { x: 280, y: 280 },
          size: { width: 400, height: 300 },
          icon: "🎮",
        })
      },
    },
    {
      id: "media",
      name: "Media Player",
      icon: "🎵",
      gridPosition: { col: 1, row: 4 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Media Player",
          component: "MusicPlayer",
          isMinimized: false,
          isMaximized: false,
          position: { x: 300, y: 300 },
          size: { width: 480, height: 360 },
          icon: "🎵",
        })
      },
    },
    {
      id: "recycle",
      name: "Recycle Bin",
      icon: "🗑️",
      gridPosition: { col: 1, row: 5 },
      onDoubleClick: () => {
        playSound("open")
        openWindow({
          title: "Recycle Bin",
          component: "RecycleBin",
          isMinimized: false,
          isMaximized: false,
          position: { x: 320, y: 320 },
          size: { width: 480, height: 360 },
          icon: "🗑️",
        })
      },
    },
  ]

  const getIconPosition = (col: number, row: number) => {
    const iconWidth = 75
    const iconHeight = 80
    const marginLeft = 8
    const marginTop = 8

    return {
      x: marginLeft + col * iconWidth,
      y: marginTop + row * iconHeight,
    }
  }

  return (
    <div
      ref={desktopRef}
      className="desktop-background absolute inset-0 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: wallpaper }}
      onContextMenu={handleRightClick}
      onClick={handleClick}
    >
      {/* Desktop icons with proper Windows 95 grid positioning */}
      {showIcons &&
        desktopIcons.map((icon) => {
          const position = getIconPosition(icon.gridPosition.col, icon.gridPosition.row)
          return (
            <div
              key={icon.id}
              className="absolute"
              style={{
                left: position.x,
                top: position.y,
              }}
            >
              <DesktopIcon
                id={icon.id}
                name={icon.name}
                icon={icon.icon}
                isSelected={selectedIcon === icon.id}
                onSelect={() => setSelectedIcon(icon.id)}
                onDoubleClick={icon.onDoubleClick}
              />
            </div>
          )
        })}

      {/* Context Menu */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu((prev) => ({ ...prev, visible: false }))}
          onToggleIcons={() => setShowIcons(!showIcons)}
          onWallpaperChange={handleWallpaperChange}
          showIcons={showIcons}
        />
      )}
    </div>
  )
}
