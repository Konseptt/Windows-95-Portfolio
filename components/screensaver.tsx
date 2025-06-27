"use client"

import { useState, useEffect } from "react"

interface ScreenSaverProps {
  onActivity: () => void
}

export default function ScreenSaver({ onActivity }: ScreenSaverProps) {
  const [pipes, setPipes] = useState<Array<{ x: number; y: number; direction: string; color: string }>>([])

  useEffect(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
    const newPipes = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      direction: ["up", "down", "left", "right"][Math.floor(Math.random() * 4)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPipes(newPipes)

    const interval = setInterval(() => {
      setPipes((prev) =>
        prev.map((pipe) => {
          let { x, y, direction } = pipe
          const speed = 2

          switch (direction) {
            case "up":
              y -= speed
              break
            case "down":
              y += speed
              break
            case "left":
              x -= speed
              break
            case "right":
              x += speed
              break
          }

          // Bounce off edges
          if (x <= 0 || x >= window.innerWidth - 20) {
            direction = direction === "left" ? "right" : direction === "right" ? "left" : direction
          }
          if (y <= 0 || y >= window.innerHeight - 20) {
            direction = direction === "up" ? "down" : direction === "down" ? "up" : direction
          }

          return { ...pipe, x, y, direction }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-screen w-screen bg-black cursor-none flex items-center justify-center"
      onClick={onActivity}
      onMouseMove={onActivity}
      onKeyDown={onActivity}
    >
      <div className="absolute inset-0">
        {pipes.map((pipe, index) => (
          <div
            key={index}
            className="absolute w-5 h-5 rounded"
            style={{
              left: pipe.x,
              top: pipe.y,
              backgroundColor: pipe.color,
              boxShadow: `0 0 10px ${pipe.color}`,
            }}
          />
        ))}
      </div>

      <div className="text-white text-center z-10">
        <div className="text-6xl mb-4">💻</div>
        <div className="text-2xl mb-2">Portfolio Screensaver</div>
        <div className="text-sm opacity-75">Move mouse or press any key to continue</div>
      </div>
    </div>
  )
}
