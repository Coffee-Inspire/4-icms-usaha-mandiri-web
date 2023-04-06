import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  // const token = localStorage.getItem("token");
  const isTokenExist = !!localStorage.getItem("access_token");

  // TODO: Should check for isTokenValid with BE validator and return boolean result
  // const isTokenValid = auth.validateToken()

  // return isTokenValid ? <Outlet /> : <Navigate to="/login" />;
  return isTokenExist ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
