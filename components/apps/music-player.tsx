"use client"

import { useState, useEffect } from "react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isShuffling, setIsShuffling] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)

  const playlist = [
    { title: "Coding Vibes", artist: "Dev Beats", duration: "3:45" },
    { title: "Algorithm Blues", artist: "Binary Band", duration: "4:12" },
    { title: "JavaScript Jam", artist: "Frontend Five", duration: "3:28" },
    { title: "Database Dreams", artist: "SQL Squad", duration: "5:03" },
    { title: "React Rhythm", artist: "Component Crew", duration: "3:56" },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
  }

  // Simulate audio playback
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= 240) {
            // 4 minutes max
            if (isRepeating) {
              return 0
            } else {
              nextTrack()
              return 0
            }
          }
          return newTime
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isRepeating])

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
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
            Play
          </button>
        </div>
      </div>

      {/* Display Area */}
      <div className="flex-1 bg-black text-green-400 p-4 font-mono">
        <div className="text-center mb-4">
          <div className="text-lg mb-2">🎵 Now Playing 🎵</div>
          <div className="text-xl font-bold">{playlist[currentTrack].title}</div>
          <div className="text-sm">{playlist[currentTrack].artist}</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{playlist[currentTrack].duration}</span>
          </div>
          <div className="w-full bg-gray-700 h-2 border border-gray-600">
            <div
              className="h-full bg-green-400 transition-all duration-1000"
              style={{ width: `${(currentTime / 240) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-4">
            <button
              className={`px-2 py-1 text-xs ${isShuffling ? "text-yellow-400" : "text-green-400"}`}
              onClick={() => setIsShuffling(!isShuffling)}
            >
              🔀 Shuffle
            </button>
            <button
              className={`px-2 py-1 text-xs ${isRepeating ? "text-yellow-400" : "text-green-400"}`}
              onClick={() => setIsRepeating(!isRepeating)}
            >
              🔁 Repeat
            </button>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <button className="text-2xl hover:text-white" onClick={prevTrack}>
              ⏮️
            </button>
            <button className="text-3xl hover:text-white" onClick={togglePlay}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button className="text-2xl hover:text-white" onClick={nextTrack}>
              ⏭️
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="h-32 bg-white border-t border-[#808080] overflow-auto">
        <div className="text-xs font-bold p-2 bg-[#c0c0c0] border-b border-[#808080]">Playlist</div>
        {playlist.map((track, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-2 text-xs cursor-pointer hover:bg-gray-100 ${
              currentTrack === index ? "bg-blue-100 font-bold" : ""
            }`}
            onClick={() => setCurrentTrack(index)}
          >
            <div>
              <div className="font-semibold">{track.title}</div>
              <div className="text-gray-600">{track.artist}</div>
            </div>
            <div className="text-gray-500">{track.duration}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="h-12 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-4 space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number.parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-xs w-8">{volume}%</span>
        </div>

        <div className="flex-1 text-center text-xs">
          Track {currentTrack + 1} of {playlist.length}
        </div>
      </div>
    </div>
  )
}
