"use client"

import { useWindows } from "../window-context"
import WindowMenuBar from "../window-menu-bar"

export default function ControlPanel() {
  const { openWindow } = useWindows()

  const controlPanelItems = [
    {
      name: "Display",
      icon: "🖥️",
      description: "Change your desktop background, screen saver, and display settings",
      action: () =>
        openWindow({
          title: "Display Properties",
          component: "DesktopProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 200, y: 200 },
          size: { width: 400, height: 350 },
          icon: "🖥️",
        }),
    },
    {
      name: "System",
      icon: "💻",
      description: "View system information and change computer settings",
      action: () =>
        openWindow({
          title: "System Properties",
          component: "SystemInfo",
          isMinimized: false,
          isMaximized: false,
          position: { x: 220, y: 220 },
          size: { width: 480, height: 360 },
          icon: "💻",
        }),
    },
    {
      name: "Network",
      icon: "🌐",
      description: "Configure network settings and connections",
      action: () =>
        openWindow({
          title: "Network",
          component: "NetworkSettings",
          isMinimized: false,
          isMaximized: false,
          position: { x: 240, y: 240 },
          size: { width: 450, height: 350 },
          icon: "🌐",
        }),
    },
    {
      name: "Sounds",
      icon: "🔊",
      description: "Change which sounds are played for Windows events",
      action: () =>
        openWindow({
          title: "Sounds Properties",
          component: "SoundsProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 260, y: 260 },
          size: { width: 400, height: 300 },
          icon: "🔊",
        }),
    },
    {
      name: "Mouse",
      icon: "🖱️",
      description: "Change mouse settings",
      action: () =>
        openWindow({
          title: "Mouse Properties",
          component: "MouseProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 280, y: 280 },
          size: { width: 350, height: 250 },
          icon: "🖱️",
        }),
    },
    {
      name: "Keyboard",
      icon: "⌨️",
      description: "Change keyboard settings",
      action: () =>
        openWindow({
          title: "Keyboard Properties",
          component: "KeyboardProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 300, y: 300 },
          size: { width: 350, height: 250 },
          icon: "⌨️",
        }),
    },
    {
      name: "Date/Time",
      icon: "🕐",
      description: "Set the date and time for your computer",
      action: () =>
        openWindow({
          title: "Date/Time Properties",
          component: "DateTimeProperties",
          isMinimized: false,
          isMaximized: false,
          position: { x: 320, y: 320 },
          size: { width: 300, height: 200 },
          icon: "🕐",
        }),
    },
    {
      name: "Regional Settings",
      icon: "🌍",
      description: "Change how numbers, dates, and times are displayed",
      action: () => alert("Regional Settings would open here"),
    },
    {
      name: "Fonts",
      icon: "🔤",
      description: "Add, remove, and manage fonts on your computer",
      action: () =>
        openWindow({
          title: "Fonts",
          component: "FontsFolder",
          isMinimized: false,
          isMaximized: false,
          position: { x: 340, y: 340 },
          size: { width: 500, height: 400 },
          icon: "🔤",
        }),
    },
    {
      name: "Add/Remove Programs",
      icon: "📦",
      description: "Install or remove programs and Windows components",
      action: () =>
        openWindow({
          title: "Add/Remove Programs Properties",
          component: "AddRemovePrograms",
          isMinimized: false,
          isMaximized: false,
          position: { x: 360, y: 360 },
          size: { width: 450, height: 350 },
          icon: "📦",
        }),
    },
  ]

  const menuItems = [
    {
      label: "File",
      items: [
        {
          label: "Close",
          action: () => {
            // Close window logic
          },
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Large Icons",
          action: () => alert("View changed to Large Icons"),
        },
        {
          label: "Small Icons",
          action: () => alert("View changed to Small Icons"),
        },
        {
          label: "List",
          action: () => alert("View changed to List"),
        },
        {
          label: "Details",
          action: () => alert("View changed to Details"),
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () => alert("Control Panel help would open here"),
        },
        { separator: true },
        {
          label: "About Control Panel",
          action: () => alert("Control Panel\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <WindowMenuBar menus={menuItems} />

      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Control Panel</h2>
          <p className="text-sm text-gray-600">Use the settings in Control Panel to personalize your computer.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {controlPanelItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 border border-gray-300 hover:bg-gray-100 cursor-pointer rounded"
              onDoubleClick={item.action}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-gray-600 mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {controlPanelItems.length} object(s)
      </div>
    </div>
  )
}
