"use client"

import type React from "react"

import { useState } from "react"
import WindowMenuBar from "../window-menu-bar"
import WindowContextMenu from "../window-context-menu"

export default function Notepad() {
  const [content, setContent] = useState("")
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  })
  const [fileName, setFileName] = useState("Untitled")
  const [isModified, setIsModified] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setIsModified(true)
  }

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    })
  }

  const menuItems = [
    {
      label: "File",
      items: [
        {
          label: "New",
          action: () => {
            if (isModified && !confirm("Discard changes?")) return
            setContent("")
            setFileName("Untitled")
            setIsModified(false)
          },
          shortcut: "Ctrl+N",
        },
        {
          label: "Open...",
          action: () => alert("Open file dialog would appear here"),
          shortcut: "Ctrl+O",
        },
        {
          label: "Save",
          action: () => {
            alert(`File "${fileName}" saved successfully!`)
            setIsModified(false)
          },
          shortcut: "Ctrl+S",
        },
        {
          label: "Save As...",
          action: () => {
            const newName = prompt("Enter filename:", fileName)
            if (newName) {
              setFileName(newName)
              setIsModified(false)
              alert(`File saved as "${newName}"`)
            }
          },
        },
        { separator: true },
        {
          label: "Page Setup...",
          action: () => alert("Page setup dialog would appear here"),
        },
        {
          label: "Print...",
          action: () => alert("Print dialog would appear here"),
          shortcut: "Ctrl+P",
        },
        { separator: true },
        {
          label: "Exit",
          action: () => {
            if (isModified && !confirm("Discard changes?")) return
            // Close window logic would go here
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          action: () => alert("Undo functionality not implemented"),
          shortcut: "Ctrl+Z",
          disabled: true,
        },
        { separator: true },
        {
          label: "Cut",
          action: () => {
            navigator.clipboard.writeText(content)
            setContent("")
          },
          shortcut: "Ctrl+X",
        },
        {
          label: "Copy",
          action: () => navigator.clipboard.writeText(content),
          shortcut: "Ctrl+C",
        },
        {
          label: "Paste",
          action: async () => {
            try {
              const text = await navigator.clipboard.readText()
              setContent((prev) => prev + text)
              setIsModified(true)
            } catch (err) {
              alert("Paste failed")
            }
          },
          shortcut: "Ctrl+V",
        },
        {
          label: "Delete",
          action: () => {
            setContent("")
            setIsModified(true)
          },
          shortcut: "Del",
        },
        { separator: true },
        {
          label: "Select All",
          action: () => {
            const textarea = document.querySelector("textarea")
            if (textarea) {
              textarea.select()
            }
          },
          shortcut: "Ctrl+A",
        },
        {
          label: "Time/Date",
          action: () => {
            const now = new Date().toLocaleString()
            setContent((prev) => prev + now)
            setIsModified(true)
          },
          shortcut: "F5",
        },
      ],
    },
    {
      label: "Search",
      items: [
        {
          label: "Find...",
          action: () => alert("Find dialog would appear here"),
          shortcut: "Ctrl+F",
        },
        {
          label: "Find Next",
          action: () => alert("Find next functionality not implemented"),
          shortcut: "F3",
          disabled: true,
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
          label: "About Notepad",
          action: () => alert("Notepad\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  const contextMenuItems = [
    {
      label: "Undo",
      action: () => alert("Undo functionality not implemented"),
      disabled: true,
    },
    { separator: true },
    {
      label: "Cut",
      action: () => {
        navigator.clipboard.writeText(content)
        setContent("")
      },
    },
    {
      label: "Copy",
      action: () => navigator.clipboard.writeText(content),
    },
    {
      label: "Paste",
      action: async () => {
        try {
          const text = await navigator.clipboard.readText()
          setContent((prev) => prev + text)
          setIsModified(true)
        } catch (err) {
          alert("Paste failed")
        }
      },
    },
    {
      label: "Delete",
      action: () => {
        setContent("")
        setIsModified(true)
      },
    },
    { separator: true },
    {
      label: "Select All",
      action: () => {
        const textarea = document.querySelector("textarea")
        if (textarea) {
          textarea.select()
        }
      },
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <WindowMenuBar menus={menuItems} />

      <div className="flex-1 p-1">
        <textarea
          className="w-full h-full resize-none border-2 border-[#808080] border-t-black border-l-black p-2 font-mono text-sm focus:outline-none"
          value={content}
          onChange={handleContentChange}
          onContextMenu={handleRightClick}
          placeholder="Type your text here..."
        />
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
