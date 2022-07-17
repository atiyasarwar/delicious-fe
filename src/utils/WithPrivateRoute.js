import React from "react";
import {Navigate} from "react-router-dom";
import AuthService from "./auth.service";

const WithPrivateRoute = ({children}) => {
  const isTokenExist = AuthService.isTokenExist();

  if (isTokenExist) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default WithPrivateRoute;
