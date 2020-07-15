import React from "react";
import classes from "./Projects.css";

const Projects = () => {
  return (
    //   <div>

    // <div className={classes.row, classes.beans}>
    // </div>
    // <div className={classes.row, classes.grinder}>
    // </div>
    // <div className={classes.row, classes.grinder_bottom}>
    // </div>
    // <div className={classes.row, classes.v60}>
    // </div>
    // <div className={classes.row, classes.drip}>
    // </div>
    // <div className={classes.row, classes.cup}>
    // </div>

    //   </div>
    <div>
      <h1 className={classes.Title}>Projects</h1>
      <div className={classes.container}>
        <div className={classes.coffee_header}>
          <div className={classes.coffee_header__buttons}></div>
          <div className={classes.coffee_header__buttons}></div>
          <div className={classes.coffee_header__display}></div>
          <div className={classes.coffee_header__details}></div>
        </div>
        <div className={classes.coffee_medium}>
          <div className={classes.coffe_medium__exit}></div>
          <div className={classes.coffee_medium__arm}></div>
          <div className={classes.coffee_medium__liquid}></div>
          <div className={classes.coffee_medium__smoke}></div>
          <div className={classes.coffee_medium__smoke}></div>
          <div className={classes.coffee_medium__smoke}></div>
          <div className={classes.coffee_medium__smoke}></div>
          <div className={classes.coffee_medium__cup}></div>
        </div>
        <div className={classes.coffee_footer}></div>
      </div>
    </div>
  );
};

export default Projects;
