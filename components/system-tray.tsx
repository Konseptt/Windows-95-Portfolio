"use client"

import { useState, useEffect } from "react"
import { useWindows } from "./window-context"
import { useSound } from "./sound-context"

export default function SystemTray() {
  const { openWindow } = useWindows()
  const { isMuted, setIsMuted, volume, setVolume } = useSound()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isConnected, setIsConnected] = useState(true)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const openVolumeControl = () => {
    openWindow({
      title: "Volume Control",
      component: "VolumeControl",
      isMinimized: false,
      isMaximized: false,
      position: { x: 300, y: 300 },
      size: { width: 350, height: 200 },
      icon: "🔊",
    })
    setShowVolumeControl(false)
  }

  const openSystemInfo = () => {
    openWindow({
      title: "System Information",
      component: "SystemInfo",
      isMinimized: false,
      isMaximized: false,
      position: { x: 400, y: 400 },
      size: { width: 480, height: 360 },
      icon: "💻",
    })
  }

  const openNetworkSettings = () => {
    openWindow({
      title: "Network Settings",
      component: "NetworkSettings",
      isMinimized: false,
      isMaximized: false,
      position: { x: 350, y: 350 },
      size: { width: 450, height: 350 },
      icon: "🌐",
    })
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }

    // Provide audio feedback only if not muted
    if (!isMuted && newVolume > 0) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        gainNode.gain.setValueAtTime((newVolume / 100) * 0.1, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.type = "sine"

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        console.log("Audio feedback not available")
      }
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (volume === 0) {
        setVolume(75)
      }
    } else {
      setIsMuted(true)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-1 px-2">
        {/* Volume Control */}
        <div className="relative">
          <button
            className="w-6 h-6 flex items-center justify-center hover:bg-[#d0d0d0] text-xs transition-colors duration-75"
            onClick={() => setShowVolumeControl(!showVolumeControl)}
            onDoubleClick={openVolumeControl}
            title={`Volume: ${volume}${isMuted ? " (Muted)" : ""}`}
          >
            {isMuted || volume === 0 ? "🔇" : volume < 30 ? "🔈" : volume < 70 ? "🔉" : "🔊"}
          </button>

          {showVolumeControl && (
            <div className="absolute bottom-8 right-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] p-2 shadow-lg z-50">
              <div className="text-xs mb-1 text-center">Volume</div>
              <div className="flex flex-col items-center space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-20 h-2"
                  style={{ writingMode: "bt-lr", WebkitAppearance: "slider-vertical" }}
                />
                <div className="text-xs text-center">{isMuted ? "Muted" : volume}</div>
                <button
                  className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
                  onClick={toggleMute}
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <button
                  className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
                  onClick={openVolumeControl}
                >
                  Advanced...
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Network Status */}
        <button
          className="w-6 h-6 flex items-center justify-center hover:bg-[#d0d0d0] text-xs transition-colors duration-75"
          title={isConnected ? "Network Connected - Click for settings" : "Network Disconnected"}
          onClick={openNetworkSettings}
          onDoubleClick={() => setIsConnected(!isConnected)}
        >
          {isConnected ? "🌐" : "❌"}
        </button>

        {/* System Info */}
        <button
          className="w-6 h-6 flex items-center justify-center hover:bg-[#d0d0d0] text-xs transition-colors duration-75"
          onClick={openSystemInfo}
          title="System Information"
        >
          💻
        </button>

        {/* Separator */}
        <div className="w-px h-4 bg-[#808080]" />

        {/* Clock */}
        <div
          className="px-2 text-xs font-mono min-w-16 text-center cursor-pointer hover:bg-[#d0d0d0] transition-colors duration-75"
          onClick={() => {
            openWindow({
              title: "Date/Time Properties",
              component: "DateTimeProperties",
              isMinimized: false,
              isMaximized: false,
              position: { x: 450, y: 450 },
              size: { width: 300, height: 200 },
              icon: "🕐",
            })
          }}
          title="Click to adjust date/time"
        >
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </>
  )
}
