import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";

function CustomerCreateModal({ show, close, handler }) {
  const schema = Joi.object({
    guest_name: Joi.string().required().messages({
      "string.empty": `Nama pelanggan tidak boleh kosong`,
      "any.required": `Nama pelanggan tidak boleh kosong`,
    }),
    contact: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Nomor telepon tidak boleh kosong`,
        "any.required": `Nomor telepon tidak boleh kosong`,
        "string.pattern.base": `Nomor telepon tidak valid`,
      }),
    email: Joi.string().allow(""),
    address: Joi.string().allow(""),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    // TODO Checking whitespace
    const isValid = validator(data, ["address", "email"]);
    if (!isValid) {
      setValidationAlertShow(true);
      return false;
    }
    setValidationAlertShow(false);
    handler(data);
    handleClose();
  };

  const handleClose = () => {
    setValidationAlertShow(false);
    reset();
    close();
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header
        closeVariant="white"
        className="cst-bg-primary cst-text-plain"
        closeButton
      >
        <Modal.Title>Tambah Pelanggan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mx-0">
          <Col className="px-3">
            <ValidationAlert
              show={validationAlertShow}
              setShow={setValidationAlertShow}
            />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)} className="m-2">
          <Row className="mx-0">
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nama<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="name"
                  {...register("guest_name")}
                  className={`cst-form-control ${
                    errors.guest_name && "cst-form-invalid"
                  }`}
                  placeholder="Nama"
                />
                <small className="cst-text-negative ">
                  {errors.guest_name?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nomor Handphone / Telp
                  <span className="cst-text-negative">*</span>
                </Form.Label>

                <Form.Control
                  type="number"
                  {...register("contact")}
                  className={`cst-form-control ${
                    errors.contact && "cst-form-invalid"
                  }`}
                  placeholder="Nomor Handphone / Telp"
                />
                <small className="cst-text-negative ">
                  {errors.contact?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>E-Mail</Form.Label>

                <Form.Control
                  {...register("email")}
                  className={`cst-form-control ${
                    errors.email && "cst-form-invalid"
                  }`}
                  placeholder="E-Mail"
                />
                <small className="cst-text-negative ">
                  {errors.email?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("address")}
                  className={`cst-form-control ${
                    errors.address && "cst-form-invalid"
                  }`}
                  placeholder="Alamat"
                />
                <small className="cst-text-negative ">
                  {errors.address?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={12} className="my-2 text-end">
              <small>
                <span className="cst-text-negative">*</span> Wajib diisi
              </small>
            </Col>
            <Col
              xs={12}
              className="mx-0 mt-5 d-flex justify-content-between justify-content-md-end"
            >
              <Col xs={5} md={3} className="mx-md-3">
                <Button
                  onClick={() => handleClose()}
                  variant="none"
                  className="cst-btn-danger w-100"
                >
                  Batal
                </Button>
              </Col>
              <Col xs={5} md={3} className="">
                <Button
                  type="submit"
                  variant="none"
                  className="cst-btn-secondary w-100"
                >
                  Tambah
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CustomerCreateModal;
