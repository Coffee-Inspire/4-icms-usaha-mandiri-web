import React from "react";
import { Row, Col } from "react-bootstrap";
import Illustration from "../../assets/404.jpg";

function PageNotFound() {
  return (
    <Row className="mx-0 cst-pageNotFound-row-h">
      <Col
        md={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="cst-pageNotFound-img-frame">
          <img alt="" src={Illustration} className="cst-pageNotFound-img" />
        </div>
      </Col>
      <Col md={12} lg={6} className="d-flex px-md-0">
        <div className="text-center p-4 mx-auto ms-md-5 my-auto">
          <h1 className="cst-text-primary">
            <strong>404</strong>
          </h1>
          <h2>
            <strong>Halaman Tidak Ditemukan</strong>
          </h2>
          <p>Kami tidak dapat menemukan halaman yang anda cari</p>
          <p className="cst-text-secondary">
            Apakah anda yakin sudah mengakses URL yang benar?
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default PageNotFound;
