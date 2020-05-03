import React from "react";
import NavigationItems from "../../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let attachedClasses = ["SideDrawer", "Close"];
  const { isAuth } = props;
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
