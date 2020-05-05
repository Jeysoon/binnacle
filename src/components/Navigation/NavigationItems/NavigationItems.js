import React from "react";

import "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className="NavigationItems">
      <li className="NavigationItem">
    {props.isAuthenticated ? (
      <NavigationItem link="/projects">My projects</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
    </li>
  </ul>
);

export default navigationItems;
