import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Header from "../../components/Header";
import { takeIcon } from "../../helpers/iconMapper";

function IncomingDetail() {
  const navigate = useNavigate();
  return (
    <Container fluid className="p-4">
      <Header className="d-flex align-items-center">
        <span
          className="cst-clickable cst-hover-color-respond me-2"
          onClick={() => navigate(-1)}
        >
          {takeIcon("backspace")}
        </span>
        <span>DETAIL BARANG MASUK</span>
      </Header>
      <Row className="mx-0"></Row>
    </Container>
  );
}

export default IncomingDetail;
