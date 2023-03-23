import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function SupplierCreateModal({ show, close, handler }) {
  const schema = yup.object({
    name: yup.string().required().min(2),
    personContact: yup
      .string()
      .matches(/^[0-9]+$/, "Invalid value")
      .min(6)
      .max(16)
      .required(),
    companyContact: yup
      .string()
      .matches(/^[0-9]+$/, "Invalid value")
      .min(6)
      .max(16)
      .required(),
    email: yup.string().email(),
    address: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    // TODO Checking whitespace
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
        <Modal.Title>Tambah Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="m-2">
          <Row className="mx-0">
            <Col xs={12} md={12} className="py-2">
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="name"
                  {...register("name")}
                  className={`cst-form-control ${
                    errors.name && "cst-form-invalid"
                  }`}
                  placeholder="Nama"
                />
                <small className="cst-text-negative ">
                  {errors.name?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>Telp Pribadi</Form.Label>
                <Form.Control
                  type="number"
                  {...register("personContact")}
                  className={`cst-form-control ${
                    errors.personContact && "cst-form-invalid"
                  }`}
                  placeholder="Telp Pribadi"
                />
                <small className="cst-text-negative ">
                  {errors.personContact?.message}
                </small>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="py-2">
              <Form.Group>
                <Form.Label>Telp Kantor</Form.Label>
                <Form.Control
                  {...register("companyContact")}
                  className={`cst-form-control ${
                    errors.companyContact && "cst-form-invalid"
                  }`}
                  placeholder="Telp Kantor"
                />
                <small className="cst-text-negative ">
                  {errors.companyContact?.message}
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

export default SupplierCreateModal;
