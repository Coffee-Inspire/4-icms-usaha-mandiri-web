import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Row, Col, Button } from "react-bootstrap";

import { takeIcon } from "../../helpers/iconMapper";

function ChainModal({ show, close, handlePrint, subject }) {
  const navigate = useNavigate();
  return (
    <Modal centered show={show} onHide={close}>
      <Modal.Body>
        <div className="my-2 text-center">
          <span className="cst-text-positive">{takeIcon("bigSuccess")}</span>
        </div>
        <div className="text-center">
          <strong>Pemesanan berhasil disimpan</strong>
          <p className="cst-text-secondary my-2">
            {/* Apakah anda ingin mencetak nota atau melihat perincian transaksi? */}
            Data pemesanan telah berhasil disimpan
          </p>
        </div>
        <Row className="mx-0 mt-3 mb-2 d-flex justify-content-center">
          <Col xs={12} md={4} className="my-1">
            <Button
              variant="none"
              className="cst-btn-success-light w-100  d-flex justify-content-center align-items-center p-1"
              onClick={() => handlePrint()}
            >
              <span> {takeIcon("whatsapp")}</span>
              <small className="mx-2">Alihkan ke WhatsApp</small>
            </Button>
          </Col>
          <Col xs={12} md={4} className="my-1">
            <Button
              variant="none"
              className="cst-btn-warning w-100 d-flex justify-content-center align-items-center p-1"
              // onClick={() => navigate(`/detail/${subject.id}`)}
              onClick={() => navigate(`../incoming/detail/${subject.id}`)}
            >
              <span> {takeIcon("search")}</span>
              <small className="mx-2">Lihat Detail</small>
            </Button>
          </Col>
          <Col xs={12} md={4} className="my-1">
            <Button
              variant="none"
              className="cst-btn-neutral text-white w-100 d-flex justify-content-center align-items-center p-1"
              onClick={close}
            >
              <span> {takeIcon("x")}</span>
              <small className="mx-2">Tetap Disini</small>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ChainModal;