"use client"

import { useWindows } from "../window-context"

export default function GamesFolder() {
  const { openWindow } = useWindows()

  const games = [
    {
      name: "Minesweeper",
      icon: "💣",
      component: "Minesweeper",
      description: "Classic mine detection game",
    },
    {
      name: "Solitaire",
      icon: "🃏",
      component: "Solitaire",
      description: "Classic card game",
    },
    {
      name: "Snake",
      icon: "🐍",
      component: "Snake",
      description: "Retro snake game",
    },
  ]

  const openGame = (game: any) => {
    openWindow({
      title: game.name,
      component: game.component,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 200 },
      size: game.component === "Solitaire" ? { width: 800, height: 600 } : { width: 400, height: 450 },
    })
  }

  return (
    <div className="h-full bg-white p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Games</h2>
        <p className="text-sm text-gray-600">Classic Windows 95 games collection</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            onDoubleClick={() => openGame(game)}
          >
            <div className="text-4xl mb-2">{game.icon}</div>
            <div className="text-sm font-semibold text-center">{game.name}</div>
            <div className="text-xs text-gray-500 text-center mt-1">{game.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-gray-100 border border-gray-300 rounded">
        <h3 className="font-bold text-sm mb-2">Game Statistics</h3>
        <div className="text-xs space-y-1">
          <div>Total Games: {games.length}</div>
          <div>Most Popular: Minesweeper</div>
          <div>Difficulty: Easy to Hard</div>
        </div>
      </div>
    </div>
  )
}
