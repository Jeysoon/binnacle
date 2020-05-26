import React, { useReducer, useState, useCallback } from "react";
// import { AuthContext } from "../../context/auth-context";
// import Button from "../../components/UI/Button/Button";
import classes from "./ProjectManager.css";
import Input from "../../components/UI/Input/Input";
// import Card from "../../components/UI/Card/Card";
// import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";
import ItemForm from "./ItemForm/ItemForm";
import { updateObject, checkValidity } from "../../shared/utility";

// const itemReducer = (currenItems, action) => {
//   switch (action.type) {
//     case "SET":
//       return action.items;
//     case "ADD":
//       return [...currenItems, action.item];
//     case "DELETE":
//       return currenItems.filter(itm => itm.id !== action.id);
//     default:
//       throw new Error("Should reach here");
//   }
// };

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not get here either");
  }
};

const ProjectManager = props => {
  // const context = useContext(AuthContext);

  // const [items, dispatch] = useReducer(itemReducer, []);

  // const [ projectData, setProjectData ] = useState('');
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  const [showProjectForm, setShowProjectForm] = useState(false);

  const [projectName, setProjectName] = useState("");

  const [form, setForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Projects Name "
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    }
  });

  const [isProjectCreated, setIsProjectCreated] = useState(false);

  // const [formIsValid, setFormIsValid] = useState(false);

  const projectSubmitHandler = useCallback(
    event => {
      event.preventDefault();
      const formData = {};
      for (let formElemenIdentifier in form) {
        formData[formElemenIdentifier] = form[formElemenIdentifier].value;
      }
      console.log("formData", formData);

      const preparedData = {
        ...form
      };

      fetch("https://binnacle-faafc.firebaseio.com/items.json", {
        method: "POST",
        body: JSON.stringify(preparedData),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          dispatchHttp({ type: "RESPONSE" });
          return response.json();
        })
        .catch(err => {
          console.log(err.errorMessage);
        });
      setIsProjectCreated(!isProjectCreated);
    },
    [form, isProjectCreated]
  );

  const inputChangedHandler = (event, inputIdentifier) => {
    event.preventDefault();
    const updatedFormElement = updateObject(form[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        form[inputIdentifier].validation
      ),
      touched: true
    });
    // const deepCloneForm = {
    //   ...form
    // };

    const updatedOrderForm = updateObject(form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setProjectName(event.target.value);
    setForm(updatedOrderForm);
    console.log("form first call: ", updatedOrderForm);
    // setFormIsValid(formIsValid);
  };
  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key]
    });
  }

  let initialData = (
    <div>
      <form onSubmit={projectSubmitHandler}>
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
            // changed={event=>(event.target.value)}
          />
        ))}
        <button>Add Project Name</button>
      </form>
    </div>
  );

  const showProjectFormHandler = event => {
    event.preventDefault();
    setShowProjectForm(!showProjectForm);
  };

  const addItemHandler = useCallback(
    item => {
      dispatchHttp({ type: "SEND" });

      const data = {
        ...item,
        nombreProyecto: projectName
      };

      fetch("https://binnacle-faafc.firebaseio.com/items.json", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          dispatchHttp({ type: "RESPONSE" });
          console.log("Response: ", response);
          return response.json();
        })
        .catch(err => {
          console.log(err.errorMessage);
        });
    },
    [projectName]
  );

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
        {isProjectCreated ? (
          <h1 className={classes.projectTitle}>{form.name.value}</h1>
        ) : (
          <h1 className={classes.Greet}>
            Provide data and life to your project!
          </h1>
        )}
        {!isProjectCreated && showProjectForm && initialData}
        {isProjectCreated && (
          <ItemForm onAddItem={addItemHandler} loading={httpState.loading} />
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
