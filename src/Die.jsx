import React from "react";

export default function Die(props) {
  return (
    <div className="dice--face">
      <h1>{props.value}</h1>
    </div>
  );
}
