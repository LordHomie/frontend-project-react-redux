import React from "react";
import TooltipComponent from "../TooltipComponent";

import classes from "./Input.module.css";

const Input = (props) => {
  const tooltipText =
    "Minimum 8 characters, at least one letter and one number";

  return (
    <div
      className={`${classes.control} ${
        props.validity === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.htmlFor}>
        {props.labelContent}
        {props.operation === "register" && (
          <TooltipComponent passwordRules={tooltipText}>
            <span className={classes["control__tooltip"]}>?</span>
          </TooltipComponent>
        )}
      </label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
