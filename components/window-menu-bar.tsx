"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSound } from "./sound-context"

interface MenuBarProps {
  menus: Array<{
    label: string
    items: Array<{
      label: string
      action?: () => void
      separator?: boolean
      disabled?: boolean
      shortcut?: string
    }>
  }>
}

export default function WindowMenuBar({ menus }: MenuBarProps) {
  const { playSound } = useSound()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMenuClick = (menuLabel: string, event: React.MouseEvent) => {
    playSound("click")
    const rect = event.currentTarget.getBoundingClientRect()
    setMenuPosition({ x: rect.left, y: rect.bottom })
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel)
  }

  const handleMenuItemClick = (action?: () => void) => {
    if (action) {
      playSound("click")
      action()
    }
    setActiveMenu(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative">
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          {menus.map((menu) => (
            <button
              key={menu.label}
              className={`px-2 py-0 text-xs hover:bg-blue-600 hover:text-white transition-colors duration-75 ${
                activeMenu === menu.label ? "bg-blue-600 text-white" : "bg-[#c0c0c0]"
              }`}
              onClick={(e) => handleMenuClick(menu.label, e)}
            >
              {menu.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Menu */}
      {activeMenu && (
        <div
          className="absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50 min-w-32"
          style={{ left: menuPosition.x, top: menuPosition.y }}
        >
          {menus
            .find((m) => m.label === activeMenu)
            ?.items.map((item, index) =>
              item.separator ? (
                <div key={index} className="h-px bg-[#808080] my-1 mx-2" />
              ) : (
                <div
                  key={index}
                  className={`flex items-center justify-between px-3 py-1 text-xs cursor-pointer ${
                    item.disabled ? "text-gray-500 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white"
                  }`}
                  onClick={() => !item.disabled && handleMenuItemClick(item.action)}
                >
                  <span>{item.label}</span>
                  {item.shortcut && <span className="ml-4 text-xs">{item.shortcut}</span>}
                </div>
              ),
            )}
        </div>
      )}
    </div>
  )
}
