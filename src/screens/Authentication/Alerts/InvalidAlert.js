import React from "react";
import { Alert } from "react-bootstrap";
// import { takeIcon } from "../../../helpers/iconMapper";

function InvalidAlert({ show, setShow, message }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <small>{message}</small>
    </Alert>
  );
}

export default InvalidAlert;
