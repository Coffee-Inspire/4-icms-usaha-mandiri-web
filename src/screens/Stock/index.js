import React from "react";
import { Container, Button } from "react-bootstrap";
import Shows from "../../components/Shows";

function Stock() {
  return (
    <Container fluid className="p-4">
      <h2 className="cst-letter-spacing cst-text-secondary cst-border-bottom fw-bold pb-3 ">
        STOK BARANG
      </h2>
      {/* <Button
        variant="none"
        className="cst-btn-primary cst-btn-add fw-bold px-4 py-2"
      >
        Tambah Stok
      </Button> */}
      <Shows />
    </Container>
  );
}

export default Stock;
