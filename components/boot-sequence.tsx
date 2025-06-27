"use client"

import { useState, useEffect } from "react"

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState(0)
  const [dots, setDots] = useState("")

  const bootMessages = [
    "Starting Windows 95...",
    "Loading system files...",
    "Initializing portfolio data...",
    "Welcome to my digital workspace!",
  ]

  useEffect(() => {
    const stageTimer = setTimeout(() => {
      if (stage < bootMessages.length - 1) {
        setStage(stage + 1)
      } else {
        // Complete the boot sequence after showing the final message
        setTimeout(() => {
          onComplete()
        }, 1500)
      }
    }, 1200)

    return () => clearTimeout(stageTimer)
  }, [stage, onComplete])

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 300)

    return () => clearInterval(dotTimer)
  }, [])

  // Allow clicking or pressing any key to skip boot sequence
  useEffect(() => {
    const handleSkip = () => {
      onComplete()
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      handleSkip()
    }

    const handleClick = () => {
      handleSkip()
    }

    document.addEventListener("keydown", handleKeyPress)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      document.removeEventListener("click", handleClick)
    }
  }, [onComplete])

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center font-mono cursor-pointer">
      <div className="mb-8">
        <div className="text-4xl mb-4">🪟</div>
        <div className="text-xl mb-2">Microsoft Windows 95</div>
        <div className="text-sm text-gray-400">Portfolio Edition</div>
      </div>

      <div className="text-center">
        <div className="mb-4">
          {bootMessages[stage]}
          {stage < bootMessages.length - 1 && dots}
        </div>
        <div className="w-64 h-2 bg-gray-700 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-1000"
            style={{ width: `${((stage + 1) / bootMessages.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 text-xs text-gray-500 animate-pulse">Press any key or click to continue...</div>
    </div>
  )
}
