"use client"

import { useState, useEffect } from "react"
import { useSound } from "../sound-context"
import WindowMenuBar from "../window-menu-bar"

export default function VolumeControl() {
  const {
    isMuted: globalMuted,
    setIsMuted: setGlobalMuted,
    volume: globalVolume,
    setVolume: setGlobalVolume,
  } = useSound()

  const [masterVolume, setMasterVolume] = useState(globalVolume)
  const [waveVolume, setWaveVolume] = useState(80)
  const [midiVolume, setMidiVolume] = useState(70)
  const [cdVolume, setCdVolume] = useState(65)
  const [lineVolume, setLineVolume] = useState(50)
  const [micVolume, setMicVolume] = useState(30)

  const [masterMute, setMasterMute] = useState(globalMuted)
  const [waveMute, setWaveMute] = useState(false)
  const [midiMute, setMidiMute] = useState(false)
  const [cdMute, setCdMute] = useState(false)
  const [lineMute, setLineMute] = useState(false)
  const [micMute, setMicMute] = useState(false)

  // Sync with global sound context
  useEffect(() => {
    setMasterVolume(globalVolume)
    setMasterMute(globalMuted)
  }, [globalVolume, globalMuted])

  // Apply volume changes to global system
  useEffect(() => {
    setGlobalVolume(masterVolume)
    setGlobalMuted(masterMute)
  }, [masterVolume, masterMute, setGlobalVolume, setGlobalMuted])

  const testSound = (frequency: number, volume: number, muted: boolean) => {
    if (muted || masterMute || globalMuted) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      gainNode.gain.setValueAtTime((volume / 100) * (masterVolume / 100) * 0.1, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = "sine"

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log("Audio test not available")
    }
  }

  const menuItems = [
    {
      label: "Options",
      items: [
        {
          label: "Properties",
          action: () => alert("Audio Properties:\n- Sample Rate: 44.1 kHz\n- Bit Depth: 16-bit\n- Channels: Stereo"),
        },
        {
          label: "Advanced Controls",
          action: () => alert("Advanced audio controls would open here"),
        },
        { separator: true },
        {
          label: "Exit",
          action: () => {
            // Close window
          },
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () =>
            alert(
              "Volume Control Help:\n- Adjust individual volume levels\n- Use mute checkboxes to silence channels\n- Master volume affects all channels and system sounds",
            ),
        },
        { separator: true },
        {
          label: "About Volume Control",
          action: () => alert("Volume Control\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  const VolumeSlider = ({
    label,
    volume,
    setVolume,
    mute,
    setMute,
    testFreq = 800,
  }: {
    label: string
    volume: number
    setVolume: (v: number) => void
    mute: boolean
    setMute: (m: boolean) => void
    testFreq?: number
  }) => (
    <div className="flex flex-col items-center space-y-2 p-2 border border-[#808080] bg-[#e0e0e0] min-w-16">
      <div className="text-xs font-bold text-center leading-tight">{label}</div>
      <div className="h-24 flex flex-col items-center justify-end">
        <input
          type="range"
          min="0"
          max="100"
          value={mute ? 0 : volume}
          onChange={(e) => {
            const newVolume = Number(e.target.value)
            setVolume(newVolume)
            if (newVolume > 0) setMute(false)
          }}
          className="h-20 slider-vertical"
          style={{
            writingMode: "bt-lr",
            WebkitAppearance: "slider-vertical",
            width: "20px",
          }}
          disabled={mute}
        />
      </div>
      <div className="text-xs text-center min-h-4 leading-tight">{mute ? "Muted" : volume}</div>
      <label className="flex items-center space-x-1">
        <input type="checkbox" checked={mute} onChange={(e) => setMute(e.target.checked)} className="w-3 h-3" />
        <span className="text-xs">Mute</span>
      </label>
      <button
        className="px-1 py-0 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
        onClick={() => testSound(testFreq, volume, mute)}
        title="Test Sound"
      >
        Test
      </button>
    </div>
  )

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
      <WindowMenuBar menus={menuItems} />

      {/* Volume Controls */}
      <div className="flex-1 p-4">
        <div className="mb-2">
          <h3 className="text-sm font-bold">Volume Control</h3>
          <p className="text-xs text-gray-600 leading-tight">Adjust the volume for different audio sources</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <VolumeSlider
            label="Master"
            volume={masterVolume}
            setVolume={setMasterVolume}
            mute={masterMute}
            setMute={setMasterMute}
            testFreq={800}
          />
          <VolumeSlider
            label="Wave"
            volume={waveVolume}
            setVolume={setWaveVolume}
            mute={waveMute}
            setMute={setWaveMute}
            testFreq={600}
          />
          <VolumeSlider
            label="MIDI"
            volume={midiVolume}
            setVolume={setMidiVolume}
            mute={midiMute}
            setMute={setMidiMute}
            testFreq={700}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <VolumeSlider
            label="CD Audio"
            volume={cdVolume}
            setVolume={setCdVolume}
            mute={cdMute}
            setMute={setCdMute}
            testFreq={500}
          />
          <VolumeSlider
            label="Line In"
            volume={lineVolume}
            setVolume={setLineVolume}
            mute={lineMute}
            setMute={setLineMute}
            testFreq={900}
          />
          <VolumeSlider
            label="Microphone"
            volume={micVolume}
            setVolume={setMicVolume}
            mute={micMute}
            setMute={setMicMute}
            testFreq={400}
          />
        </div>

        <div className="mt-4 p-2 bg-gray-100 border border-gray-300 text-xs">
          <div className="font-semibold mb-1">Audio Device:</div>
          <div className="leading-tight">Windows 95 Compatible Sound Card</div>
          <div className="mt-1">
            <button
              className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white mr-2"
              onClick={() => {
                // Test all channels
                setTimeout(() => testSound(800, masterVolume, masterMute), 0)
                setTimeout(() => testSound(600, waveVolume, waveMute), 200)
                setTimeout(() => testSound(700, midiVolume, midiMute), 400)
              }}
            >
              Test All
            </button>
            <button
              className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
              onClick={() => {
                // Reset to defaults
                setMasterVolume(75)
                setWaveVolume(80)
                setMidiVolume(70)
                setCdVolume(65)
                setLineVolume(50)
                setMicVolume(30)
                setMasterMute(false)
                setWaveMute(false)
                setMidiMute(false)
                setCdMute(false)
                setLineMute(false)
                setMicMute(false)
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        Master Volume: {masterMute ? "Muted" : `${masterVolume}%`} | Device: Ready |
        {masterMute || (waveMute && midiMute && cdMute) ? " Audio Muted" : " Audio Active"}
      </div>
    </div>
  )
}
