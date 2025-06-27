"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useWindows } from "./window-context"
import { useSound } from "./sound-context"

interface WindowProps {
  window: any
  children: React.ReactNode
}

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow } = useWindows()
  const { playSound } = useSound()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("title-bar")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - win.position.x,
        y: e.clientY - win.position.y,
      })
      focusWindow(win.id)
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: win.size.width,
      height: win.size.height,
    })
    focusWindow(win.id)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !win.isMaximized) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - win.size.width))
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - win.size.height - 32))

      updateWindow(win.id, {
        position: { x: newX, y: newY },
      })
    } else if (isResizing && !win.isMaximized) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      const newWidth = Math.max(200, Math.min(resizeStart.width + deltaX, window.innerWidth - win.position.x))
      const newHeight = Math.max(150, Math.min(resizeStart.height + deltaY, window.innerHeight - win.position.y - 32))

      updateWindow(win.id, {
        size: { width: newWidth, height: newHeight },
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const handleDoubleClick = () => {
    playSound("maximize")
    maximizeWindow(win.id)
  }

  const handleMinimize = () => {
    playSound("minimize")
    minimizeWindow(win.id)
  }

  const handleMaximize = () => {
    playSound("maximize")
    maximizeWindow(win.id)
  }

  const handleClose = () => {
    playSound("close")
    closeWindow(win.id)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart])

  if (win.isMinimized) {
    return null
  }

  const windowStyle = win.isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100% - 28px)" }
    : {
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
      }

  return (
    <div
      ref={windowRef}
      className="absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg select-none animate-window-open"
      style={{ ...windowStyle, zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <div
        className="title-bar h-[18px] bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between px-1 cursor-move"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center space-x-1">
          <span className="text-[10px]">{win.icon || "📄"}</span>
          <span className="text-[11px] font-bold truncate">{win.title}</span>
        </div>
        <div className="flex">
          <button
            className="w-[16px] h-[14px] bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-[10px] flex items-center justify-center hover:bg-[#d0d0d0] font-bold leading-none transition-all duration-75 active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={handleMinimize}
            title="Minimize"
          >
            <span className="mt-[-2px]">−</span>
          </button>
          <button
            className="w-[16px] h-[14px] bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-[9px] flex items-center justify-center hover:bg-[#d0d0d0] font-bold leading-none transition-all duration-75 active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={handleMaximize}
            title={win.isMaximized ? "Restore" : "Maximize"}
          >
            {win.isMaximized ? "❐" : "□"}
          </button>
          <button
            className="w-[16px] h-[14px] bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-[10px] flex items-center justify-center hover:bg-red-500 hover:text-white font-bold leading-none transition-all duration-75 active:border-[#808080] active:border-r-white active:border-b-white"
            onClick={handleClose}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden" style={{ height: "calc(100% - 18px)" }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize bg-[#c0c0c0] hover:bg-[#d0d0d0] transition-colors duration-75"
          onMouseDown={handleResizeMouseDown}
          style={{
            background:
              "linear-gradient(-45deg, transparent 0%, transparent 30%, #808080 30%, #808080 40%, transparent 40%, transparent 60%, #808080 60%, #808080 70%, transparent 70%)",
          }}
        />
      )}
    </div>
  )
}
