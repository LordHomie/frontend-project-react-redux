import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import classes from "./Register.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Register = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/login");
  };

  useEffect(() => {
    Register.displayName = "Register";
    const componentIdentifier = Register.displayName;
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
    if (storedLoginInfo) {
      setIsUserExist(true);
      return;
    }
    localStorage.setItem(emailState.value, passwordState.value);
    setIsUserExist(false);
    navigateHandler();
  };

  return (
    <Card className={classes.register}>
      <h1 className={classes["register__heading"]}>Sign Up</h1>
      <form onSubmit={submitHandler}>
        {isUserExist && (
          <span className={classes["register__form-error"]}>User Exists!</span>
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
          operation="register"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes["register__btn"]}>
          <Button disabled={!formIsValid}>Register</Button>
        </div>
        <div className={classes["register__login-link"]}>
          Member already? <button onClick={navigateHandler}>Login</button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
