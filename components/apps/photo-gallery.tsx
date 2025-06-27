"use client"

import { useState } from "react"

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [viewMode, setViewMode] = useState<"thumbnails" | "slideshow">("thumbnails")

  const images = [
    {
      name: "Project Screenshot 1",
      url: "/placeholder.svg?height=300&width=400",
      description: "E-commerce platform homepage",
    },
    {
      name: "Project Screenshot 2",
      url: "/placeholder.svg?height=300&width=400",
      description: "Task management dashboard",
    },
    {
      name: "Project Screenshot 3",
      url: "/placeholder.svg?height=300&width=400",
      description: "Mobile weather app interface",
    },
    {
      name: "Project Screenshot 4",
      url: "/placeholder.svg?height=300&width=400",
      description: "AI chatbot conversation",
    },
    { name: "Team Photo", url: "/placeholder.svg?height=300&width=400", description: "Development team meeting" },
    { name: "Conference", url: "/placeholder.svg?height=300&width=400", description: "Tech conference presentation" },
  ]

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            File
          </button>
          <button
            className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
            onClick={() => setViewMode(viewMode === "thumbnails" ? "slideshow" : "thumbnails")}
          >
            View
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Tools
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <button
          className={`px-2 py-1 border text-xs ${viewMode === "thumbnails" ? "bg-[#d0d0d0] border-[#808080]" : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"}`}
          onClick={() => setViewMode("thumbnails")}
        >
          📷 Thumbnails
        </button>
        <button
          className={`px-2 py-1 border text-xs ${viewMode === "slideshow" ? "bg-[#d0d0d0] border-[#808080]" : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"}`}
          onClick={() => setViewMode("slideshow")}
        >
          🖼️ Slideshow
        </button>

        {viewMode === "slideshow" && (
          <>
            <div className="w-px h-6 bg-[#808080]" />
            <button
              className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
              onClick={prevImage}
            >
              ◀ Previous
            </button>
            <button
              className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
              onClick={nextImage}
            >
              Next ▶
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        {viewMode === "thumbnails" ? (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 p-2 rounded ${
                  selectedImage === index ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setSelectedImage(index)}
                onDoubleClick={() => setViewMode("slideshow")}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <div className="text-xs font-semibold truncate">{image.name}</div>
                <div className="text-xs text-gray-500 truncate">{image.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="max-w-2xl max-h-96 mb-4">
              <img
                src={images[selectedImage].url || "/placeholder.svg"}
                alt={images[selectedImage].name}
                className="w-full h-full object-contain border border-gray-300"
              />
            </div>
            <div className="text-center">
              <div className="font-semibold mb-1">{images[selectedImage].name}</div>
              <div className="text-sm text-gray-600 mb-2">{images[selectedImage].description}</div>
              <div className="text-xs text-gray-500">
                Image {selectedImage + 1} of {images.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {images.length} image(s) |{" "}
        {viewMode === "slideshow"
          ? `Viewing: ${images[selectedImage].name}`
          : `Selected: ${images[selectedImage].name}`}
      </div>
    </div>
  )
}
