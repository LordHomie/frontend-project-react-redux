import { useReducer } from "react";
import TableHeaderComponent from "./TableHeaderComponent";

import { sortByNumber } from "../sortingFunctions";
import { sortByString } from "../sortingFunctions";

import classes from "./TableComponent.module.css";

const sortReducer = (state, action) => {
  if (action.type === "SORT_AGE") {
    return {
      sortAge: true,
      sortName: false,
      sortPosition: false,
      sortOffice: false,
      sortSalary: false,
      sortStartDate: false,
    };
  }
  if (action.type === "SORT_NAME") {
    return {
      sortName: true,
      sortAge: false,
      sortPosition: false,
      sortOffice: false,
      sortSalary: false,
      sortStartDate: false,
    };
  }
  if (action.type === "SORT_POSITION") {
    return {
      sortPosition: true,
      sortAge: false,
      sortName: false,
      sortOffice: false,
      sortSalary: false,
      sortStartDate: false,
    };
  }
  if (action.type === "SORT_OFFICE") {
    return {
      sortOffice: true,
      sortAge: false,
      sortName: false,
      sortPosition: false,
      sortSalary: false,
      sortStartDate: false,
    };
  }
  if (action.type === "SORT_SALARY") {
    return {
      sortSalary: true,
      sortOffice: false,
      sortAge: false,
      sortName: false,
      sortPosition: false,
      sortStartDate: false,
    };
  }
  if (action.type === "SORT_STARTDATE") {
    return {
      sortStartDate: true,
      sortSalary: false,
      sortOffice: false,
      sortAge: false,
      sortName: false,
      sortPosition: false,
    };
  }
  return {
    sortAge: false,
    sortName: false,
    sortPosition: false,
    sortOffice: false,
    sortSalary: false,
    sortStartDate: false,
  };
};

const TableComponent = (props) => {
  const [sortState, dispatchSort] = useReducer(sortReducer, {
    sortAge: false,
    sortName: false,
    sortPosition: false,
    sortOffice: false,
    sortSalary: false,
    sortStartDate: false,
  });

  const {
    sortAge,
    sortName,
    sortPosition,
    sortOffice,
    sortSalary,
    sortStartDate,
  } = sortState;

  const sortByAgeHandler = () => {
    sortByNumber(props.postsArray);
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_AGE" });
    props.sortingHandler.sortingHandler();
  };

  const sortByNameHandler = () => {
    sortByString(props.postsArray, "Name");
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_NAME" });
    props.sortingHandler.sortingHandler();
  };

  const sortByPositionHandler = () => {
    sortByString(props.postsArray, "Position");
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_POSITION" });
    props.sortingHandler.sortingHandler();
  };

  const sortByOfficeHandler = () => {
    sortByString(props.postsArray, "Office");
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_OFFICE" });
    props.sortingHandler.sortingHandler();
  };

  const sortBySalaryHandler = () => {
    sortByString(props.postsArray, "Salary");
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_SALARY" });
    props.sortingHandler.sortingHandler();
  };

  const sortByStartDateHandler = () => {
    sortByNumber(props.postsArray, "StartDate");
    props.setPosts(props.postsArray);
    dispatchSort({ type: "SORT_STARTDATE" });
    props.sortingHandler.sortingHandler();
  };

  const hideSizeL = `${classes["list__table-head"]} ${classes["list__table-head_hide_L"]}`;
  const hideSizeM = `${classes["list__table-head"]} ${classes["list__table-head_hide_M"]}`;
  const hideSizeS = `${classes["list__table-head"]} ${classes["list__table-head_hide_S"]}`;

  const employeesArr = props.employees.map((e) => (
    <tr key={e.id}>
      <td>{e.Name}</td>
      <td>{e.Position}</td>
      <td className={hideSizeS}>{e.Office}</td>
      <td className={hideSizeM}>{e.Age}</td>
      <td className={hideSizeL}>{e.StartDate}</td>
      <td>{`${e.Currency}${e.Salary}`}</td>
    </tr>
  ));

  const nameCursor = `${!sortName ? "pointer" : "auto"}`;
  const positionCursor = `${!sortPosition ? "pointer" : "auto"}`;
  const ageCursor = `${!sortAge ? "pointer" : "auto"}`;
  const officeCursor = `${!sortOffice ? "pointer" : "auto"}`;
  const salaryCursor = `${!sortSalary ? "pointer" : "auto"}`;
  const startDateCursor = `${!sortStartDate ? "pointer" : "auto"}`;

  return (
    <table className={classes["list__table"]}>
      <thead>
        <tr>
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Name"}
            onClick={sortByNameHandler}
            cursor={nameCursor}
            alt={"Sort By Name"}
          />
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Position"}
            onClick={sortByPositionHandler}
            cursor={positionCursor}
            alt={"Sort By Position"}
          />
          <TableHeaderComponent
            className={hideSizeS}
            title={"Office"}
            onClick={sortByOfficeHandler}
            cursor={officeCursor}
            alt={"Sort By Office"}
          />
          <TableHeaderComponent
            className={hideSizeM}
            title={"Age"}
            onClick={sortByAgeHandler}
            cursor={ageCursor}
            alt={"Sort By Age"}
          />
          <TableHeaderComponent
            className={hideSizeL}
            title={"StartDate"}
            onClick={sortByStartDateHandler}
            cursor={startDateCursor}
            alt={"Sort By StartDate"}
          />
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Salary"}
            onClick={sortBySalaryHandler}
            cursor={salaryCursor}
            alt={"Sort By Salary"}
          />
        </tr>
      </thead>
      <tbody>{employeesArr}</tbody>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th className={hideSizeS}>Office</th>
          <th className={hideSizeM}>Age</th>
          <th className={hideSizeL}>Start date</th>
          <th>Salary</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableComponent;
