import React from "react";

import classes from "./Spinner.css";

const LoadingIndicator = () => (
  <div className={classes.lds__ring}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;
