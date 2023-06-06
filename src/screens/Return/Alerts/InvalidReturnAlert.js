import React from "react";
import { Alert } from "react-bootstrap";
import { takeIcon } from "../../../helpers/iconMapper";

function InvalidReturnAlert({ show, setShow }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oops, kamu gagal retur barang</Alert.Heading>
      <p>
        Pastikan jumlah yang diinput tidak kosong, hanya berupa angka, dan tidak
        melebihi batas jumlah yang bisa di retur ya {takeIcon("smile")}
      </p>
    </Alert>
  );
}

export default InvalidReturnAlert;
