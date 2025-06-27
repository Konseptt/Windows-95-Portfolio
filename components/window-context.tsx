"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface WindowState {
  id: string
  title: string
  component: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  data?: any
  icon?: string
}

interface WindowContextType {
  windows: WindowState[]
  openWindow: (window: Omit<WindowState, "id" | "zIndex">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindow: (id: string, updates: Partial<WindowState>) => void
  getNextPosition: () => { x: number; y: number }
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)
  const [windowOffset, setWindowOffset] = useState(0)

  const getNextPosition = () => {
    const baseX = 50 + (windowOffset % 10) * 30
    const baseY = 50 + (windowOffset % 10) * 30
    setWindowOffset((prev) => prev + 1)
    return { x: baseX, y: baseY }
  }

  const openWindow = (windowData: Omit<WindowState, "id" | "zIndex">) => {
    const id = Math.random().toString(36).substr(2, 9)

    // Check if window already exists
    const existingWindow = windows.find((w) => w.title === windowData.title && w.component === windowData.component)
    if (existingWindow) {
      focusWindow(existingWindow.id)
      return
    }

    // Get next position if not specified
    const position = windowData.position || getNextPosition()

    // Ensure valid position and size values
    const validPosition = {
      x: Math.max(0, Math.min(position.x, window.innerWidth - 200)),
      y: Math.max(0, Math.min(position.y, window.innerHeight - 200)),
    }

    const validSize = {
      width: Math.max(200, Math.min(windowData.size?.width || 400, window.innerWidth - validPosition.x)),
      height: Math.max(150, Math.min(windowData.size?.height || 300, window.innerHeight - validPosition.y - 40)),
    }

    const newWindow: WindowState = {
      ...windowData,
      id,
      zIndex: nextZIndex,
      position: validPosition,
      size: validSize,
    }

    setWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const maximizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  const focusWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w)))
    setNextZIndex((prev) => prev + 1)
  }

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)))
  }

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindow,
        getNextPosition,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider")
  }
  return context
}
