import React, { useState, useContext } from "react";

import classes from"./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer/SideDrawer";
import { AuthContext } from "../../context/auth-context";

const Layout = props => {
  

  const authContext = useContext(AuthContext);

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    // this.setState( { showSideDrawer: false } );
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    // this.setState( ( prevState ) => {
    //     return { showSideDrawer: !prevState.showSideDrawer };
    // } );
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <>
      <Toolbar
        isAuth={authContext.isAuth}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={authContext.isAuth}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
      <footer className={classes.footer}>
        <nav>
          <ul className={classes.footer__links}>
            <li className={classes.footer__link}>
              <a href="/support">Support</a>
            </li>
            <li className={classes.footer__link}>
              <a href="/terms">Terms of Use</a>
            </li>
          </ul>
          <article className={classes.main__footer}>Jeyson Meza 2020</article>
        </nav>
      </footer>
    </>
  );
};

export default Layout;
