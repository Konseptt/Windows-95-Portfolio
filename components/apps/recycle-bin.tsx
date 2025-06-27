"use client"

import { useState } from "react"

export default function RecycleBin() {
  const [deletedItems] = useState([
    { name: "Old Project.zip", type: "Archive", dateDeleted: "12/20/2024", size: "2.5 MB" },
    { name: "Draft Resume.doc", type: "Document", dateDeleted: "12/18/2024", size: "45 KB" },
    { name: "Test Images", type: "Folder", dateDeleted: "12/15/2024", size: "1.2 MB" },
    { name: "Backup Config.txt", type: "Text File", dateDeleted: "12/10/2024", size: "2 KB" },
  ])

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleSelection = (itemName: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const emptyRecycleBin = () => {
    if (confirm("Are you sure you want to permanently delete all items in the Recycle Bin?")) {
      alert("Recycle Bin emptied! (This is a demo)")
    }
  }

  const restoreItems = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to restore.")
      return
    }
    alert(`Restored ${selectedItems.length} item(s)! (This is a demo)`)
    setSelectedItems([])
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            File
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            Edit
          </button>
          <button className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]">
            View
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-10 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-2">
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={restoreItems}
          disabled={selectedItems.length === 0}
        >
          🔄 Restore
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0]"
          onClick={emptyRecycleBin}
        >
          🗑️ Empty Recycle Bin
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto">
        {deletedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-6xl mb-4">🗑️</div>
            <div className="text-lg font-semibold mb-2">Recycle Bin is empty</div>
            <div className="text-sm">Deleted items will appear here</div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="grid grid-cols-4 gap-2 p-2 bg-[#c0c0c0] border-b border-[#808080] text-xs font-bold">
              <div>Name</div>
              <div>Type</div>
              <div>Date Deleted</div>
              <div>Size</div>
            </div>

            {/* Items */}
            <div className="p-2">
              {deletedItems.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-2 p-2 cursor-pointer text-xs hover:bg-gray-100 ${
                    selectedItems.includes(item.name) ? "bg-blue-100 border border-blue-300" : ""
                  }`}
                  onClick={() => toggleSelection(item.name)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {item.type === "Folder"
                        ? "📁"
                        : item.type === "Archive"
                          ? "📦"
                          : item.type === "Document"
                            ? "📄"
                            : "📝"}
                    </span>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div>{item.type}</div>
                  <div>{item.dateDeleted}</div>
                  <div>{item.size}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {deletedItems.length} object(s) | {selectedItems.length} selected
      </div>
    </div>
  )
}
