import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";

function TransactionCreateModal({ show, close, handler }) {
  const schema = Joi.object({
    note: Joi.string().required().messages({
      "string.empty": `Catatan tidak boleh kosong`,
      "any.required": `Catatan tidak boleh kosong`,
    }),
    type: Joi.string().default("DB").messages({
      "string.empty": `Tipe tidak boleh kosong`,
      "any.required": `Tipe tidak boleh kosong`,
    }),
    mutation: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Nominal tidak boleh kosong`,
        "any.required": `Nominal tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    // TODO Checking whitespace
    const isValid = validator(data);
    if (!isValid) {
      setValidationAlertShow(true);
      return false;
    }
    setValidationAlertShow(false);
    handler(data);
    handleClose();
  };

  const handleClose = () => {
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
        <Modal.Title>Transaksi Manual</Modal.Title>
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
            <Col xs={12} md={7} className="pb-2">
              <Form.Group>
                <Form.Label>Tipe Transaksi</Form.Label>

                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Form.Group {...field} className="d-flex">
                      <div className="d-flex me-3 me-md-4">
                        <Form.Check
                          type="radio"
                          name="type"
                          id="typeDB"
                          value="DB"
                          className="cst-clickable me-2"
                          defaultChecked
                        />
                        <Form.Label htmlFor="typeDB" className="cst-clickable">
                          {"Uang Keluar (DB) "}
                        </Form.Label>
                      </div>
                      <div className="cst-clickable d-flex me-3 me-md-4">
                        <Form.Check
                          type="radio"
                          name="type"
                          id="typeCR"
                          value="CR"
                          className="cst-clickable me-2"
                        />
                        <Form.Label htmlFor="typeCR" className="cst-clickable">
                          {"Uang Masuk (CR) "}
                        </Form.Label>
                      </div>
                    </Form.Group>
                  )}
                />
                <small className="cst-text-negative ">
                  {errors.unit?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nominal<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register("mutation")}
                  className={`cst-form-control ${
                    errors.mutation && "cst-form-invalid"
                  }`}
                  placeholder="Nominal"
                />
                <small className="cst-text-negative ">
                  {errors.mutation?.message}
                </small>
              </Form.Group>
            </Col>

            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Catatan<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("note")}
                  className={`cst-form-control ${
                    errors.note && "cst-form-invalid"
                  }`}
                  placeholder="Catatan"
                />
                <small className="cst-text-negative ">
                  {errors.note?.message}
                </small>
              </Form.Group>
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
                  Buat Transaksi
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TransactionCreateModal;
