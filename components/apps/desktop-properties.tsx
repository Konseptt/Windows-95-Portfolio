"use client"

import { useState, useEffect } from "react"

interface DesktopPropertiesProps {
  onWallpaperChange?: (wallpaper: string) => void
}

export default function DesktopProperties({ onWallpaperChange }: DesktopPropertiesProps) {
  const [selectedTab, setSelectedTab] = useState("background")
  const [wallpaper, setWallpaper] = useState("teal")
  const [screensaverEnabled, setScreensaverEnabled] = useState(true)
  const [screensaverTime, setScreensaverTime] = useState(30)
  const [colorScheme, setColorScheme] = useState("standard")
  const [fontSize, setFontSize] = useState("normal")
  const [showIcons, setShowIcons] = useState(true)
  const [activeDesktop, setActiveDesktop] = useState(false)
  const [smoothFonts, setSmoothFonts] = useState(true)

  const wallpapers = [
    { name: "Teal (Default)", value: "teal", color: "#008080" },
    { name: "Blue", value: "blue", color: "#0066cc" },
    { name: "Green", value: "green", color: "#006600" },
    { name: "Purple", value: "purple", color: "#663399" },
    { name: "Red", value: "red", color: "#cc0000" },
    { name: "Black", value: "black", color: "#000000" },
  ]

  const tabs = [
    { id: "background", label: "Background" },
    { id: "screensaver", label: "Screen Saver" },
    { id: "appearance", label: "Appearance" },
    { id: "settings", label: "Settings" },
  ]

  const handleWallpaperChange = (newWallpaper: string) => {
    setWallpaper(newWallpaper)
    if (onWallpaperChange) {
      onWallpaperChange(newWallpaper)
    }
  }

  const handleApply = () => {
    // Apply wallpaper change to desktop
    const desktop = document.querySelector(".desktop-background") as HTMLElement
    if (desktop) {
      const selectedWallpaper = wallpapers.find((w) => w.value === wallpaper)
      if (selectedWallpaper) {
        desktop.style.backgroundColor = selectedWallpaper.color
      }
    }
    alert("Settings applied successfully!")
  }

  const handleOK = () => {
    handleApply()
    // Close window logic would go here
  }

  const handleCancel = () => {
    // Reset to original settings and close
    // Close window logic would go here
  }

  const previewScreensaver = () => {
    alert("Screensaver preview would start here")
  }

  useEffect(() => {
    // Apply initial wallpaper
    const desktop = document.querySelector(".desktop-background") as HTMLElement
    if (desktop) {
      const selectedWallpaper = wallpapers.find((w) => w.value === wallpaper)
      if (selectedWallpaper) {
        desktop.style.backgroundColor = selectedWallpaper.color
      }
    }
  }, [])

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-[#808080]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-1 text-xs border-r border-[#808080] transition-all duration-75 ${
              selectedTab === tab.id
                ? "bg-white border-b-white border-t-2 border-t-white border-l-2 border-l-white"
                : "bg-[#c0c0c0] hover:bg-[#d0d0d0]"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        {selectedTab === "background" && (
          <div>
            <h3 className="font-bold mb-3 text-sm">Desktop Background</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Wallpaper:</label>
              <div className="grid grid-cols-2 gap-2">
                {wallpapers.map((wp) => (
                  <div
                    key={wp.value}
                    className={`p-2 border cursor-pointer transition-all duration-75 ${
                      wallpaper === wp.value
                        ? "border-blue-500 bg-blue-50 border-2"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleWallpaperChange(wp.value)}
                  >
                    <div className="w-full h-8 rounded mb-1 border" style={{ backgroundColor: wp.color }} />
                    <div className="text-xs">{wp.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-600 bg-gray-100 p-2 border">
              <strong>Note:</strong> Select a wallpaper to change the desktop background. Click "Apply" to see changes.
            </div>
          </div>
        )}

        {selectedTab === "screensaver" && (
          <div>
            <h3 className="font-bold mb-3 text-sm">Screen Saver</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Screen Saver:</label>
              <select
                className="w-full p-1 border border-[#808080] text-sm"
                value={screensaverEnabled ? "pipes" : "none"}
                onChange={(e) => setScreensaverEnabled(e.target.value !== "none")}
              >
                <option value="none">(None)</option>
                <option value="pipes">Pipes</option>
                <option value="blank">Blank Screen</option>
                <option value="flying">Flying Windows</option>
                <option value="starfield">Starfield</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Wait: {screensaverTime} minutes</label>
              <input
                type="range"
                min="1"
                max="60"
                value={screensaverTime}
                onChange={(e) => setScreensaverTime(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
                onClick={previewScreensaver}
              >
                Preview
              </button>
              <button
                className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
                disabled
              >
                Settings...
              </button>
            </div>
          </div>
        )}

        {selectedTab === "appearance" && (
          <div>
            <h3 className="font-bold mb-3 text-sm">Appearance</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Color Scheme:</label>
              <select
                className="w-full p-1 border border-[#808080] text-sm"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
              >
                <option value="standard">Windows Standard</option>
                <option value="high-contrast">High Contrast</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Font Size:</label>
              <select
                className="w-full p-1 border border-[#808080] text-sm"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="normal">Normal</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="bg-gray-100 p-3 border text-xs">
              <strong>Preview:</strong> This is how your desktop will appear with the selected settings.
            </div>
          </div>
        )}

        {selectedTab === "settings" && (
          <div>
            <h3 className="font-bold mb-3 text-sm">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="icons"
                  className="mr-2"
                  checked={showIcons}
                  onChange={(e) => setShowIcons(e.target.checked)}
                />
                <label htmlFor="icons" className="text-sm">
                  Show icons on desktop
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="web"
                  className="mr-2"
                  checked={activeDesktop}
                  onChange={(e) => setActiveDesktop(e.target.checked)}
                />
                <label htmlFor="web" className="text-sm">
                  Enable Active Desktop
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smooth"
                  className="mr-2"
                  checked={smoothFonts}
                  onChange={(e) => setSmoothFonts(e.target.checked)}
                />
                <label htmlFor="smooth" className="text-sm">
                  Smooth edges of screen fonts
                </label>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 text-xs">
              <strong>Note:</strong> Some settings may require a system restart to take effect.
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 p-3 border-t border-[#808080] bg-[#c0c0c0]">
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={handleOK}
        >
          OK
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  )
}
