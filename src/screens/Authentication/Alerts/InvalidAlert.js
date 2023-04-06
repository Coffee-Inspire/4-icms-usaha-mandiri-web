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
      <Alert.Heading>Login gagal</Alert.Heading>
      <small>{message}</small>
    </Alert>
  );
}

export default InvalidAlert;
