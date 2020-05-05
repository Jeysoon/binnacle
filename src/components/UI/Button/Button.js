import React from "react";

// import classes from "./Button.css";
import "./Button.css";

const button = props => (
  <button
    disabled={props.disabled}
    // className={[classes.Button, classes[props.btnType]].join(" ")}
    className="Button"
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
