import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Button from "../UI/Button/Button";

import classes from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateHandler = () => {
    localStorage.removeItem("loggedInUser");
    dispatch({ type: "logout" });
    navigate("/");
  };

  useEffect(() => {
    Profile.displayName = "Profile";
    const componentIdentifier = Profile.displayName;
    dispatch({ type: "setComponentName", name: componentIdentifier });
  }, [dispatch]);

  return (
    <main className={classes.profile}>
      <h1 className={classes["profile__heading"]}>You want to leave...?</h1>
      <div>
        <Button onClick={navigateHandler} className={classes["profile__btn"]}>
          Log Out
        </Button>
      </div>
    </main>
  );
};

export default Profile;
