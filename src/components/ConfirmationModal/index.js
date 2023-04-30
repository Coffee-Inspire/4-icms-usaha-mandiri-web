import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { takeIcon } from "../../helpers/iconMapper";

function ConfirmationModal({ show, close, handler, subjectData }) {
  const onSubmit = () => {
    const dataId = subjectData.id;
    handler(dataId);
    close();
  };
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Body>
        <div className="text-center">
          <span className="cst-text-negative">{takeIcon("bigAlert")}</span>
        </div>
        <div className="text-center my-4">
          <p className="m-0">
            <strong>Apakah anda yakin ingin menghapus data ini?</strong>
          </p>
          <small className="cst-text-neutral">
            Data akan hilang secara permanen
          </small>
        </div>
        <Row className="justify-content-center my-2">
          <Col xs={12} md={4}>
            <Button
              variant="none"
              className="cst-btn-secondary w-100 mb-2 mb-md-0"
              onClick={() => close()}
            >
              Batalkan
            </Button>
          </Col>
          <Col xs={12} md={4}>
            <Button
              variant="none"
              className="cst-btn-danger w-100 mb-2 mb-md-0"
              onClick={() => onSubmit()}
            >
              Hapus
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmationModal;
