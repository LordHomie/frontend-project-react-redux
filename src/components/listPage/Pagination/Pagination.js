import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={props.className}>
      <ul className={classes["pagination"]}>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => props.paginate(num)}
              className={`${classes["pagination__btn"]} ${
                props.currentPage === num
                  ? classes["pagination__btn-hover"]
                  : ""
              }`}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
