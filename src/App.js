import React, { useContext, Suspense } from "react";
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
  const authContext = useContext(AuthContext);
  let routes = (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (authContext.isAuth) {
    routes = (
      <Switch>
        <Route path="/project-manager" component={ProjectManager} />
        <Route path="/projects" component={Projects} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
}

export default withRouter(App);
