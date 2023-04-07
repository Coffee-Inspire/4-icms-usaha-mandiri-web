import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { saveProfile } from "../actions/profileAction";
import authApi from "../apis/auth";
import auditor from "./auditor";

function PrivateRoutes() {
  const dispatch = useDispatch();
  let flag = false;
  const token = auditor();

  if (token) {
    const tokenParam = `Bearer ${token}`;

    authApi
      .verifyToken(tokenParam)
      .then((res) => {
        if (res.status === 200) {
          // * Token is exist and valid
          const payload = res.data; // * Storing user paylaod to internal variable
          flag = true; // * User has been validated, allowed to pass
          // TODO may return Outlet to main layout
          dispatch(saveProfile(payload)); // * Storing user payload to redux store
        } else {
          // * Token is exist but invalid
          throw res;
          // TODO may return Navigate to login
        }
      })
      .catch((err) =>
        console.log("Protected route, validating token error: ", err)
      );
  } else {
    flag = false;
  }

  const isTokenExist = !!localStorage.getItem("access_token"); // ? For Development: accesing token right from local storage, ignoring it's validation status
  return isTokenExist ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
