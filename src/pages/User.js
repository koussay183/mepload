import React from "react";
import Home from "./Home";
import UserLogin from "./UserLogin";

function User({ isLoggedIn }) {
  return isLoggedIn ? <Home /> : <UserLogin />;
}

export default User;
