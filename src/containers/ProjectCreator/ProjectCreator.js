import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import classes from "./ProjectCreator.css";
const ProjectCreator = props => {
  const context = useContext(AuthContext);
  console.log('Project Creator' ,context.isAuth);
  return (
      <div>
        <p className={classes.Content}>Project Creator</p>
      </div>
  );
};

export default ProjectCreator;
