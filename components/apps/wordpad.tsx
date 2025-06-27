"use client"

import type React from "react"

import { useState } from "react"
import WindowMenuBar from "../window-menu-bar"

export default function WordPad() {
  const [content, setContent] = useState("")
  const [fontSize, setFontSize] = useState(12)
  const [fontFamily, setFontFamily] = useState("Times New Roman")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [textAlign, setTextAlign] = useState("left")
  const [isModified, setIsModified] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setIsModified(true)
  }

  const insertDateTime = () => {
    const now = new Date().toLocaleString()
    setContent((prev) => prev + now)
    setIsModified(true)
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
            alert("Document saved!")
            setIsModified(false)
          },
          shortcut: "Ctrl+S",
        },
        {
          label: "Save As...",
          action: () => {
            const filename = prompt("Enter filename:", "Document")
            if (filename) {
              alert(`Document saved as ${filename}`)
              setIsModified(false)
            }
          },
        },
        { separator: true },
        {
          label: "Print...",
          action: () => {
            const printWindow = window.open("", "_blank")
            if (printWindow) {
              printWindow.document.write(`
                <html>
                  <head><title>Print Document</title></head>
                  <body style="font-family: ${fontFamily}; font-size: ${fontSize}px;">
                    <pre>${content}</pre>
                  </body>
                </html>
              `)
              printWindow.document.close()
              printWindow.print()
            }
          },
          shortcut: "Ctrl+P",
        },
        { separator: true },
        {
          label: "Exit",
          action: () => {
            if (isModified && !confirm("Discard changes?")) return
            // Close window
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          action: () => alert("Undo not implemented"),
          shortcut: "Ctrl+Z",
          disabled: true,
        },
        { separator: true },
        {
          label: "Cut",
          action: () => {
            navigator.clipboard.writeText(content)
            setContent("")
            setIsModified(true)
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
        { separator: true },
        {
          label: "Select All",
          action: () => {
            const textarea = document.querySelector("textarea")
            if (textarea) textarea.select()
          },
          shortcut: "Ctrl+A",
        },
        {
          label: "Find...",
          action: () => alert("Find dialog would appear here"),
          shortcut: "Ctrl+F",
        },
        {
          label: "Replace...",
          action: () => alert("Replace dialog would appear here"),
          shortcut: "Ctrl+H",
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Toolbar",
          action: () => alert("Toggle toolbar"),
        },
        {
          label: "Format Bar",
          action: () => alert("Toggle format bar"),
        },
        {
          label: "Ruler",
          action: () => alert("Toggle ruler"),
        },
        {
          label: "Status Bar",
          action: () => alert("Toggle status bar"),
        },
      ],
    },
    {
      label: "Insert",
      items: [
        {
          label: "Date and Time...",
          action: insertDateTime,
          shortcut: "F5",
        },
        {
          label: "Object...",
          action: () => alert("Insert object dialog would appear here"),
        },
      ],
    },
    {
      label: "Format",
      items: [
        {
          label: "Font...",
          action: () => {
            const newFont = prompt("Enter font family:", fontFamily)
            if (newFont) setFontFamily(newFont)
          },
        },
        {
          label: "Bullet Style",
          action: () => alert("Bullet style dialog would appear here"),
        },
        {
          label: "Paragraph...",
          action: () => alert("Paragraph dialog would appear here"),
        },
        {
          label: "Tabs...",
          action: () => alert("Tabs dialog would appear here"),
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () => alert("WordPad help would open here"),
        },
        { separator: true },
        {
          label: "About WordPad",
          action: () => alert("WordPad\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <WindowMenuBar menus={menuItems} />

      {/* Toolbar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-1">
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={() => {
            if (isModified && !confirm("Discard changes?")) return
            setContent("")
            setIsModified(false)
          }}
          title="New"
        >
          📄
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={() => alert("Open file dialog")}
          title="Open"
        >
          📁
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={() => {
            alert("Document saved!")
            setIsModified(false)
          }}
          title="Save"
        >
          💾
        </button>
        <div className="w-px h-6 bg-[#808080]" />
        <button
          className={`px-2 py-1 border border-[#808080] text-xs hover:bg-[#d0d0d0] ${isBold ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080]" : "bg-[#c0c0c0] border-t-white border-l-white"}`}
          onClick={() => setIsBold(!isBold)}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          className={`px-2 py-1 border border-[#808080] text-xs hover:bg-[#d0d0d0] ${isItalic ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080]" : "bg-[#c0c0c0] border-t-white border-l-white"}`}
          onClick={() => setIsItalic(!isItalic)}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          className={`px-2 py-1 border border-[#808080] text-xs hover:bg-[#d0d0d0] ${isUnderline ? "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080]" : "bg-[#c0c0c0] border-t-white border-l-white"}`}
          onClick={() => setIsUnderline(!isUnderline)}
          title="Underline"
        >
          <u>U</u>
        </button>
      </div>

      {/* Format Bar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <select
          className="px-1 py-0 border border-[#808080] text-xs h-5"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          <option>Times New Roman</option>
          <option>Arial</option>
          <option>Courier New</option>
          <option>Comic Sans MS</option>
        </select>
        <select
          className="px-1 py-0 border border-[#808080] text-xs h-5 w-12"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        >
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={14}>14</option>
          <option value={16}>16</option>
          <option value={18}>18</option>
          <option value={24}>24</option>
        </select>
      </div>

      <div className="flex-1 p-2">
        <textarea
          className="w-full h-full resize-none border-2 border-[#808080] border-t-black border-l-black p-2 focus:outline-none"
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your document..."
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            textAlign: textAlign as any,
          }}
        />
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {isModified ? "Modified" : "Ready"} | {content.length} characters
      </div>
    </div>
  )
}
