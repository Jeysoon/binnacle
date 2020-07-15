import React, { useContext, Suspense, useEffect } from "react";
import { AuthContext } from "./context/auth-context";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Projects from "./containers/Projects/Projects";
import Logout from "./containers/Logout/Logout";

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
  const authContext = useContext(AuthContext);
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={Welcome} />
      <Redirect to="/" />
    </Switch>
  );
  //authContext.isAuth
  if (localStorage.getItem("token") !== null) {
    routes = (
      <Switch>
        <Route path="/project-manager" component={ProjectManager} />
        <Route path="/projects" component={Projects} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
    );
  }

  useEffect(() => {
    authContext.checkAuthState();
  }, [authContext]);

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
