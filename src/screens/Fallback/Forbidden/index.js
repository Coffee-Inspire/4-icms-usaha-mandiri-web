import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Forbidden() {
  return (
    <Container
      fluid
      className="cst-min-h-md d-flex flex-column justify-content-center"
    >
      <Row className="mx-0 d-flex justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={3} className="text-center">
          <div>
            <h1 className="cst-text-negative mb-4">
              <strong>ERROR 403</strong>
            </h1>
            <h2>
              <strong>Akses Dibatasi</strong>
            </h2>
            <p className="px-2">
              Anda tidak memiliki
              <span className="cst-text-primary fw-bold"> izin </span>
              untuk mengakses halaman ini, harap hubungi
              <span className="cst-text-primary fw-bold"> Administrator</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Forbidden;
