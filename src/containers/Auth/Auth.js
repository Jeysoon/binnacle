import React, { useState, useContext, useReducer, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { AuthContext } from "../../context/auth-context";
import { updateObject, checkValidity } from "../../shared/utility";
import { Redirect } from "react-router-dom";
import classes from "./Auth.css";
import axios from "axios";

const Auth = () => {
  const authContext = useContext(AuthContext);

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Provide a valid email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "Password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const httpReducer = (curHttpState, action) => {
    switch (action.type) {
      case "SEND":
        return { shouldSend: true, loading: true, error: null };
      case "RESPONSE":
        return {
          ...curHttpState,
          shouldSend: false,
          loading: false,
          token: true
        };
      case "ERROR":
        return { loading: false, error: action.errorMessage };
      case "CLEAR":
        return { ...curHttpState, error: null };
      default:
        throw new Error("Should not be reached!");
    }
  };

  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    shouldSend: false,
    loading: false,
    error: null,
    token: false
  });

  const [signMethod, setSignMethod] = useState(false);

  useEffect(() => {
    if (httpState.token) {
      authContext.login();
    }
  }, [httpState.token, authContext]);

  const sendRequest = () => {
    const formData = {
      email: authForm.email.value,
      password: authForm.password.value,
      returnSecuretoken: true
    };
    let url = null;
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTXd7qMGoCoK0PrRCzONLylk8MNSTJuqE";

    if (signMethod) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTXd7qMGoCoK0PrRCzONLylk8MNSTJuqE";
    }

    dispatchHttp({ type: "SEND" });
    axios
      .post(url, formData)
      .then(response => {
        dispatchHttp({ type: "RESPONSE" });
        //dispatchHttp({token: response.data.idToken});
        httpState.token = response.data.idToken;
        return response.json();
      })
      .catch(err => {});
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    sendRequest();
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  let redirect = null;

  if (httpState.token) {
    redirect = <Redirect to="/project-manager" />;
  }

  const signInClicked = () => {
    setSignMethod(true);
  };
  const signUpClicked = () => {
    setSignMethod(false);
  };

  return (
    <>
      <div className={classes.switchSignMethodHandler}>
        <li>
          <Button
            class={!signMethod ? classes.ButtonActive : classes.Button}
            signMethod={signMethod}
            clicked={signUpClicked}
          >
            {" "}
            Sign Up
          </Button>
          <Button
            class={signMethod ? classes.ButtonActive : classes.Button}
            signMethod={signMethod}
            clicked={signInClicked}
          >
            {" "}
            Sign In
          </Button>
        </li>
      </div>
      <div className={classes.div__wraper}>
        <div className={classes.auth}>
          {redirect}
          <form className={classes.sign__form} onSubmit={submitHandler}>
            {!httpState.loading ? form : <Spinner />}
            <button className={classes.submit}>
              {" "}
              {!signMethod ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
