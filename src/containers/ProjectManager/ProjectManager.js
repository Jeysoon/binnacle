import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import classes from "./ProjectManager.css";
// import Input from "../../components/UI/Input/Input";
const ProjectManager = props => {
  const context = useContext(AuthContext);
  console.log("Project Manager", context.isAuth);

  const submitProjectContent = event => {
    event.preventDefault();
    
  };

  return (
    <div className={classes.ProjectWraper}>
      <div className={classes.Content}>
        <p className={classes.Projects}>Projects</p>
        <button className={classes.Button} onClick={submitProjectContent}>New Project</button>
      </div>
      <section>
      </section>
    </div>
  );
};

export default ProjectManager;
