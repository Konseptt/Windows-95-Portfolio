"use client"

import { useState } from "react"
import WindowMenuBar from "../window-menu-bar"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const percentage = () => {
    const value = Number.parseFloat(display) / 100
    setDisplay(String(value))
  }

  const squareRoot = () => {
    const value = Math.sqrt(Number.parseFloat(display))
    setDisplay(String(value))
  }

  const reciprocal = () => {
    const value = 1 / Number.parseFloat(display)
    setDisplay(String(value))
  }

  const plusMinus = () => {
    const value = Number.parseFloat(display) * -1
    setDisplay(String(value))
  }

  // Memory functions
  const memoryClear = () => setMemory(0)
  const memoryRecall = () => setDisplay(String(memory))
  const memoryStore = () => setMemory(Number.parseFloat(display))
  const memoryAdd = () => setMemory(memory + Number.parseFloat(display))

  const menuItems = [
    {
      label: "Edit",
      items: [
        {
          label: "Copy",
          action: () => navigator.clipboard.writeText(display),
          shortcut: "Ctrl+C",
        },
        {
          label: "Paste",
          action: async () => {
            try {
              const text = await navigator.clipboard.readText()
              const num = Number.parseFloat(text)
              if (!Number.isNaN(num)) {
                setDisplay(String(num))
              }
            } catch (err) {
              alert("Invalid number in clipboard")
            }
          },
          shortcut: "Ctrl+V",
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Scientific",
          action: () => alert("Scientific mode not available in Windows 95 Calculator"),
        },
        {
          label: "Standard",
          action: () => alert("Already in Standard mode"),
        },
        {
          label: "Digit Grouping",
          action: () => alert("Digit grouping toggled"),
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Help Topics",
          action: () =>
            alert(
              "Calculator Help:\n- Use number keys or click buttons\n- Memory functions: MC, MR, MS, M+\n- Scientific functions available",
            ),
        },
        { separator: true },
        {
          label: "About Calculator",
          action: () => alert("Calculator\nVersion 4.0\nCopyright © 1995 Microsoft Corporation"),
        },
      ],
    },
  ]

  const Button = ({ onClick, className = "", children, disabled = false, ...props }: any) => (
    <button
      className={`h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs font-bold hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white transition-all duration-75 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className="w-64 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] flex flex-col">
      <WindowMenuBar menus={menuItems} />

      {/* Display */}
      <div className="p-2">
        <div className="bg-white border-2 border-[#808080] border-t-black border-l-black p-2 text-right font-mono text-lg h-8 flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Memory indicators */}
      <div className="px-2 pb-1">
        <div className="text-xs text-center h-4">
          {memory !== 0 && <span className="bg-gray-200 px-1 rounded">M</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-2 flex flex-col gap-1">
        {/* Memory row */}
        <div className="grid grid-cols-5 gap-1">
          <Button onClick={memoryClear} className="text-red-600">
            MC
          </Button>
          <Button onClick={memoryRecall}>MR</Button>
          <Button onClick={memoryStore}>MS</Button>
          <Button onClick={memoryAdd}>M+</Button>
          <Button onClick={clear} className="text-red-600">
            C
          </Button>
        </div>

        {/* Function row */}
        <div className="grid grid-cols-5 gap-1">
          <Button onClick={clearEntry}>CE</Button>
          <Button onClick={plusMinus}>±</Button>
          <Button onClick={squareRoot}>√</Button>
          <Button onClick={percentage}>%</Button>
          <Button onClick={reciprocal}>1/x</Button>
        </div>

        {/* Number pad rows */}
        <div className="grid grid-cols-5 gap-1">
          <Button onClick={() => inputNumber("7")}>7</Button>
          <Button onClick={() => inputNumber("8")}>8</Button>
          <Button onClick={() => inputNumber("9")}>9</Button>
          <Button onClick={() => inputOperation("÷")} className="text-blue-600">
            ÷
          </Button>
          <Button onClick={() => inputOperation("×")} className="text-blue-600">
            ×
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-1">
          <Button onClick={() => inputNumber("4")}>4</Button>
          <Button onClick={() => inputNumber("5")}>5</Button>
          <Button onClick={() => inputNumber("6")}>6</Button>
          <Button onClick={() => inputOperation("-")} className="text-blue-600">
            -
          </Button>
          <Button onClick={() => inputOperation("+")} className="text-blue-600">
            +
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-1">
          <Button onClick={() => inputNumber("1")}>1</Button>
          <Button onClick={() => inputNumber("2")}>2</Button>
          <Button onClick={() => inputNumber("3")}>3</Button>
          <Button onClick={performCalculation} className="text-blue-600 row-span-2">
            =
          </Button>
          <div></div>
        </div>

        <div className="grid grid-cols-5 gap-1">
          <Button onClick={() => inputNumber("0")} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
