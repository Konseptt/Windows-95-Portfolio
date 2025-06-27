"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SoundContextType {
  playSound: (soundName: string) => void
  isMuted: boolean
  setIsMuted: (muted: boolean) => void
  volume: number
  setVolume: (volume: number) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75)

  const playSound = (soundName: string) => {
    // Don't play any sounds if muted
    if (isMuted || volume === 0) {
      return
    }

    // Windows 95 sound effects simulation
    console.log(`🔊 Playing Windows 95 sound: ${soundName}`)

    // Create audio context for sound effects
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const playTone = (frequency: number, duration: number, type: OscillatorType = "sine") => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = type

        // Apply volume setting
        const effectiveVolume = (volume / 100) * 0.1
        gainNode.gain.setValueAtTime(effectiveVolume, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }

      switch (soundName) {
        case "click":
          playTone(800, 0.1, "square")
          break
        case "open":
          playTone(600, 0.15)
          setTimeout(() => playTone(800, 0.15), 100)
          break
        case "close":
          playTone(800, 0.1)
          setTimeout(() => playTone(600, 0.15), 50)
          break
        case "minimize":
          playTone(700, 0.2)
          break
        case "maximize":
          playTone(900, 0.2)
          break
        case "error":
          playTone(300, 0.3, "sawtooth")
          break
        case "startup":
          playTone(523, 0.2) // C
          setTimeout(() => playTone(659, 0.2), 200) // E
          setTimeout(() => playTone(784, 0.2), 400) // G
          setTimeout(() => playTone(1047, 0.4), 600) // C
          break
        default:
          playTone(600, 0.1)
      }
    } catch (error) {
      console.log("Audio not supported, using visual feedback only")
    }
  }

  return (
    <SoundContext.Provider value={{ playSound, isMuted, setIsMuted, volume, setVolume }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
