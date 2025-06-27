"use client"

import type React from "react"

import { useState } from "react"
import WindowMenuBar from "../window-menu-bar"
import WindowContextMenu from "../window-context-menu"

interface FileExplorerProps {
  data?: { path?: string }
}

export default function FileExplorer({ data }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState(data?.path || "My Computer")
  const [viewMode, setViewMode] = useState<"large" | "small" | "list" | "details">("large")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })

  const folders = [
    { name: "My Documents", icon: "📁", type: "folder", size: "", modified: "12/25/2024" },
    { name: "Desktop", icon: "📁", type: "folder", size: "", modified: "12/25/2024" },
    { name: "Program Files", icon: "📁", type: "folder", size: "", modified: "12/20/2024" },
    { name: "Windows", icon: "📁", type: "folder", size: "", modified: "12/15/2024" },
    { name: "System", icon: "📁", type: "folder", size: "", modified: "12/10/2024" },
  ]

  const files = [
    { name: "readme.txt", icon: "📄", type: "file", size: "1 KB", modified: "12/25/2024" },
    { name: "config.sys", icon: "⚙️", type: "file", size: "2 KB", modified: "12/24/2024" },
    { name: "autoexec.bat", icon: "📄", type: "file", size: "1 KB", modified: "12/23/2024" },
  ]

  const items = currentPath === "My Computer" ? folders : [...folders.slice(0, 2), ...files]

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    })
  }

  const handleItemClick = (itemName: string) => {
    setSelectedItems([itemName])
  }

  const handleItemDoubleClick = (item: any) => {
    if (item.type === "folder") {
      setCurrentPath(item.name)
    } else {
      alert(`Opening ${item.name}...`)
    }
  }

  const menuItems = [
    {
      label: "File",
      items: [
        {
          label: "New",
          action: () => alert("New file/folder dialog would appear here"),
        },
        { separator: true },
        {
          label: "Create Shortcut",
          action: () => alert("Create shortcut functionality"),
          disabled: selectedItems.length === 0,
        },
        {
          label: "Delete",
          action: () => {
            if (selectedItems.length > 0) {
              alert(`Delete ${selectedItems.join(", ")}?`)
            }
          },
          disabled: selectedItems.length === 0,
        },
        {
          label: "Rename",
          action: () => {
            if (selectedItems.length === 1) {
              const newName = prompt("Enter new name:", selectedItems[0])
              if (newName) {
                alert(`Renamed to ${newName}`)
              }
            }
          },
          disabled: selectedItems.length !== 1,
        },
        {
          label: "Properties",
          action: () => {
            if (selectedItems.length > 0) {
              alert(`Properties for ${selectedItems[0]}`)
            }
          },
          disabled: selectedItems.length === 0,
        },
        { separator: true },
        {
          label: "Close",
          action: () => {
            // Close window logic
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Cut",
          action: () => alert("Cut functionality"),
          disabled: selectedItems.length === 0,
        },
        {
          label: "Copy",
          action: () => alert("Copy functionality"),
          disabled: selectedItems.length === 0,
        },
        {
          label: "Paste",
          action: () => alert("Paste functionality"),
        },
        { separator: true },
        {
          label: "Select All",
          action: () => setSelectedItems(items.map((item) => item.name)),
          shortcut: "Ctrl+A",
        },
        {
          label: "Invert Selection",
          action: () => {
            const newSelection = items.filter((item) => !selectedItems.includes(item.name)).map((item) => item.name)
            setSelectedItems(newSelection)
          },
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Large Icons",
          action: () => setViewMode("large"),
        },
        {
          label: "Small Icons",
          action: () => setViewMode("small"),
        },
        {
          label: "List",
          action: () => setViewMode("list"),
        },
        {
          label: "Details",
          action: () => setViewMode("details"),
        },
        { separator: true },
        {
          label: "Arrange Icons",
          action: () => alert("Arrange icons functionality"),
        },
        {
          label: "Refresh",
          action: () => alert("Refreshing..."),
          shortcut: "F5",
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () => alert("Help system would open here"),
        },
        { separator: true },
        {
          label: "About Windows Explorer",
          action: () => alert("Windows Explorer\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  const contextMenuItems = [
    {
      label: "Open",
      action: () => {
        if (selectedItems.length === 1) {
          const item = items.find((i) => i.name === selectedItems[0])
          if (item) handleItemDoubleClick(item)
        }
      },
      disabled: selectedItems.length !== 1,
    },
    { separator: true },
    {
      label: "Cut",
      action: () => alert("Cut functionality"),
      disabled: selectedItems.length === 0,
    },
    {
      label: "Copy",
      action: () => alert("Copy functionality"),
      disabled: selectedItems.length === 0,
    },
    {
      label: "Paste",
      action: () => alert("Paste functionality"),
    },
    { separator: true },
    {
      label: "Create Shortcut",
      action: () => alert("Create shortcut functionality"),
      disabled: selectedItems.length === 0,
    },
    {
      label: "Delete",
      action: () => {
        if (selectedItems.length > 0) {
          alert(`Delete ${selectedItems.join(", ")}?`)
        }
      },
      disabled: selectedItems.length === 0,
    },
    {
      label: "Rename",
      action: () => {
        if (selectedItems.length === 1) {
          const newName = prompt("Enter new name:", selectedItems[0])
          if (newName) {
            alert(`Renamed to ${newName}`)
          }
        }
      },
      disabled: selectedItems.length !== 1,
    },
    { separator: true },
    {
      label: "Properties",
      action: () => {
        if (selectedItems.length > 0) {
          alert(`Properties for ${selectedItems[0]}`)
        }
      },
      disabled: selectedItems.length === 0,
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <WindowMenuBar menus={menuItems} />

      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <span className="text-xs">Address: {currentPath}</span>
      </div>

      <div className="flex-1 bg-white p-2 overflow-auto" onContextMenu={handleRightClick}>
        {viewMode === "details" ? (
          <div>
            <div className="grid grid-cols-4 gap-2 p-1 bg-[#c0c0c0] border-b border-[#808080] text-xs font-bold">
              <div>Name</div>
              <div>Size</div>
              <div>Type</div>
              <div>Modified</div>
            </div>
            {items.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-2 p-1 cursor-pointer text-xs hover:bg-blue-100 ${
                  selectedItems.includes(item.name) ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => handleItemClick(item.name)}
                onDoubleClick={() => handleItemDoubleClick(item)}
              >
                <div className="flex items-center">
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </div>
                <div>{item.size}</div>
                <div>{item.type === "folder" ? "File Folder" : "Text Document"}</div>
                <div>{item.modified}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 ${viewMode === "large" ? "grid-cols-4" : "grid-cols-6"}`}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-2 hover:bg-blue-100 cursor-pointer rounded ${
                  selectedItems.includes(item.name) ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => handleItemClick(item.name)}
                onDoubleClick={() => handleItemDoubleClick(item)}
              >
                <div className={`${viewMode === "large" ? "text-2xl" : "text-lg"} mb-1`}>{item.icon}</div>
                <div className="text-xs text-center">{item.name}</div>
                {item.size && <div className="text-xs text-gray-500">{item.size}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {items.length} object(s) {selectedItems.length > 0 && `| ${selectedItems.length} selected`}
      </div>

      <WindowContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onClose={() => setContextMenu((prev) => ({ ...prev, visible: false }))}
        items={contextMenuItems}
      />
    </div>
  )
}
