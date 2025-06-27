"use client"

import { useEffect } from "react"
import { useSound } from "./sound-context"

interface ContextMenuProps {
  x: number
  y: number
  visible: boolean
  onClose: () => void
  items: Array<{
    label: string
    action?: () => void
    separator?: boolean
    disabled?: boolean
    icon?: string
  }>
}

export default function WindowContextMenu({ x, y, visible, onClose, items }: ContextMenuProps) {
  const { playSound } = useSound()

  const handleItemClick = (action?: () => void) => {
    if (action) {
      playSound("click")
      action()
    }
    onClose()
  }

  useEffect(() => {
    const handleClickOutside = () => {
      onClose()
    }

    if (visible) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      className="absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50 min-w-32"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={index} className="h-px bg-[#808080] my-1 mx-2" />
        ) : (
          <div
            key={index}
            className={`flex items-center px-3 py-1 text-xs cursor-pointer ${
              item.disabled ? "text-gray-500 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => !item.disabled && handleItemClick(item.action)}
          >
            {item.icon && <span className="mr-2 text-xs">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ),
      )}
    </div>
  )
}
