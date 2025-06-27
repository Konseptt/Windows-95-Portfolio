"use client"

import { useWindows } from "./window-context"

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  onToggleIcons: () => void
  onWallpaperChange: (wallpaper: string) => void
  showIcons: boolean
}

export default function ContextMenu({ x, y, onClose, onToggleIcons, onWallpaperChange, showIcons }: ContextMenuProps) {
  const { openWindow } = useWindows()

  const menuItems = [
    {
      label: "Arrange Icons",
      icon: "📋",
      action: () => {
        alert("Icons arranged!")
        onClose()
      },
    },
    {
      label: "Line up Icons",
      icon: "📐",
      action: () => {
        alert("Icons lined up!")
        onClose()
      },
    },
    { separator: true },
    {
      label: showIcons ? "Hide Icons" : "Show Icons",
      icon: "👁️",
      action: () => {
        onToggleIcons()
        onClose()
      },
    },
    { separator: true },
    {
      label: "Refresh",
      icon: "🔄",
      action: () => {
        window.location.reload()
      },
    },
    { separator: true },
    {
      label: "Properties",
      icon: "⚙️",
      action: () => {
        openWindow({
          title: "Display Properties",
          component: "DesktopProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 200 },
          size: { width: 400, height: 350 },
          icon: "⚙️",
          data: { onWallpaperChange },
        })
        onClose()
      },
    },
  ]

  return (
    <div
      className="absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50 min-w-32"
      style={{ left: x, top: y }}
    >
      {menuItems.map((item, index) =>
        item.separator ? (
          <div key={index} className="h-px bg-[#808080] my-1 mx-2" />
        ) : (
          <div
            key={index}
            className="flex items-center px-3 py-1 text-xs cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-75"
            onClick={item.action}
          >
            <span className="mr-2 text-xs">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ),
      )}
    </div>
  )
}
