"use client"

import { useState } from "react"

export default function ShutdownDialog() {
  const [selectedOption, setSelectedOption] = useState("shutdown")

  const handleShutdown = () => {
    switch (selectedOption) {
      case "shutdown":
        alert("It is now safe to turn off your computer.")
        break
      case "restart":
        alert("Windows is restarting...")
        setTimeout(() => window.location.reload(), 2000)
        break
      case "logout":
        alert("Logging off...")
        break
      default:
        break
    }
  }

  return (
    <div className="h-full bg-[#c0c0c0] p-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-red-500 flex items-center justify-center text-white text-lg">🔌</div>
        <div>
          <div className="font-bold text-sm">Shut Down Windows</div>
          <div className="text-xs text-gray-600">What do you want the computer to do?</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            value="shutdown"
            checked={selectedOption === "shutdown"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-3 h-3"
          />
          <span className="text-sm">Shut down the computer?</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            value="restart"
            checked={selectedOption === "restart"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-3 h-3"
          />
          <span className="text-sm">Restart the computer?</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            value="logout"
            checked={selectedOption === "logout"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-3 h-3"
          />
          <span className="text-sm">Close all programs and log on as a different user?</span>
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={handleShutdown}
        >
          Yes
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={() => {
            // Close dialog
          }}
        >
          No
        </button>
        <button
          className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-sm hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={() => alert("Help for shutdown options")}
        >
          Help
        </button>
      </div>
    </div>
  )
}
