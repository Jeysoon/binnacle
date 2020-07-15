import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  isLoading: false,
  checkAuthState: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
      type: "AUTH_LOGOUT"
    };
  };
  // const authSuccess = (token, userId) => {
  //   return {
  //     type: "AUTH_SUCCESS",
  //     idToken: token,
  //     userId: userId
  //   };
  // };

  const checkAuthTimeout = expirationTime => {
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  const authCheckState = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    if (!token) {
      logout();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        logout();
      } else {
        // const userId = localStorage.getItem("userId");
        //authSuccess(token, userId);
        //setIsAuthenticated(true);
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      }
    }
  };

  const checkAuthStateHandler = props => {
    authCheckState();
  };

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        isAuth: isAuthenticated,
        checkAuthState: checkAuthStateHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
