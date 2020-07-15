import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    {localStorage.getItem("token") !== null ? (
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
    ) : null}
    {localStorage.getItem("token") !== null ? (
      <NavigationItem link="/project-manager">Project Manager</NavigationItem>
    ) : null}
    {localStorage.getItem("token") !== null ? (
      <NavigationItem link="/projects">Projects</NavigationItem>
    ) : null}
    {!localStorage.getItem("token") ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem className="Logout" link="/logout">
        Log Out
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;
