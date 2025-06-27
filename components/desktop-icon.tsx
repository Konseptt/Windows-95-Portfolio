"use client"

import { useState } from "react"
import { useSound } from "./sound-context"

interface DesktopIconProps {
  id: string
  name: string
  icon: string
  isSelected: boolean
  onSelect: () => void
  onDoubleClick: () => void
}

export default function DesktopIcon({ id, name, icon, isSelected, onSelect, onDoubleClick }: DesktopIconProps) {
  const { playSound } = useSound()
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    playSound("click")
    onSelect()
  }

  const handleDoubleClick = () => {
    playSound("open")
    onDoubleClick()
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <div
      className={`flex flex-col items-center cursor-pointer w-16 h-20 p-1 transition-all duration-75 ${
        isSelected ? "bg-blue-600 bg-opacity-50 border border-dotted border-white" : ""
      } ${isPressed ? "transform scale-95" : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={`text-2xl mb-1 transition-transform duration-75 ${isPressed ? "transform scale-90" : ""}`}>
        {icon}
      </div>
      <div
        className={`text-white text-xs text-center font-bold max-w-16 leading-tight shadow-text ${
          isSelected ? "text-yellow-200" : ""
        }`}
      >
        {name}
      </div>
    </div>
  )
}
