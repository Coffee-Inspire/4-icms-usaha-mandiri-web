import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";

function SupplierUpdateModal({ show, close, handler, subjectData = {} }) {
  const schema = Joi.object({
    supplier_name: Joi.string().required().messages({
      "string.empty": `Nama supplier tidak boleh kosong`,
      "any.required": `Nama supplier tidak boleh kosong`,
    }),
    person_contact: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Telp pribadi tidak boleh kosong`,
        "any.required": `Telp pribadi tidak boleh kosong`,
        "string.pattern.base": `Telp pribadi tidak valid`,
      }),
    company_contact: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Telp kantor tidak boleh kosong`,
        "any.required": `Telp kantor tidak boleh kosong`,
        "string.pattern.base": `Telp kantor tidak valid`,
      }),

    email: Joi.string().allow(""),
    address: Joi.string().required().messages({
      "string.empty": `Alamat tidak boleh kosong`,
      "any.required": `Alamat tidak boleh kosong`,
    }),
    status: Joi.boolean().default(true),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    const isValid = validator(data, ["email"]);
    if (!isValid) {
      setValidationAlertShow(true);
      return false;
    }
    setValidationAlertShow(false);
    const params = {
      id: subjectData.id,
      ...data,
    };
    handler(params);
    close();
  };

  const handleClose = () => {
    setValidationAlertShow(false);
    reset();
    close();
  };

  useEffect(() => {
    reset();
  }, [subjectData]);

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header
        closeVariant="white"
        className="cst-bg-primary cst-text-plain"
        closeButton
      >
        <Modal.Title>Perbaharui Supplier</Modal.Title>
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
                  Nama supplier<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="name"
                  {...register("supplier_name")}
                  className={`cst-form-control ${
                    errors.supplier_name && "cst-form-invalid"
                  }`}
                  placeholder="Nama supplier"
                  defaultValue={subjectData && subjectData.supplier_name}
                />
                <small className="cst-text-negative ">
                  {errors.supplier_name?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>
                  Telp Pribadi<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register("person_contact")}
                  className={`cst-form-control ${
                    errors.person_contact && "cst-form-invalid"
                  }`}
                  placeholder="Telp Pribadi"
                  defaultValue={subjectData && subjectData.person_contact}
                />
                <small className="cst-text-negative ">
                  {errors.person_contact?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>
                  Telp Kantor<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("company_contact")}
                  className={`cst-form-control ${
                    errors.company_contact && "cst-form-invalid"
                  }`}
                  placeholder="Telp Kantor"
                  defaultValue={subjectData && subjectData.company_contact}
                />
                <small className="cst-text-negative ">
                  {errors.company_contact?.message}
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
                  defaultValue={subjectData && subjectData.email}
                />
                <small className="cst-text-negative ">
                  {errors.email?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2 d-flex">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Form.Group
                    {...field}
                    className="d-flex align-items-center my-auto"
                  >
                    <Form.Check
                      type="switch"
                      defaultChecked={subjectData && subjectData.status}
                    />
                    <Form.Label className="m-0">Status Supplier</Form.Label>
                  </Form.Group>
                )}
              />
            </Col>
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Alamat<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("address")}
                  className={`cst-form-control ${
                    errors.address && "cst-form-invalid"
                  }`}
                  placeholder="Alamat"
                  defaultValue={subjectData && subjectData.address}
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

export default SupplierUpdateModal;
