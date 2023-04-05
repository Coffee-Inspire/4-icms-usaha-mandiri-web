import React from "react";
import { Alert } from "react-bootstrap";
import { takeIcon } from "../../../helpers/iconMapper";

function ValidationAlert({ show, setShow }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oops, kamu gagal menyimpan kategori</Alert.Heading>
      <p>
        Pastikan data yang diisi sudah benar dan tidak boleh kosong ya{" "}
        {takeIcon("smile")}
      </p>
    </Alert>
  );
}

export default ValidationAlert;
