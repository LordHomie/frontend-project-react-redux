import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "./components/mainPage/Main";
import Login from "./components/loginPage/Login";
import Profile from "./components/profilePage/Profile";
import List from "./components/listPage/List";
import Register from "./components/registerPage/Register";
import ErrorPage from "./components/errorPage/ErrorPage";
import Navbar from "./components/Navbar";

const App = () => {
  const authorization = useSelector((state) => state.isLoggedIn);

  const mainPage = <Link to="/">Main</Link>;
  const loginPage = (
    <Link to={!authorization ? "/login" : "/profile"}>Login</Link>
  );
  const profilePage = (
    <Link to={authorization ? "/profile" : "/login"}>Profile</Link>
  );
  const listPage = <Link to={authorization ? "/list" : "/login"}>List</Link>;

  return (
    <Router>
      <Navbar
        mainPage={mainPage}
        loginPage={loginPage}
        profilePage={profilePage}
        listPage={listPage}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={!authorization ? <Login /> : <Profile />}
        />
        <Route
          path="/profile"
          element={authorization ? <Profile /> : <Login />}
        />
        <Route path="/list" element={authorization ? <List /> : <Login />} />
        <Route
          path="/register"
          element={!authorization ? <Register /> : <Profile />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
