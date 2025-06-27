"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborCount: number
}

export default function Minesweeper() {
  const ROWS = 9
  const COLS = 9
  const MINES = 10

  const [board, setBoard] = useState<Cell[][]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [mineCount, setMineCount] = useState(MINES)
  const [firstClick, setFirstClick] = useState(true)

  const initializeBoard = useCallback(() => {
    const newBoard: Cell[][] = []
    for (let i = 0; i < ROWS; i++) {
      newBoard[i] = []
      for (let j = 0; j < COLS; j++) {
        newBoard[i][j] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0,
        }
      }
    }
    return newBoard
  }, [])

  const placeMines = useCallback((board: Cell[][], firstRow: number, firstCol: number) => {
    let minesPlaced = 0
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS)
      const col = Math.floor(Math.random() * COLS)

      if (!board[row][col].isMine && !(row === firstRow && col === firstCol)) {
        board[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor counts
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!board[i][j].isMine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di
              const nj = j + dj
              if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && board[ni][nj].isMine) {
                count++
              }
            }
          }
          board[i][j].neighborCount = count
        }
      }
    }
  }, [])

  const revealCell = useCallback(
    (row: number, col: number) => {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })))

        if (firstClick) {
          placeMines(newBoard, row, col)
          setFirstClick(false)
        }

        const reveal = (r: number, c: number) => {
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) {
            return
          }

          newBoard[r][c].isRevealed = true

          if (newBoard[r][c].isMine) {
            setGameStatus("lost")
            // Reveal all mines
            for (let i = 0; i < ROWS; i++) {
              for (let j = 0; j < COLS; j++) {
                if (newBoard[i][j].isMine) {
                  newBoard[i][j].isRevealed = true
                }
              }
            }
            return
          }

          if (newBoard[r][c].neighborCount === 0) {
            for (let di = -1; di <= 1; di++) {
              for (let dj = -1; dj <= 1; dj++) {
                reveal(r + di, c + dj)
              }
            }
          }
        }

        reveal(row, col)
        return newBoard
      })
    },
    [firstClick, placeMines],
  )

  const toggleFlag = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault()
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })))
      if (!newBoard[row][col].isRevealed) {
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
        setMineCount((prev) => (newBoard[row][col].isFlagged ? prev - 1 : prev + 1))
      }
      return newBoard
    })
  }, [])

  const resetGame = () => {
    setBoard(initializeBoard())
    setGameStatus("playing")
    setMineCount(MINES)
    setFirstClick(true)
  }

  useEffect(() => {
    setBoard(initializeBoard())
  }, [initializeBoard])

  useEffect(() => {
    if (gameStatus === "playing" && board.length > 0) {
      const revealedCount = board.flat().filter((cell) => cell.isRevealed && !cell.isMine).length
      const totalNonMines = ROWS * COLS - MINES
      if (revealedCount === totalNonMines) {
        setGameStatus("won")
      }
    }
  }, [board, gameStatus])

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return "🚩"
    if (!cell.isRevealed) return ""
    if (cell.isMine) return "💣"
    if (cell.neighborCount === 0) return ""
    return cell.neighborCount.toString()
  }

  const getCellStyle = (cell: Cell) => {
    let baseStyle = "w-6 h-6 border text-xs font-bold flex items-center justify-center cursor-pointer "

    if (cell.isRevealed) {
      if (cell.isMine) {
        baseStyle += "bg-red-500 "
      } else {
        baseStyle += "bg-[#c0c0c0] border-[#808080] "
      }
    } else {
      baseStyle += "bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] "
    }

    if (cell.neighborCount > 0 && cell.isRevealed && !cell.isMine) {
      const colors = [
        "",
        "text-blue-600",
        "text-green-600",
        "text-red-600",
        "text-purple-600",
        "text-yellow-600",
        "text-pink-600",
        "text-black",
        "text-gray-600",
      ]
      baseStyle += colors[cell.neighborCount] || "text-black"
    }

    return baseStyle
  }

  return (
    <div className="h-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-2 p-2 bg-[#c0c0c0] border-2 border-[#808080] border-t-white border-l-white">
        <div className="bg-black text-red-500 px-2 py-1 font-mono text-sm border-2 border-[#808080] border-t-black border-l-black">
          {mineCount.toString().padStart(3, "0")}
        </div>
        <button
          className="w-8 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-lg hover:bg-[#d0d0d0]"
          onClick={resetGame}
        >
          {gameStatus === "won" ? "😎" : gameStatus === "lost" ? "😵" : "🙂"}
        </button>
        <div className="bg-black text-red-500 px-2 py-1 font-mono text-sm border-2 border-[#808080] border-t-black border-l-black">
          000
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-9 gap-0 border-2 border-[#808080] border-t-white border-l-white p-2 bg-[#c0c0c0]">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={getCellStyle(cell)}
                onClick={() => gameStatus === "playing" && revealCell(i, j)}
                onContextMenu={(e) => gameStatus === "playing" && toggleFlag(i, j, e)}
              >
                {getCellContent(cell)}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
