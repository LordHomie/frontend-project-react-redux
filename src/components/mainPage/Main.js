import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Button from "../UI/Button/Button";
import classes from "./Main.module.css";

const Main = () => {
  const authorization = useSelector((state) => state.isLoggedIn);
  const userEmail = useSelector((state) => state.userEmail);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/login");
  };

  useEffect(() => {
    Main.displayName = "Main";
    const componentIdentifier = Main.displayName;
    dispatch({ type: "setComponentName", name: componentIdentifier });
  }, [dispatch]);

  return (
    <main className={classes.main}>
      <header className={classes["main__header"]}>
        <h1>Welcome back!</h1>
        {!authorization ? (
          <h2>Haven't logged in yet?</h2>
        ) : (
          <h2>{userEmail}</h2>
        )}
      </header>
      {!authorization ? (
        <div className={classes["main__btn"]}>
          <Button onClick={navigateHandler}>Log In</Button>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default Main;
