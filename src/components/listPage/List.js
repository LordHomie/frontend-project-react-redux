import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card/Card";
import TableComponent from "./TableComponent/TableComponent";
import Button from "../UI/Button/Button";
import Pagination from "./Pagination/Pagination";
import ListStatus from "./ListStatus";

import classes from "./List.module.css";

const employees = `[
  {
    "id": "1",
    "Name": "Brenden Wagner",
    "Position": "Software Engineer",
    "Office": "San Francisco",
    "Age": "28",
    "StartDate": "2011/06/07",
    "Salary": "206.855",
    "Currency": "$"
  },
  {
    "id": "2",
    "Name": "Aria Satou",
    "Position": "Accountant",
    "Office": "Dubai",
    "Age": "33",
    "StartDate": "2009/05/04",
    "Salary": "300.709",
    "Currency": "$"
  },
  {
    "id": "3",
    "Name": "Aashton Cox",
    "Position": "Sales Assistant",
    "Office": "Moscow",
    "Age": "25",
    "StartDate": "2019/09/10",
    "Salary": "100.633",
    "Currency": "$"
  },
  {
    "id": "4",
    "Name": "Caesar Vence",
    "Position": "Senior JavaScript Developer",
    "Office": "Berlin",
    "Age": "40",
    "StartDate": "2015/02/01",
    "Salary": "250.000",
    "Currency": "$"
  },
  {
    "id": "5",
    "Name": "Moe Rami",
    "Position": "Frontend Engineer",
    "Office": "Newyork",
    "Age": "30",
    "StartDate": "2018/12/10",
    "Salary": "180.721",
    "Currency": "$"
  },
  {
    "id": "6",
    "Name": "Liza Mark",
    "Position": "Python Developer",
    "Office": "London",
    "Age": "45",
    "StartDate": "2014/03/20",
    "Salary": "320.067",
    "Currency": "$"
  },
  {
    "id": "7",
    "Name": "Van Ran",
    "Position": "Product Manager",
    "Office": "California",
    "Age": "26",
    "StartDate": "2018/10/10",
    "Salary": "150.850",
    "Currency": "$"
  },
  {
    "id": "8",
    "Name": "Sam Man",
    "Position": "Lawyer",
    "Office": "Cairo",
    "Age": "23",
    "StartDate": "2020/06/10",
    "Salary": "320.025",
    "Currency": "$"
  },
  {
    "id": "9",
    "Name": "Elisa Malisa",
    "Position": "Flight Attendant",
    "Office": "Abu Dhabi",
    "Age": "25",
    "StartDate": "2019/01/25",
    "Salary": "170.452",
    "Currency": "$"
  },
  {
    "id": "10",
    "Name": "Maria Malova",
    "Position": "Accountant",
    "Office": "San Francisco",
    "Age": "30",
    "StartDate": "2012/07/07",
    "Salary": "290.090",
    "Currency": "$"
  },
  {
    "id": "11",
    "Name": "Max Fars",
    "Position": "Angular Engineer",
    "Office": "Saint Petersburg",
    "Age": "27",
    "StartDate": "2015/08/31",
    "Salary": "200.533",
    "Currency": "$"
  },
  {
    "id": "12",
    "Name": "Nezan Ran",
    "Position": "Director",
    "Office": "Beunos Aires",
    "Age": "50",
    "StartDate": "2010/05/10",
    "Salary": "120.854",
    "Currency": "$"
  },
  {
    "id": "13",
    "Name": "Juan San",
    "Position": "Architecture",
    "Office": "Berlin",
    "Age": "29",
    "StartDate": "2017/04/20",
    "Salary": "240.929",
    "Currency": "$"
  },
  {
    "id": "14",
    "Name": "Waren Bill",
    "Position": "Business Consultant",
    "Office": "Moscow",
    "Age": "35",
    "StartDate": "2016/11/21",
    "Salary": "140.759",
    "Currency": "$"
  }
]`;

const List = () => {
  const postsPerPage = 5;
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const roundingSalary = (salary) => {
    return parseFloat(Math.round(salary * 100) / 100).toFixed(3);
  };

  // Mock-API
  const fetchPostsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // Я здесь использую setTimeout() чтобы показать (Спиннер) при загрузки данных а так setTimeout() здесь не нужен.
    setTimeout(() => {
      try {
        const response = JSON.parse(employees);
        if (!response) {
          throw new Error("Something went wrong!");
        }
        for (let i of response) {
          i.Salary = roundingSalary(i.Salary);
        }
        setPosts(response);
        setSearchedPosts(response);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  const seachValueHandler = (event) => {
    filteredPosts(event.target.value);
  };

  const filteredPosts = (value) => {
    const data = value.trim();
    if (!data) {
      setPosts(searchedPosts);
    } else {
      setCurrentPage(1);
      setPosts(
        searchedPosts.filter((post) =>
          post.Name.toLocaleLowerCase().startsWith(data.toLocaleLowerCase())
        )
      );
    }
  };

  let indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (posts.length < indexOfLastPost) {
    indexOfLastPost = posts.length;
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPageHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const nextPageHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    List.displayName = "List";
    const componentIdentifier = List.displayName;
    dispatch({ type: "setComponentName", name: componentIdentifier });
  }, [dispatch]);

  const sortingHandler = () => {
    setSorting((prevState) => !prevState);
  };

  const tableComponent = (
    <TableComponent
      sortingHandler={{ sorting, sortingHandler }}
      setPosts={setPosts}
      postsArray={posts}
      employees={currentPosts}
      defArr={JSON.parse(employees)}
    />
  );

  return (
    <Card className={classes.list}>
      <div className={classes["list__search"]}>
        <label htmlFor="search">Search:</label>
        <input
          onChange={seachValueHandler}
          placeholder="Search by name"
          type="search"
          id="search"
        />
      </div>
      <ListStatus
        postsArray={posts}
        error={error}
        isLoading={isLoading}
        tableComponent={tableComponent}
      />
      {posts.length !== 0 ? (
        <p>{`Showing ${indexOfFirstPost + 1} to ${indexOfLastPost} of ${
          posts.length
        } entries`}</p>
      ) : (
        <span>No data found!</span>
      )}
      <div className={classes["list__navigation"]}>
        <Button
          disabled={currentPage <= 1}
          onClick={previousPageHandler}
          className={classes["list__btn"]}
        >
          Previous
        </Button>
        <Pagination
          className={classes["list__pagination"]}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
        <Button
          disabled={currentPage >= totalPages}
          onClick={nextPageHandler}
          className={classes["list__btn"]}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default List;
