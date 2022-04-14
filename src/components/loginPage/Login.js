import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import { validateEmail } from "../validationFunctions";
import { validatePassword } from "../validationFunctions";

import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: validateEmail(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validateEmail(state.value) };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: validatePassword(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validatePassword(state.value) };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [isUserExist, setIsUserExist] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/register");
  };

  useEffect(() => {
    Login.displayName = "Login";
    const componentIdentifier = Login.displayName;
    dispatch({ type: "setComponentName", name: componentIdentifier });
  }, [dispatch]);

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const storedLoginInfo = localStorage.getItem(emailState.value);
    if (storedLoginInfo && storedLoginInfo === passwordState.value) {
      localStorage.setItem("loggedInUser", emailState.value);
      setIsUserExist(true);
      setIsPasswordCorrect(true);
      dispatch({ type: "login", email: emailState.value });
      navigate("/");
    } else if (storedLoginInfo && storedLoginInfo !== passwordState.value) {
      setIsPasswordCorrect(false);
      setIsUserExist(true);
    } else if (!storedLoginInfo) {
      setIsUserExist(false);
      setIsPasswordCorrect(true);
    }
  };

  return (
    <Card className={classes.login}>
      <h1 className={classes["login__heading"]}>Login</h1>
      <form onSubmit={submitHandler}>
        {!isUserExist && (
          <span className={classes["login__form-error"]}>
            User Doesn't Exists!
          </span>
        )}
        {!isPasswordCorrect && (
          <span className={classes["login__form-error"]}>Wrong password!</span>
        )}
        <Input
          validity={emailState.isValid}
          htmlFor="email"
          labelContent="E-Mail"
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          validity={passwordState.isValid}
          htmlFor="password"
          labelContent="Password"
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes["login__btn"]}>
          <Button disabled={!formIsValid}>Login</Button>
        </div>
        <div className={classes["login__register-link"]}>
          Not a member? <button onClick={navigateHandler}>Register</button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
