"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import WindowManager from "@/components/window-manager"
import BootSequence from "@/components/boot-sequence"
import Screensaver from "@/components/screensaver"
import { WindowProvider } from "@/components/window-context"
import { PortfolioProvider } from "@/components/portfolio-context"
import { SoundProvider } from "@/components/sound-context"

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now())
      setShowScreensaver(false)
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true)
    })

    // Check for inactivity every 30 seconds
    const inactivityTimer = setInterval(() => {
      if (Date.now() - lastActivity > 300000) {
        // 5 minutes
        setShowScreensaver(true)
      }
    }, 30000)

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true)
      })
      clearInterval(inactivityTimer)
    }
  }, [lastActivity])

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />
  }

  if (showScreensaver) {
    return <Screensaver onExit={() => setShowScreensaver(false)} />
  }

  return (
    <SoundProvider>
      <PortfolioProvider>
        <WindowProvider>
          <div className="h-screen bg-[#008080] flex flex-col overflow-hidden">
            <Desktop />
            <WindowManager />
            <Taskbar />
          </div>
        </WindowProvider>
      </PortfolioProvider>
    </SoundProvider>
  )
}
