import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

export default function App() {
  function timeFormat() {
    return { seconds: 0, minutes: 0, hours: 0 };
  }

  const getScore = JSON.parse(localStorage.getItem("score"));

  function decide() {
    if (getScore === null) {
      const arr = [{ seconds: 60, minutes: 60, hours: 24 }];
      return arr;
    } else {
      return getScore;
    }
  }
  function maxScore() {
    if (getScore) {
      const maxScore = {
        seconds: Math.min(...getScore.map((sec) => sec.seconds)),
        minutes: Math.min(...getScore.map((min) => min.minutes)),
        hours: Math.min(...getScore.map((hrs) => hrs.hours)),
      };
      return maxScore;
    } else {
      return { seconds: 0, minutes: 0, hours: 0 };
    }
  }
  const [dice, setDice] = useState(allNewFaces());
  const [tenzies, setTenzies] = useState(false);
  const [notSameValues, setNotSameValues] = useState(false);
  const [time, setTime] = useState(timeFormat());
  const [score, setScore] = useState(decide());
  const [highScore, setHighScore] = useState(maxScore());

  useEffect(() => {
    if (tenzies) {
      setScore((prevScore) => [...prevScore, time]);
      localStorage.setItem("score", JSON.stringify(score));
    }
  }, [tenzies]);

  useEffect(() => {
    if (getScore) {
      setHighScore({
        seconds: Math.min(...getScore.map((sec) => sec.seconds)),
        minutes: Math.min(...getScore.map((min) => min.minutes)),
        hours: Math.min(...getScore.map((hrs) => hrs.hours)),
      });
    }
  }, [score]);

  function resetHighScore() {
    localStorage.clear();
    setHighScore({ seconds: 0, minutes: 0, hours: 0 });
  }
  function timer() {
    setTime((prevTime) => ({
      ...prevTime,
      seconds: prevTime.seconds + 1,
    }));

    if (time.seconds === 59) {
      setTime((prevTime) => ({
        ...prevTime,
        seconds: 0,
        minutes: prevTime.minutes + 1,
      }));
    } else if (time.minutes === 59) {
      setTime((prevTime) => ({
        ...prevTime,
        minutes: 0,
      }));
    } else if (time.hours === 24) {
      setTime((prevTime) => ({
        ...prevTime,
        hours: 0,
      }));
    }
  }

  useEffect(() => {
    if (!tenzies) {
      let clearTimer = setInterval(timer, 1000);
      return () => clearInterval(clearTimer);
    }
  }, [time]);

  useEffect(() => {
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);
    const allHeld = dice.every((die) => die.isHeld === true);
    if (allSame && allHeld) {
      setTenzies(true);
    } else if (!allSame && allHeld) {
      setNotSameValues(true);
    } else {
      setNotSameValues(false);
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
      setTime(timeFormat());
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
      <h4>
        Time = {time.hours}:{time.minutes}:{time.seconds} &emsp; High Score ={" "}
        {highScore.hours}:{highScore.minutes}:{highScore.seconds}
      </h4>
      <div className="dice--container">{allDices}</div>
      {tenzies && (
        <h4>
          Congrats! You Won! : Time-Taken to win = {time.hours}:{time.minutes}:
          {time.seconds}
        </h4>
      )}
      {notSameValues && <h4>Please Select the Same Values</h4>}
      <div className="buttons">
        <button className="btn-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <button onClick={resetHighScore} className="btn-dice">
          Clear Score
        </button>
      </div>
    </main>
  );
}
