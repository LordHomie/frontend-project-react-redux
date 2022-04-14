import { createStore } from "redux";

let storedLoginInfo = localStorage.getItem("isLoggedIn");
if (storedLoginInfo === null) {
  storedLoginInfo = 0;
}

let userEmail = localStorage.getItem("loggedInUser");
if (userEmail === null) {
  userEmail = "";
}

const allStates = {
  isLoggedIn: +storedLoginInfo,
  componentName: "",
  userEmail: userEmail,
};

const appReducer = (state = allStates, action) => {
  if (action.type === "login") {
    localStorage.setItem("isLoggedIn", "1");
    return {
      isLoggedIn: 1,
      userEmail: action.email,
      componentName: state.componentName,
    };
  }
  if (action.type === "logout") {
    localStorage.removeItem("isLoggedIn");
    return {
      isLoggedIn: 0,
      userEmail: "",
      componentName: state.componentName,
    };
  }
  if (action.type === "setComponentName") {
    return {
      componentName: action.name,
      isLoggedIn: state.isLoggedIn,
      userEmail: state.userEmail,
    };
  }
  return state;
};

const store = createStore(appReducer);

export default store;
