import React from "react";
import { Alert } from "react-bootstrap";
import { takeIcon } from "../../../helpers/iconMapper";

function passwordConfirmUnmatched({ show, setShow }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oops, password gagal disimpan</Alert.Heading>
      <p>Password tidak sama dengan yang dikonfirmasi {takeIcon("smile")}</p>
    </Alert>
  );
}

export default passwordConfirmUnmatched;
