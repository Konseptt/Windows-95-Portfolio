"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"brush" | "eraser" | "line" | "rectangle" | "circle">("brush")
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(2)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
    "#008000",
    "#000080",
    "#808080",
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartPos({ x, y })

    if (tool === "brush" || tool === "eraser") {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "brush") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.lineCap = "round"
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize * 2
      ctx.lineCap = "round"
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === "line") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.moveTo(startPos.x, startPos.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (tool === "rectangle") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y)
    } else if (tool === "circle") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
      ctx.beginPath()
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            File
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Edit
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            View
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Image
          </button>
        </div>
      </div>

      {/* Tool Bar */}
      <div className="h-12 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <div className="flex space-x-1">
          {[
            { name: "brush", icon: "🖌️", label: "Brush" },
            { name: "eraser", icon: "🧽", label: "Eraser" },
            { name: "line", icon: "📏", label: "Line" },
            { name: "rectangle", icon: "⬜", label: "Rectangle" },
            { name: "circle", icon: "⭕", label: "Circle" },
          ].map((t) => (
            <button
              key={t.name}
              className={`px-2 py-1 border text-xs ${
                tool === t.name
                  ? "bg-[#d0d0d0] border-[#808080]"
                  : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
              }`}
              onClick={() => setTool(t.name as any)}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}
        </div>

        <div className="w-px h-8 bg-[#808080]" />

        <div className="flex items-center space-x-2">
          <span className="text-xs">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
            className="w-16"
          />
          <span className="text-xs w-6">{brushSize}</span>
        </div>

        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>

      {/* Color Palette */}
      <div className="h-10 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-1">
        <span className="text-xs mr-2">Colors:</span>
        {colors.map((c) => (
          <button
            key={c}
            className={`w-6 h-6 border-2 ${color === c ? "border-black" : "border-gray-400"}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-6 border border-gray-400"
        />
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-200 p-2 overflow-auto">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="bg-white border-2 border-[#808080] border-t-black border-l-black cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        Tool: {tool.charAt(0).toUpperCase() + tool.slice(1)} | Size: {brushSize}px | Color: {color}
      </div>
    </div>
  )
}
