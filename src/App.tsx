import { useState } from 'react'
import './App.css'


function App() {
  const [answer, updateAnswer] = useState("");
  const [expression, updateExpression] = useState("");
  const trimed = expression.trim();

  const regex = (userInput: string) => {
    return /[*/+-]/.test(userInput);
  };

  const result = () => {
    if (regex(trimed.charAt(trimed.length - 1))) return;
    const firstArr = trimed.split(" ");
    const secondArr = [];

  
    for (let i = firstArr.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(firstArr[i]) && regex(firstArr[i - 1])) {
        secondArr.unshift(firstArr[i]);
        let j = 0;
        let k = i - 1;
        while (regex(firstArr[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        secondArr.unshift(firstArr[i]);
      }
    }
    const newExpression = secondArr.join(" ");
    if (regex(newExpression.charAt(0))) {
      updateAnswer(eval(answer + newExpression) as string);
    } else {
      updateAnswer(eval(newExpression) as string);
    }
    updateExpression("");
  };




  const pressBtn = (userInput: string) => {
    if (userInput === "clear") {
      updateAnswer("");
      updateExpression("0");
    } else if (regex(userInput)) {
      updateExpression(trimed + " " + userInput + " ");
    } else if (userInput === "=") {
      result();
    } else if (userInput === "0") {
      if (expression.charAt(0) !== "0") {
        updateExpression(expression + userInput);
      }
    } else if (userInput === ".") {
    
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      if (lastNumber?.includes(".")) return;
      updateExpression(expression + userInput);
    } else {
      if (expression.charAt(0) === "0") {
        updateExpression(expression.slice(1) + userInput);
      } else {
        updateExpression(expression + userInput);
      }
    }
  };

  
  return (
    <>
      <div className='calculator' id='calculator'>
    
      <div id="display">
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
        <div id='buttons'>
        <button id='clear' className='operator' onClick={() => pressBtn('clear')}>C</button>
        <button id='subtract' className='operator' onClick={() => pressBtn('-')}>-</button>
        <button id='add' className='operator' onClick={() => pressBtn('+')}>+</button>
        <button id='multiply' className='operator' onClick={() => pressBtn('*')}>x</button>
        <button id='divide' className='operator' onClick={() => pressBtn('/')}>/</button>
        <button id='nine' onClick={() => pressBtn('9')}>9</button>
        <button id='eight' onClick={() => pressBtn('8')}>8</button>
        <button id='seven' onClick={() => pressBtn('7')}>7</button>
        <button id='six' onClick={() => pressBtn('6')}>6</button>
        <button id='five' onClick={() => pressBtn('5')}>5</button>
        <button id='four' onClick={() => pressBtn('4')}>4</button>
        <button id='three' onClick={() => pressBtn('3')}>3</button>
        <button id='two' onClick={() => pressBtn('2')}>2</button>
        <button id='one' onClick={() => pressBtn('1')}>1</button>
        <button id='zero' onClick={() => pressBtn('0')}>0</button>
        <button id='decimal' onClick={() => pressBtn('.')}>.</button>
        <button id='equals' onClick={() => pressBtn('=')}>=</button>
        </div>

      </div>
    </>
  )
}

export default App
