import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
// import classes from "./ProjectCreator.css";
const ProjectCreator = props => {
  const context = useContext(AuthContext);

  return (
    <div>
      <header>UserName</header>
      <div>
        <p className="content">Project Creator</p>
        {context.isAuth && (
          <p className="content">isAuth:  {context.isAuth} </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCreator;
