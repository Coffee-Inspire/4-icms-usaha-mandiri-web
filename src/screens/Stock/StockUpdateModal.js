import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import CurrencyInput from "react-currency-input-field";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";
import modelParser from "../../helpers/modelParser";

function StockUpdateModal({ show, close, handler, subject = {} }) {
  const schema = Joi.object({
    price: Joi.string().required().messages({
      "string.empty": `Harga jual tidak boleh kosong`,
      "any.required": `Harga jual tidak boleh kosong`,
    }),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    data = modelParser(data);
    const isValid = validator(data);
    if (!isValid) {
      setValidationAlertShow(true);
      return false;
    }
    setValidationAlertShow(false);
    const params = {
      id: subject.id,
      ...data,
    };
    handler(params);
    close();
  };

  const handleClose = () => {
    reset();
    close();
  };

  useEffect(() => {
    reset();
  }, [subject]);

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header
        closeVariant="white"
        className="cst-bg-primary cst-text-plain"
        closeButton
      >
        <Modal.Title>Perbaharui Stok</Modal.Title>
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
                  Harga Jual <span className="cst-text-negative">*</span>
                </Form.Label>
                <CurrencyInput
                  className={`d-block w-100 py-2 px-3 rounded-2 cst-form-control ${
                    errors.purchase_price && "cst-form-invalid"
                  }`}
                  placeholder="Harga beli"
                  allowDecimals={false}
                  allowNegativeValue={false}
                  decimalSeparator=","
                  groupSeparator="."
                  {...register("price")}
                  defaultValue={subject && subject.price}
                  prefix={"IDR "}
                />
                <small className="cst-text-negative ">
                  {errors.price?.message}
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

export default StockUpdateModal;
