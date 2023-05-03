import React from "react";
import { Alert } from "react-bootstrap";
import { takeIcon } from "../../../helpers/iconMapper";

function IsExistAlert({ show, setShow, rejected }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oops, kamu gagal menambahkan barang</Alert.Heading>
      <p>
        {rejected} sudah ada di dalam{" "}
        <strong className="cst-text-primary">Daftar Pemesanan</strong>, mohon
        untuk memilih barang yang lain ya {takeIcon("smile")}
      </p>
    </Alert>
  );
}

export default IsExistAlert;
