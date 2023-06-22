import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { saveProfile } from "../actions/profileAction";
import authApi from "../apis/auth";
import auditor from "./auditor";
import Redirect from "../screens/Authentication/Redirect";

function PrivateRoutes({ setReqPath }) {
  const dispatch = useDispatch();
  const [validationState, setValidationState] = useState(null);
  const token = auditor();

  const catchedReqPath = useLocation();

  useEffect(() => {
    setReqPath(catchedReqPath.pathname);
    if (token) {
      const params = { token };
      authApi
        .verify(params)
        .then((res) => {
          if (res.status === 200) {
            // * Token is exist and valid
            const payload = res.data.data.payload; // * Storing user paylaod to internal variable
            dispatch(saveProfile(payload)); // * Storing user payload to redux store
            setValidationState(true);
          } else {
            setValidationState(false); // * Token is exist but invalid
            throw res;
          }
        })
        .catch((err) => console.warn("User unauthorized: ", err));
    } else {
      setValidationState(false); // * Token is empty
    }
  }, []);

  return validationState === null ? (
    <Redirect />
  ) : validationState === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
