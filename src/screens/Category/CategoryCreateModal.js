import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

import validator from "../../helpers/validator";

function CategoryCreateModa({ show, close, handler }) {
  const schema = Joi.object({
    category_name: Joi.string().required().messages({
      "string.empty": `Nama kategori tidak boleh kosong`,
      "any.required": `Nama kategori tidak boleh kosong`,
    }),
    note: Joi.string().allow(""),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    const isValid = validator(data, ["note"]);
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
        <Modal.Title>Tambah Kategori</Modal.Title>
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
            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nama Kategori<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("category_name")}
                  className={`cst-form-control ${
                    errors.category_name && "cst-form-invalid"
                  }`}
                  placeholder=" Nama Kategori"
                />
                <small className="cst-text-negative ">
                  {errors.category_name?.message}
                </small>
              </Form.Group>
            </Col>
            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("note")}
                  className={`cst-form-control ${
                    errors.note && "cst-form-invalid"
                  }`}
                  placeholder="Deskripsi"
                />
                <small className="cst-text-negative ">
                  {errors.note?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={12} className="my-2 text-end">
              <small>
                <span className="cst-text-negative">*</span> Wajib diisi
              </small>
            </Col>
            <Col
              md={12}
              className="mx-0 mt-5 d-flex justify-content-between justify-content-lg-end"
            >
              <Col md={5} lg={3} className="mx-lg-3">
                <Button
                  onClick={() => handleClose()}
                  variant="none"
                  className="cst-btn-danger w-100"
                >
                  Batal
                </Button>
              </Col>
              <Col md={5} lg={3} className="">
                <Button
                  type="submit"
                  variant="none"
                  className="cst-btn-secondary w-100"
                >
                  Buat Kategori
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CategoryCreateModa;
