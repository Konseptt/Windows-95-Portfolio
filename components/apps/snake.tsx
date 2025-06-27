"use client"

import { useState, useEffect, useCallback } from "react"

interface Position {
  x: number
  y: number
}

export default function Snake() {
  const GRID_SIZE = 20
  const INITIAL_SNAKE = [{ x: 10, y: 10 }]
  const INITIAL_FOOD = { x: 15, y: 15 }

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateFood = useCallback(() => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection({ x: 0, y: -1 })
    setGameOver(false)
    setScore(0)
    setIsPlaying(false)
  }

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPlaying, generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction, isPlaying])

  useEffect(() => {
    if (isPlaying) {
      const gameInterval = setInterval(moveSnake, 150)
      return () => clearInterval(gameInterval)
    }
  }, [moveSnake, isPlaying])

  return (
    <div className="h-full bg-[#c0c0c0] p-4 flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full max-w-md">
        <div className="text-sm font-bold">Score: {score}</div>
        <button
          className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs hover:bg-[#d0d0d0]"
          onClick={isPlaying ? () => setIsPlaying(false) : gameOver ? resetGame : () => setIsPlaying(true)}
        >
          {isPlaying ? "Pause" : gameOver ? "New Game" : "Start"}
        </button>
      </div>

      <div
        className="bg-black border-2 border-[#808080] border-t-white border-l-white"
        style={{
          width: GRID_SIZE * 15,
          height: GRID_SIZE * 15,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
          const isFood = food.x === x && food.y === y
          const isHead = snake[0]?.x === x && snake[0]?.y === y

          return (
            <div
              key={index}
              className={`border border-gray-800 ${
                isSnake ? (isHead ? "bg-green-400" : "bg-green-600") : isFood ? "bg-red-500" : "bg-black"
              }`}
            />
          )
        })}
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold text-red-600 mb-2">Game Over!</div>
          <div className="text-sm">Final Score: {score}</div>
        </div>
      )}

      <div className="mt-4 text-xs text-center text-gray-600">Use arrow keys to control the snake</div>
    </div>
  )
}
