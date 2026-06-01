
import {useState, useEffect, useRef} from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Die from "./Components/Die.jsx"
import './App.css'

function App() {
  
const [dice, setDice] = useState(()=>generateAllNewDice())
const inputRef = useRef(null)

function generateAllNewDice(){
  return Array(10)
    .fill(0)
    .map(() => ({ 
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }))
}

const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={()=>hold(die.id)}/>)

function newDiceArr(){
  if(!gameWon){
    setDice(prevDice => prevDice.map(die=>
      !die.isHeld ? {...die, value: Math.ceil(Math.random() * 6)} : die
))
} else {
    setDice(generateAllNewDice())
  }
}

function hold(id){
  return setDice(dice.map((die)=>{
    return die.id === id ? {...die, isHeld:!die.isHeld} : die
  }))
}

const gameWon = (dice.every(die=>die.isHeld === true)&&
  dice.every(die => die.value === dice[0].value)) 

useEffect (()=>{
  gameWon ? inputRef.current.focus() : null
},[gameWon])
  
return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="reroll-button" ref={inputRef} onClick={newDiceArr}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
