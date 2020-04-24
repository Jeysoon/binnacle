import React, { useState, useContext, useReducer, useEffect, useCallback } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Card from '../../components/UI/Card/Card';
import {AuthContext} from '../../context/auth-context';
import {updateObject, checkValidity} from '../../shared/utility';
import ProjectCreator from '../ProjectCreator/ProjectCreator';
import { useHistory, Redirect } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';




const Auth = ( props ) => {

    const authContext = useContext(AuthContext);
    

   
    const [authForm, setAuthForm] = useState({email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Provide a valid email-address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'Password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
         
    });

    const history = useHistory();

    const httpReducer = (curHttpState, action) => {
        switch (action.type) {
          case 'SEND':
            return { loading: true, error: null };
          case 'RESPONSE':
            return { ...curHttpState, loading: false, token: true };
          case 'ERROR':
            return { loading: false, error: action.errorMessage };
          case 'CLEAR':
            return { ...curHttpState, error: null };
          default:
            throw new Error('Should not be reached!');
        }
      };

      const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
        token: false
      });
    
      if(httpState.token){
          console.log('Calling login function from authContext');
         authContext.login();
      }

    const signUpHandler = useCallback(() =>{
        //authContext.login();
        const formData={
        email: authForm.email.value,
        password: authForm.password.value,
        returnSecuretoken: true}
      

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWzqVWEi_uOtqui50Sr5L0x52cR-1wJhw';
        dispatchHttp({ type: 'SEND' });
        axios.post(url,formData)
        .then(response =>{
            dispatchHttp({type: 'RESPONSE'});
            httpState.token = response.data.idToken;
            console.log('Response Data:', response.data.idToken);

            // return response.json();
        }).catch(err=>{
           console.log(err.message);
        });
        // if (!isSignup) {
           // url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWzqVWEi_uOtqui50Sr5L0x52cR-1wJhw';
//        } 
        // console.log(props);
        //     fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(formData),
        //     headers: { 'Content-Type': 'application/json'}
        // })
        // .then(response =>{
        //     dispatchHttp({ type: 'SEND' });
        //     console.log('Response Data:', response);
        //     return response.json();
        // })
                 


    },[ authForm.email.value,authForm.password.value ],history);

    

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( authForm, {
            [controlName]: updateObject( authForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true
            } )
        } );
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        
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
        changed={(event) => inputChangedHandler(event, formElement.id)}
        />
        
    ));
    if(httpState.loading){
        form = <Spinner />; 
    }

    let redirect = null;

    if(httpState.token){
        redirect = <Redirect to="/project-creator" />;
    }

    return(
        <div className="auth">
            <Card>
                <form onSubmit={submitHandler}>
                    {form}
                    <p>Sign up to coninue</p>
                    {redirect}
                <Button 
                 clicked ={signUpHandler} btnType="Success">Sign up</Button>
            </form>
            </Card>
        </div>
    );
};

export default Auth;