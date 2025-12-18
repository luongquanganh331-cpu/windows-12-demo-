
import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;
      switch (operation) {
        case '+': newValue = currentValue + inputValue; break;
        case '-': newValue = currentValue - inputValue; break;
        case '*': newValue = currentValue * inputValue; break;
        case '/': newValue = currentValue / inputValue; break;
        case '=': newValue = inputValue; break;
      }
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }
    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const btnBase = "h-12 flex items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95";
  const numBtn = `${btnBase} bg-white/5 hover:bg-white/10 text-white`;
  const opBtn = `${btnBase} bg-blue-600 text-white shadow-lg`;
  const sciBtn = `${btnBase} bg-white/10 hover:bg-white/20 text-blue-300 text-[10px]`;

  return (
    <div className="h-full bg-zinc-900 flex flex-col p-6">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsScientific(!isScientific)}
          className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-2"
        >
          <i className="fa-solid fa-flask"></i>
          {isScientific ? 'Scientific' : 'Standard'}
        </button>
        <i className="fa-solid fa-clock-rotate-left text-white/40 cursor-pointer"></i>
      </div>

      <div className="flex-1 flex flex-col justify-end items-end p-4 mb-6">
        <div className="text-white/30 text-xs h-4 mb-2">
          {prevValue !== null ? `${prevValue} ${operation === '=' ? '' : (operation || '')}` : ''}
        </div>
        <div className="text-white text-5xl font-light tracking-tight truncate w-full text-right drop-shadow-lg">
          {display}
        </div>
      </div>
      
      <div className={`grid gap-2 ${isScientific ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {isScientific && (
          <>
            <button className={sciBtn}>sin</button>
            <button className={sciBtn}>cos</button>
            <button className={sciBtn}>tan</button>
            <button className={sciBtn}>log</button>
            <button className={sciBtn}>ln</button>
          </>
        )}
        <button onClick={clearAll} className={`${btnBase} bg-red-500/20 text-red-400 hover:bg-red-500/30`}>AC</button>
        <button onClick={() => setDisplay(String(parseFloat(display) * -1))} className={numBtn}>+/-</button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className={numBtn}>%</button>
        <button onClick={() => performOperation('/')} className={opBtn}>÷</button>

        <button onClick={() => inputDigit('7')} className={numBtn}>7</button>
        <button onClick={() => inputDigit('8')} className={numBtn}>8</button>
        <button onClick={() => inputDigit('9')} className={numBtn}>9</button>
        <button onClick={() => performOperation('*')} className={opBtn}>×</button>

        <button onClick={() => inputDigit('4')} className={numBtn}>4</button>
        <button onClick={() => inputDigit('5')} className={numBtn}>5</button>
        <button onClick={() => inputDigit('6')} className={numBtn}>6</button>
        <button onClick={() => performOperation('-')} className={opBtn}>−</button>

        <button onClick={() => inputDigit('1')} className={numBtn}>1</button>
        <button onClick={() => inputDigit('2')} className={numBtn}>2</button>
        <button onClick={() => inputDigit('3')} className={numBtn}>3</button>
        <button onClick={() => performOperation('+')} className={opBtn}>+</button>

        <button onClick={() => inputDigit('0')} className={`${numBtn} ${isScientific ? 'col-span-2' : 'col-span-2'}`}>0</button>
        <button onClick={() => { if (!display.includes('.')) setDisplay(display + '.'); }} className={numBtn}>.</button>
        <button onClick={() => performOperation('=')} className={opBtn}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
