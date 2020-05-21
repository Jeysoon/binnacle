import React, { useContext, useState } from "react";
// import { AuthContext } from "../../context/auth-context";
import classes from "./ProjectManager.css";
import Input from "../../components/UI/Input/Input";
import { updateObject, checkValidity } from "../../shared/utility";
const ProjectManager = props => {
  // const context = useContext(AuthContext);

  const [showProjectForm, setShowProjectForm] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Nombre del proyecto"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      value: "fastest",
      validation: {},
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const projectFormSubmitHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElemenIdentifier in projectForm) {
      formData[formElemenIdentifier] = projectForm[formElemenIdentifier].value;
    }
    const project = {
      projectData: formData
    };

    console.log("Project: ", project);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(projectForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        projectForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedProjectForm = updateObject(projectForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedProjectForm) {
      formIsValid = updatedProjectForm[inputIdentifier].valid && formIsValid;
    }

    setProjectForm(updatedProjectForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in projectForm) {
    formElementsArray.push({
      id: key,
      config: projectForm[key]
    });
  }

  let form = (
    <form onSubmit={projectFormSubmitHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={formElement.config.valid}
          shoudlValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
    </form>
  );

  // const submitProjectContent = event => {
  //   event.preventDefault();
  // };

  const showProjectFormHandler = event => {
    event.preventDefault();
    setShowProjectForm(!showProjectForm);
    console.log("setShowProjectForm:", showProjectForm);
  };

  return (
    <div className={classes.ProjectCreator}>
      <div className={classes.ProjectWraper}>
        <div className={classes.Content}>
          <p className={classes.Projects}>Projects</p>
          <button className={classes.Button} onClick={showProjectFormHandler}>
            New Project
          </button>
        </div>
        <section className={classes.ProjectsSection}>
          <div className={classes.ProjectsContainer}></div>
        </section>
      </div>
      <div className={classes.ProjectFormContainer}>
        {showProjectForm && form}
      </div>
    </div>
  );
};

export default ProjectManager;
