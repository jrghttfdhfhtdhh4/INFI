
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonStyle = (button) => {
    if (['÷', '×', '-', '+', '='].includes(button)) {
      return 'bg-red-600 text-white hover:bg-red-700';
    }
    if (['C', '±', '%'].includes(button)) {
      return 'bg-neutral-600 text-white hover:bg-neutral-500';
    }
    return 'bg-neutral-800 text-white hover:bg-neutral-700';
  };

  return (
    <div className="h-full flex flex-col bg-neutral-900 p-4">
      {/* Display */}
      <div className="flex-1 flex items-end justify-end bg-neutral-900 p-6 mb-4">
        <div className="text-right text-white text-6xl font-thin break-all">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((button) => (
          <motion.button
            key={button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (button === 'C') {
                clear();
              } else if (button === '=') {
                performCalculation();
              } else if (['+', '-', '×', '÷'].includes(button)) {
                inputOperation(button);
              } else if (button === '.') {
                if (display.indexOf('.') === -1) {
                  inputNumber('.');
                }
              } else if (button === '±') {
                setDisplay(String(-parseFloat(display)));
              } else if (button === '%') {
                setDisplay(String(parseFloat(display) / 100));
              } else {
                inputNumber(button);
              }
            }}
            className={`
              h-16 rounded-xl text-2xl font-medium transition-all duration-200
              ${getButtonStyle(button)}
              ${button === '0' ? 'col-span-2' : ''}
            `}
          >
            {button}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
