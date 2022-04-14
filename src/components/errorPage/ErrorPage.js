import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Button from "../UI/Button/Button";

import errorIcon from "../../assets/error_icon.png";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    ErrorPage.displayName = "ErrorPage";
    const componentIdentifier = ErrorPage.displayName;
    dispatch({ type: "setComponentName", name: componentIdentifier });
  }, [dispatch]);

  return (
    <main className={classes.error}>
      <section className={classes["error__left-content"]}>
        <img src={errorIcon} alt="404 page not found" />
      </section>
      <section className={classes["error__right-content"]}>
        <h1 className={classes["error__heading"]}>Page Not Found</h1>
        <div className={classes["error__btn"]}>
          <Button onClick={navigateHandler}>Back to Main</Button>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
