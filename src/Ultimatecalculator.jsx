import { useState } from "react";
import { motion } from "framer-motion";

// Define the calculator buttons
const buttons = [
  "C", "±", "%", "÷", 
  "7", "8", "9", "×", 
  "4", "5", "6", "-", 
  "1", "2", "3", "+", 
  "0", ".", "="
];

export default function UltimateCalculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);

  // Handle the button click events
  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplay("0");
      setPrevValue(null);
      setOperator(null);
    } else if (value === "±") {
      setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
    } else if (value === "%") {
      setDisplay((Number.parseFloat(display) / 100).toString());
    } else if (["+", "-", "×", "÷"].includes(value)) {
      setPrevValue(display);
      setOperator(value);
      setDisplay("0");
    } else if (value === "=") {
      if (prevValue && operator) {
        const prev = Number.parseFloat(prevValue);
        const current = Number.parseFloat(display);
        let result;
        switch (operator) {
          case "+":
            result = prev + current;
            break;
          case "-":
            result = prev - current;
            break;
          case "×":
            result = prev * current;
            break;
          case "÷":
            result = prev / current;
            break;
        }
        setDisplay(result.toString());
        setPrevValue(null);
        setOperator(null);
      }
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="text-right text-white text-6xl font-bold tracking-wider overflow-x-auto whitespace-nowrap">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-4">
          {buttons.map((btn) => (
            <motion.button
              key={btn}
              whileTap={{ scale: 0.95 }} // Button scale on tap
              className={`
                ${btn === "0" ? "col-span-2" : ""} // If '0' button, span two columns
                ${["C", "±", "%"].includes(btn) ? "bg-gray-700 text-pink-500" : ""}
                ${["+", "-", "×", "÷", "="].includes(btn) ? "bg-pink-600 text-white" : ""}
                ${!isNaN(btn) || btn === "." ? "bg-gray-700 text-white" : ""}
                h-20 rounded-2xl text-3xl font-bold shadow-lg
                transition-colors duration-150 ease-in-out
                hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50
              `}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}