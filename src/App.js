import React, { useContext, Suspense, useEffect } from "react";
import { AuthContext } from "./context/auth-context";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Projects from "./containers/Projects/Projects";

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const ProjectManager = React.lazy(() => {
  return import("./containers/ProjectManager/ProjectManager");
});

const Welcome = React.lazy(() => {
  return import("./containers/Welcome/Welcome");
});

function App() {
  // const checkAuthTimeout = expirationTime => {
  //   return dispatch => {
  //     setTimeout(() => {
  //       dispatch(logout());
  //     }, expirationTime * 1000);
  //   };
  // };
  // const authSuccess = (token, userId) => {
  //   return {
  //     type: "AUTH_SUCCESS",
  //     idToken: token,
  //     userId: userId
  //   };
  // };
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("expirationDate");
  //   localStorage.removeItem("userId");
  //   return {
  //     type: "AUTH_LOGOUT"
  //   };
  // };

  // const authCheckState = () => {
  //   return dispatch => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       dispatch(logout());
  //     } else {
  //       const expirationDate = new Date(localStorage.getItem("expirationDate"));
  //       if (expirationDate <= new Date()) {
  //         dispatch(logout());
  //       } else {
  //         const userId = localStorage.getItem("userId");
  //         dispatch(authSuccess(token, userId));
  //         dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  //       }
  //     }
  //   };
  // };

  // useEffect(()=>{
  //     authCheckState();    
  // },[authCheckState]);

  // authCheckState();
  const authContext = useContext(AuthContext);
  // authContext.checkAuthState();

  // let isAuthenticated = localStorage.getItem('token');
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={Welcome} />
      <Redirect to="/" />
    </Switch>
  ); 
  //authContext.isAuth
   if (localStorage.getItem('token') !== null){
    routes = (
      <Switch>
        <Route path="/project-manager" component={ProjectManager} />
        <Route path="/projects" component={Projects} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
    );
  }


  useEffect(()=>{
    authContext.checkAuthState();
  },[authContext]);

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
