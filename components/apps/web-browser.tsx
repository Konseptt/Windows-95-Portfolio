"use client"

import { useState, useEffect, useRef } from "react"

interface WebBrowserProps {
  data?: { url?: string; title?: string }
}

export default function WebBrowser({ data }: WebBrowserProps) {
  const [url, setUrl] = useState(data?.url || "https://ranjansharma.info.np")
  const [currentUrl, setCurrentUrl] = useState(url)
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState<string[]>([url])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([
    "https://ranjansharma.info.np",
    "https://github.com/konseptt",
    "https://leetcode.com/ranjansharma",
  ])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentUrl])

  const navigate = (newUrl?: string) => {
    const targetUrl = newUrl || url
    setCurrentUrl(targetUrl)
    setUrl(targetUrl)

    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(targetUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const targetUrl = history[newIndex]
      setCurrentUrl(targetUrl)
      setUrl(targetUrl)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const targetUrl = history[newIndex]
      setCurrentUrl(targetUrl)
      setUrl(targetUrl)
    }
  }

  const refresh = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
    setTimeout(() => setIsLoading(false), 1000)
  }

  const goHome = () => {
    navigate("https://ranjansharma.info.np")
  }

  const addToFavorites = () => {
    if (!favorites.includes(currentUrl)) {
      setFavorites([...favorites, currentUrl])
      alert("Added to favorites!")
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">File</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Edit</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">View</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Go</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Favorites</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Help</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-1">
        <button
          className={`px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] ${historyIndex === 0 ? "opacity-50" : ""}`}
          onClick={goBack}
          disabled={historyIndex === 0}
          title="Back"
        >
          ◀
        </button>
        <button
          className={`px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] ${historyIndex === history.length - 1 ? "opacity-50" : ""}`}
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          title="Forward"
        >
          ▶
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={refresh}
          title="Refresh"
        >
          🔄
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={goHome}
          title="Home"
        >
          🏠
        </button>
        <div className="w-px h-6 bg-[#808080]" />
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={addToFavorites}
          title="Add to Favorites"
        >
          ⭐
        </button>
      </div>

      {/* Address Bar */}
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <span className="text-xs">Address:</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && navigate()}
          className="flex-1 px-1 py-0 border border-[#808080] text-xs h-4"
        />
        <button
          className="px-2 py-0 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] h-4"
          onClick={() => navigate()}
        >
          Go
        </button>
      </div>

      {/* Favorites Bar */}
      <div className="h-6 bg-[#e0e0e0] border-b border-[#808080] flex items-center px-2 space-x-1 overflow-x-auto">
        <span className="text-xs mr-2">Favorites:</span>
        {favorites.map((fav, index) => (
          <button
            key={index}
            className="px-2 py-0 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] whitespace-nowrap"
            onClick={() => navigate(fav)}
            title={fav}
          >
            {fav.includes("github") ? "🐙" : fav.includes("leetcode") ? "🧩" : "🏠"}
            {fav.split("/")[2]?.split(".")[0] || "Home"}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <div className="text-lg mb-2">Internet Explorer</div>
              <div className="text-sm mb-4">Loading {currentUrl}...</div>
              <div className="w-64 h-4 bg-gray-200 border-2 border-[#808080] border-t-black border-l-black">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-none"
            title={data?.title || "Internet Explorer"}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        <div className="flex-1">{isLoading ? "Loading..." : `Done - ${currentUrl}`}</div>
        <div className="flex space-x-4">
          <span>🔒 Secure</span>
          <span>📶 Connected</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}
