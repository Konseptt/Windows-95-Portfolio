"use client"

import { useState, useEffect } from "react"
import { useWindows } from "./window-context"
import { useSound } from "./sound-context"
import StartMenu from "./start-menu"
import SystemTray from "./system-tray"

export default function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useWindows()
  const { playSound } = useSound()
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [startButtonPressed, setStartButtonPressed] = useState(false)

  const handleStartClick = () => {
    playSound("click")
    setStartButtonPressed(true)
    setShowStartMenu(!showStartMenu)
    setTimeout(() => setStartButtonPressed(false), 150)
  }

  const handleTaskbarClick = (windowId: string) => {
    playSound("click")
    const window = windows.find((w) => w.id === windowId)
    if (window?.isMinimized) {
      focusWindow(windowId)
    } else {
      minimizeWindow(windowId)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".start-menu") && !target.closest(".start-button")) {
        setShowStartMenu(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <>
      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}

      <div className="absolute bottom-0 left-0 right-0 h-7 bg-[#c0c0c0] border-t-2 border-white flex items-center z-40">
        {/* Start Button */}
        <button
          className={`start-button h-6 px-3 ml-0.5 flex items-center text-xs font-bold transition-all duration-75 ${
            startButtonPressed || showStartMenu
              ? "border-2 border-[#808080] border-r-white border-b-white bg-[#b0b0b0] transform translate-x-0.5 translate-y-0.5"
              : "border-2 border-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0] shadow-sm"
          }`}
          onClick={handleStartClick}
        >
          <span className="mr-1.5 text-sm">🪟</span>
          <span className="font-bold">Start</span>
        </button>

        {/* Separator */}
        <div className="w-0.5 h-5 bg-[#808080] mx-1" />

        {/* Window Buttons Area */}
        <div className="flex-1 flex items-center space-x-0.5 overflow-hidden">
          {windows.map((window) => {
            const isActive = window.zIndex === Math.max(...windows.map((w) => w.zIndex))
            return (
              <button
                key={window.id}
                className={`h-6 px-2 text-xs truncate max-w-36 transition-all duration-75 ${
                  isActive && !window.isMinimized
                    ? "bg-[#d0d0d0] border-2 border-[#808080] border-r-white border-b-white transform translate-x-0.5 translate-y-0.5"
                    : "bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] shadow-sm"
                }`}
                onClick={() => handleTaskbarClick(window.id)}
                title={window.title}
              >
                <span className="mr-1">{window.icon || "📄"}</span>
                <span className="truncate">{window.title}</span>
              </button>
            )
          })}
        </div>

        {/* System Tray */}
        <div className="border-l-2 border-[#808080] pl-2 pr-1">
          <SystemTray />
        </div>
      </div>
    </>
  )
}
