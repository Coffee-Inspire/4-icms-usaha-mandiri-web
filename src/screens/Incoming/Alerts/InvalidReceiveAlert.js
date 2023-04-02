import React from "react";
import { Alert } from "react-bootstrap";
import { takeIcon } from "../../../helpers/iconMapper";

function InvalidReceiveAlert({ show, setShow }) {
  return (
    <Alert
      show={show}
      transition
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Oops, kamu gagal menyimpan barang</Alert.Heading>
      <p>
        Pastikan jumlah yang diinput tidak kosong, hanya berupa angka, dan tidak
        melebihi batas maksimum pada jumlah pemesanan kamu ya{" "}
        {takeIcon("smile")}
      </p>
    </Alert>
  );
}

export default InvalidReceiveAlert;
