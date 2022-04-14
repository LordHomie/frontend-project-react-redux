import loadingSpinner from "../../assets/loading_spinner.gif";
import classes from "./ListStatus.module.css";

const ListStatus = (props) => {
  let content = <p>Found no data.</p>;
  const { postsArray, error, isLoading, tableComponent } = props;

  if (postsArray.length > 0) {
    content = tableComponent;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <p>
        <img
          className={classes["list-status__img"]}
          src={loadingSpinner}
          alt="loading..."
        />
      </p>
    );
  }

  return <div className={classes["list-status"]}>{content}</div>;
};

export default ListStatus;
