import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      //className={props.className !== null ? 'classes.' + props.className : classes.NavigationItem}
      activeClassName={classes.active}
    >
      {console.log("className:", props.className)}
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
