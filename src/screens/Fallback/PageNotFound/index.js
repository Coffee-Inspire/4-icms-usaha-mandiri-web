import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Illustration from "../../../assets/404.svg";

function PageNotFound() {
  return (
    <Container
      fluid
      className="cst-min-h-md d-flex flex-column justify-content-center"
    >
      <Row className="mx-0 d-flex justify-content-center">
        <Col xs={8} sm={5} md={5} lg={5} xl={3}>
          <img
            style={{ width: "95%", height: "95%" }}
            alt=""
            src={Illustration}
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={6} className="d-flex">
          <div className="pt-3 px-4 m-auto my-lg-auto mx-xl-0 text-center text-xl-start">
            <h1 className="cst-text-primary">
              <strong>Opss...</strong>
            </h1>
            <h2>
              <strong>Halaman Tidak Ditemukan</strong>
            </h2>
            <p>
              Halaman yang anda cari
              <span className="cst-text-primary fw-bold"> belum tersedia </span>
              atau
              <span className="cst-text-primary fw-bold">
                {" "}
                telah dipindahkan{" "}
              </span>
            </p>
            <p className="cst-text-secondary my-0 my-xl-5">
              Apakah anda yakin sudah mengakses
              <span className="cst-text-primary fw-bold"> URL </span>
              yang benar?
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
