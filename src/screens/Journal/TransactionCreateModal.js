import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CurrencyInput from "react-currency-input-field";
import moment from "moment";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";
import modelParser from "../../helpers/modelParser";

function TransactionCreateModal({ show, close, handler }) {
  const schema = Joi.object({
    note: Joi.string().required().messages({
      "string.empty": `Catatan tidak boleh kosong`,
      "any.required": `Catatan tidak boleh kosong`,
    }),
    mutation: Joi.string().required().messages({
      "string.empty": `Nominal tidak boleh kosong`,
      "any.required": `Nominal tidak boleh kosong`,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [type, setType] = useState("DB");
  const [directPaid, setDirectPaid] = useState(false);
  const [dlDate, setDlDate] = useState("");

  const [isDateInvalid, setIsDateInvalid] = useState(false);
  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    // TODO Checking whitespace
    data = modelParser(data);
    const isValid = validator(data);
    if (!isValid) {
      setValidationAlertShow(true);
      return false;
    }

    if (type === "DB" && !directPaid && !dlDate) {
      setIsDateInvalid(true);
      return;
    }

    setValidationAlertShow(false);
    setIsDateInvalid(false);

    const param = {
      ...data,
      type,
      deadline_date: type === "DB" && !directPaid ? dlDate : null,
      paid_date:
        type === "DB"
          ? !directPaid
            ? null
            : moment().format("YYYY-MM-DD")
          : null,
      paid_status: type === "CR" ? true : directPaid ? true : false,
    };

    handler(param);
    handleClose();
  };

  const handleClose = () => {
    setValidationAlertShow(false);
    setType("DB");
    setDirectPaid(false);
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

                <Form.Group className="d-flex">
                  <div className="d-flex me-3 me-md-4">
                    <Form.Check
                      type="radio"
                      name="type"
                      id="typeDB"
                      value="DB"
                      className="cst-clickable me-2"
                      onChange={(e) => setType(e.target.value)}
                      defaultChecked
                    />
                    <Form.Label htmlFor="typeDB" className="cst-clickable">
                      {"Dana Keluar (Debit) "}
                    </Form.Label>
                  </div>
                  <div className="cst-clickable d-flex me-3 me-md-4">
                    <Form.Check
                      type="radio"
                      name="type"
                      id="typeCR"
                      value="CR"
                      onChange={(e) => setType(e.target.value)}
                      className="cst-clickable me-2"
                    />
                    <Form.Label htmlFor="typeCR" className="cst-clickable">
                      {"Dana Masuk (Kredit) "}
                    </Form.Label>
                  </div>
                </Form.Group>
              </Form.Group>
            </Col>
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nominal<span className="cst-text-negative">*</span>
                </Form.Label>
                <CurrencyInput
                  className={`d-block w-100 py-2 px-3 rounded-2 cst-form-control ${
                    errors.purchase_price && "cst-form-invalid"
                  }`}
                  placeholder="Nominal"
                  allowDecimals={false}
                  allowNegativeValue={false}
                  decimalSeparator=","
                  groupSeparator="."
                  {...register("mutation")}
                  prefix={"IDR "}
                />
                <small className="cst-text-negative ">
                  {errors.mutation?.message}
                </small>
              </Form.Group>
            </Col>

            {type === "DB" && (
              <Row className="mx-0">
                <Col xs={12} md={4} className="py-2">
                  <Form.Group>
                    <Form.Label>Pembayaran Langsung</Form.Label>
                    <Form.Check
                      type="switch"
                      value={directPaid}
                      className="cst-clickable me-2"
                      onChange={(e) => setDirectPaid(e.target.checked)}
                      defaultChecked={directPaid}
                    />
                    <small className="cst-text-negative ">
                      {errors.unit?.message}
                    </small>
                  </Form.Group>
                </Col>
                {!directPaid && (
                  <Col xs={12} md={5} className="py-2">
                    <Form.Group>
                      <Form.Label>
                        Tanggal Jatuh Tempo
                        <span className="cst-text-negative">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className={isDateInvalid && "cst-form-invalid"}
                        onChange={(e) => setDlDate(e.target.value)}
                        value={dlDate}
                      />
                      {isDateInvalid && (
                        <small className="cst-text-negative ">
                          Wajib mengisi tanggal jatuh tempo untuk pembayaran
                          tidak langsung
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                )}
              </Row>
            )}

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
