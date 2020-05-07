import React from "react";

import "./Button.css";

const button = props => (
  <button
    disabled={props.disabled}
    // className={[classes.Button, classes[props.btnType]].join(" ")}
    className={props.class}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
