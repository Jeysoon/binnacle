import React, { useState } from "react";

export const AuthContext = React.createContext({
  //Initial state
  isAuth: false,
  login: () => {},
  isLoading: false
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    console.log("isAuthenticated: ", isAuthenticated);
    setIsAuthenticated(true);
  };
  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
