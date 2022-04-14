import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Navbar.module.css";
import menuIcon from "../assets/menu_icon.png";

const Navbar = (props) => {
  const authorization = useSelector((state) => state.isLoggedIn);
  const componentName = useSelector((state) => state.componentName);

  const [isMenuBtnOpen, setIsMenuButtonopen] = useState(false);

  const menuBtnHandler = () => {
    setIsMenuButtonopen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsMenuButtonopen(false);
  }, [componentName]);

  return (
    <nav className={classes.navbar}>
      <button className={classes["navbar__button"]}>
        <img
          src={menuIcon}
          alt="navbar menu button"
          onClick={menuBtnHandler}
          className={isMenuBtnOpen ? classes["navbar__button-rotate"] : ""}
        />
      </button>
      <div
        className={`${classes["navbar__links"]} ${
          isMenuBtnOpen ? classes["navbar__links-show"] : ""
        }`}
      >
        {props.mainPage}
        {!authorization ? props.loginPage : ""}
        {props.profilePage}
        {props.listPage}
      </div>
    </nav>
  );
};

export default Navbar;
