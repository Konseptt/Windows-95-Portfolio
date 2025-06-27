"use client"

import { useState, useEffect } from "react"

interface Card {
  suit: string
  rank: string
  color: "red" | "black"
  faceUp: boolean
}

export default function Solitaire() {
  const [deck, setDeck] = useState<Card[]>([])
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []])
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []])
  const [waste, setWaste] = useState<Card[]>([])
  const [stock, setStock] = useState<Card[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)

  const suits = ["♠", "♥", "♦", "♣"]
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  const createDeck = (): Card[] => {
    const newDeck: Card[] = []
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        newDeck.push({
          suit,
          rank,
          color: suit === "♥" || suit === "♦" ? "red" : "black",
          faceUp: false,
        })
      })
    })
    return shuffleDeck(newDeck)
  }

  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const dealCards = () => {
    const newDeck = createDeck()
    const newTableau: Card[][] = [[], [], [], [], [], [], []]
    let deckIndex = 0

    // Deal cards to tableau
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = { ...newDeck[deckIndex] }
        card.faceUp = row === col
        newTableau[col].push(card)
        deckIndex++
      }
    }

    setTableau(newTableau)
    setStock(newDeck.slice(deckIndex))
    setWaste([])
    setFoundations([[], [], [], []])
    setScore(0)
    setMoves(0)
  }

  const drawFromStock = () => {
    if (stock.length === 0) {
      // Reset stock from waste
      setStock([...waste].reverse().map((card) => ({ ...card, faceUp: false })))
      setWaste([])
    } else {
      const newCard = { ...stock[0], faceUp: true }
      setWaste([newCard, ...waste])
      setStock(stock.slice(1))
    }
    setMoves(moves + 1)
  }

  const getCardValue = (rank: string): number => {
    if (rank === "A") return 1
    if (rank === "J") return 11
    if (rank === "Q") return 12
    if (rank === "K") return 13
    return Number.parseInt(rank)
  }

  const canPlaceOnFoundation = (card: Card, foundationIndex: number): boolean => {
    const foundation = foundations[foundationIndex]
    if (foundation.length === 0) {
      return card.rank === "A"
    }
    const topCard = foundation[foundation.length - 1]
    return card.suit === topCard.suit && getCardValue(card.rank) === getCardValue(topCard.rank) + 1
  }

  const canPlaceOnTableau = (card: Card, tableauIndex: number): boolean => {
    const column = tableau[tableauIndex]
    if (column.length === 0) {
      return card.rank === "K"
    }
    const topCard = column[column.length - 1]
    return card.color !== topCard.color && getCardValue(card.rank) === getCardValue(topCard.rank) - 1
  }

  useEffect(() => {
    dealCards()
  }, [])

  const renderCard = (card: Card | null, onClick?: () => void) => {
    if (!card) {
      return (
        <div className="w-16 h-20 border-2 border-dashed border-gray-400 rounded cursor-pointer" onClick={onClick} />
      )
    }

    return (
      <div
        className={`w-16 h-20 border border-gray-800 rounded cursor-pointer flex flex-col items-center justify-center text-xs font-bold ${
          card.faceUp ? `bg-white ${card.color === "red" ? "text-red-600" : "text-black"}` : "bg-blue-800 text-white"
        }`}
        onClick={onClick}
      >
        {card.faceUp ? (
          <>
            <div>{card.rank}</div>
            <div className="text-lg">{card.suit}</div>
          </>
        ) : (
          <div className="text-xs">🂠</div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full bg-green-700 p-4 overflow-auto">
      <div className="mb-4 flex justify-between items-center text-white">
        <div className="flex space-x-4">
          <div>Score: {score}</div>
          <div>Moves: {moves}</div>
        </div>
        <button
          className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black text-xs hover:bg-[#d0d0d0]"
          onClick={dealCards}
        >
          New Game
        </button>
      </div>

      <div className="space-y-4">
        {/* Top row: Stock, Waste, and Foundations */}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            {renderCard(stock.length > 0 ? stock[0] : null, drawFromStock)}
            {renderCard(waste.length > 0 ? waste[0] : null)}
          </div>

          <div className="flex space-x-2">
            {foundations.map((foundation, index) => (
              <div key={index}>{renderCard(foundation.length > 0 ? foundation[foundation.length - 1] : null)}</div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="flex space-x-2">
          {tableau.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-1 min-h-96">
              {column.length === 0
                ? renderCard(null)
                : column.map((card, cardIndex) => (
                    <div key={cardIndex} className={cardIndex === column.length - 1 ? "" : "-mb-14"}>
                      {renderCard(card)}
                    </div>
                  ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-white text-xs">
        <div>Click the deck to draw cards</div>
        <div>Drag cards to move them (demo version - click to interact)</div>
      </div>
    </div>
  )
}
