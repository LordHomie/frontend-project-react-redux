import { useState } from "react";
import TableHeaderComponent from "./TableHeaderComponent";

import { sortByNumber } from "../sortingFunctions";
import { sortByString } from "../sortingFunctions";

import sortDefaultIcon from "../../../assets/sort_icon.png";
import sortUpIcon from "../../../assets/sortup_icon.png";
import sortDownIcon from "../../../assets/sortdown_icon.png";

import classes from "./TableComponent.module.css";

const TableComponent = (props) => {
  const [sortNameIcon, setSortNameIcon] = useState(sortDefaultIcon);
  const [sortPositionIcon, setSortPositionIcon] = useState(sortDefaultIcon);
  const [sortOfficeIcon, setSortOfficeIcon] = useState(sortDefaultIcon);
  const [sortAgeIcon, setSortAgeIcon] = useState(sortDefaultIcon);
  const [sortStartDateIcon, setSortStartDateIcon] = useState(sortDefaultIcon);
  const [sortSalaryIcon, setSortSalaryIcon] = useState(sortDefaultIcon);

  const [nameCount, setNameCount] = useState(1);
  const [positionCount, setPositionCount] = useState(1);
  const [officeCount, setOfficeCount] = useState(1);
  const [ageCount, setAgeCount] = useState(1);
  const [startDateCount, setStartDateCount] = useState(1);
  const [salaryCount, setSalaryCount] = useState(1);

  const sortFunc = (sortType, arr, property, operation) => {
    sortType(arr, property, operation);
    props.setPosts(arr);
    props.sortingHandler.sortingHandler();
  };

  const defaultSortFunc = () => {
    props.setPosts(props.defArr);
    props.sortingHandler.sortingHandler();
    setDefault();
  };

  const setDefault = () => {
    setSortAgeIcon(sortDefaultIcon);
    setSortNameIcon(sortDefaultIcon);
    setSortPositionIcon(sortDefaultIcon);
    setSortSalaryIcon(sortDefaultIcon);
    setSortOfficeIcon(sortDefaultIcon);
    setSortStartDateIcon(sortDefaultIcon);
  };

  const sortByAgeHandler = () => {
    setNameCount(1);
    setPositionCount(1);
    setSalaryCount(1);
    setOfficeCount(1);
    setStartDateCount(1);
    if (ageCount === 1) {
      sortFunc(sortByNumber, props.postsArray, "Age", "NumAsc");
      setDefault();
      setSortAgeIcon(sortUpIcon);
      setAgeCount((prevCount) => prevCount + 1);
      return;
    }
    if (ageCount === 2) {
      sortFunc(sortByNumber, props.postsArray, "Age", "NumDesc");
      setDefault();
      setSortAgeIcon(sortDownIcon);
      setAgeCount((prevCount) => prevCount + 1);
      return;
    }
    if (ageCount === 3) {
      defaultSortFunc();
      setAgeCount(1);
      return;
    }
  };

  const sortByNameHandler = () => {
    setAgeCount(1);
    setPositionCount(1);
    setSalaryCount(1);
    setOfficeCount(1);
    setStartDateCount(1);
    if (nameCount === 1) {
      sortFunc(sortByString, props.postsArray, "Name", "asc");
      setDefault();
      setSortNameIcon(sortUpIcon);
      setNameCount((prevCount) => prevCount + 1);
      return;
    }
    if (nameCount === 2) {
      sortFunc(sortByString, props.postsArray, "Name", "desc");
      setDefault();
      setSortNameIcon(sortDownIcon);
      setNameCount((prevCount) => prevCount + 1);
      return;
    }
    if (nameCount === 3) {
      defaultSortFunc();
      setNameCount(1);
      return;
    }
  };

  const sortByPositionHandler = () => {
    setAgeCount(1);
    setNameCount(1);
    setSalaryCount(1);
    setOfficeCount(1);
    setStartDateCount(1);
    if (positionCount === 1) {
      sortFunc(sortByString, props.postsArray, "Position", "asc");
      setDefault();
      setSortPositionIcon(sortUpIcon);
      setPositionCount((prevCount) => prevCount + 1);
      return;
    }
    if (positionCount === 2) {
      sortFunc(sortByString, props.postsArray, "Position", "desc");
      setDefault();
      setSortPositionIcon(sortDownIcon);
      setPositionCount((prevCount) => prevCount + 1);
      return;
    }
    if (positionCount === 3) {
      defaultSortFunc();
      setPositionCount(1);
      return;
    }
  };

  const sortByOfficeHandler = () => {
    setAgeCount(1);
    setNameCount(1);
    setPositionCount(1);
    setSalaryCount(1);
    setStartDateCount(1);
    if (officeCount === 1) {
      sortFunc(sortByString, props.postsArray, "Office", "asc");
      setDefault();
      setSortOfficeIcon(sortUpIcon);
      setOfficeCount((prevCount) => prevCount + 1);
      return;
    }
    if (officeCount === 2) {
      sortFunc(sortByString, props.postsArray, "Office", "desc");
      setDefault();
      setSortOfficeIcon(sortDownIcon);
      setOfficeCount((prevCount) => prevCount + 1);
      return;
    }
    if (officeCount === 3) {
      defaultSortFunc();
      setOfficeCount(1);
      return;
    }
  };

  const sortBySalaryHandler = () => {
    setAgeCount(1);
    setNameCount(1);
    setPositionCount(1);
    setOfficeCount(1);
    setStartDateCount(1);
    if (salaryCount === 1) {
      sortFunc(sortByNumber, props.postsArray, "Salary", "NumAsc");
      setDefault();
      setSortSalaryIcon(sortUpIcon);
      setSalaryCount((prevCount) => prevCount + 1);
      return;
    }
    if (salaryCount === 2) {
      sortFunc(sortByNumber, props.postsArray, "Salary", "NumDesc");
      setDefault();
      setSortSalaryIcon(sortDownIcon);
      setSalaryCount((prevCount) => prevCount + 1);
      return;
    }
    if (salaryCount === 3) {
      defaultSortFunc();
      setSalaryCount(1);
      return;
    }
  };

  const sortByStartDateHandler = () => {
    setAgeCount(1);
    setNameCount(1);
    setPositionCount(1);
    setSalaryCount(1);
    setOfficeCount(1);
    if (startDateCount === 1) {
      sortFunc(sortByNumber, props.postsArray, "StartDate", "DateAsc");
      setDefault();
      setSortStartDateIcon(sortUpIcon);
      setStartDateCount((prevCount) => prevCount + 1);
      return;
    }
    if (startDateCount === 2) {
      sortFunc(sortByNumber, props.postsArray, "StartDate", "DateDesc");
      setDefault();
      setSortStartDateIcon(sortDownIcon);
      setStartDateCount((prevCount) => prevCount + 1);
      return;
    }
    if (startDateCount === 3) {
      defaultSortFunc();
      setStartDateCount(1);
      return;
    }
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

  return (
    <table className={classes["list__table"]}>
      <thead>
        <tr>
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Name"}
            onClick={sortByNameHandler}
            sortIcon={sortNameIcon}
            alt={"Sort By Name"}
          />
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Position"}
            onClick={sortByPositionHandler}
            sortIcon={sortPositionIcon}
            alt={"Sort By Position"}
          />
          <TableHeaderComponent
            className={hideSizeS}
            title={"Office"}
            onClick={sortByOfficeHandler}
            sortIcon={sortOfficeIcon}
            alt={"Sort By Office"}
          />
          <TableHeaderComponent
            className={hideSizeM}
            title={"Age"}
            onClick={sortByAgeHandler}
            sortIcon={sortAgeIcon}
            alt={"Sort By Age"}
          />
          <TableHeaderComponent
            className={hideSizeL}
            title={"StartDate"}
            onClick={sortByStartDateHandler}
            sortIcon={sortStartDateIcon}
            alt={"Sort By StartDate"}
          />
          <TableHeaderComponent
            className={classes["list__table-head"]}
            title={"Salary"}
            onClick={sortBySalaryHandler}
            sortIcon={sortSalaryIcon}
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
