import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes.btn} ${props.className}`;

  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={btnClasses}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
