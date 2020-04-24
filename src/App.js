import React, { useContext, Suspense } from 'react';
import Auth from './containers/Auth/Auth'; 
import { AuthContext } from './context/auth-context';
import {Route , BrowserRouter, Switch, useHistory, Redirect } from 'react-router-dom';
import ProjectCreator from './containers/ProjectCreator/ProjectCreator';
import Layout from './hoc/Layout/Layout';
import Welcome from './containers/Welcome/Welcome';

function App() {

  let routes = (
    <Switch>
      <Route path="/auth" render={(props)=> <Auth {...props}/>} />
      <Route path="/" exact component={Welcome} />
      <Route path="/" component={Layout} />
    </Switch>
      
  );

  const authContext = useContext(AuthContext);
  


  if(authContext.isAuth){
    routes = (
      <Switch>
        <Route  path="/project-creator" component={ProjectCreator} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
      
    );
  }
   return (
         <BrowserRouter>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {routes}
          </Suspense>
       </Layout>
    </BrowserRouter>
      
    
  );
}

export default App;
