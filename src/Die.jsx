import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld === true ? "#59E391" : "white",
  };
  return (
    <div className="dice--section">
      {props.value === 1 && (
        <div className="first-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
        </div>
      )}

      {props.value === 2 && (
        <div className="second-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      )}

      {props.value === 3 && (
        <div className="third-face" style={styles} onClick={props.holdDice}>
          <span className="pip"></span>
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      )}

      {props.value === 4 && (
        <div className="fourth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      )}

      {props.value === 5 && (
        <div className="fifth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      )}

      {props.value === 6 && (
        <div className="sixth-face" style={styles} onClick={props.holdDice}>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      )}
    </div>
  );
}
