import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

export default function App() {
  const [dice, setDice] = useState(allNewFaces());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);
    const allHeld = dice.every((die) => die.isHeld === true);
    if (allSame && allHeld) {
      setTenzies(true);
      console.log("You won");
    }
  }, [dice]);

  function generateRandomFaces() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewFaces() {
    const diceFaces = [];
    for (let i = 0; i < 10; i++) {
      diceFaces.push(generateRandomFaces());
    }
    return diceFaces;
  }

  const allDices = dice.map((dice) => (
    <Die
      key={dice.id}
      value={dice.value}
      holdDice={() => isHeld(dice.id)}
      isHeld={dice.isHeld}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateRandomFaces()))
      );
    } else {
      setTenzies(false);
      setDice(allNewFaces());
    }
  }

  function isHeld(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{allDices}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
