import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import Select from "react-select";

import ValidationAlert from "./Alerts/ValidationAlert";
import PasswordConfirmUnmatched from "./Alerts/PasswordConfirmUnmatched";

import validator from "../../helpers/validator";

function UserCreateModal({ show, close, roleOptions, handler }) {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": `Username tidak boleh kosong`,
      "any.required": `Username tidak boleh kosong`,
    }),
    fullname: Joi.string().required().messages({
      "string.empty": `Nama Lengkap tidak boleh kosong`,
      "any.required": `Nama Lengkap tidak boleh kosong`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `Password tidak boleh kosong`,
      "any.required": `Password tidak boleh kosong`,
    }),
    passwordConfirm: Joi.string().required().messages({
      "string.empty": `Mohon untuk konfirmasi password kamu ya`,
      "any.required": `Mohon untuk konfirmasi password kamu ya`,
    }),
    email: Joi.string().allow(""),
    role_id: Joi.object().default(roleOptions[0]),
    contact: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Nomor telepon tidak boleh kosong`,
        "any.required": `Nomor telepon tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
    address: Joi.string().required().messages({
      "string.empty": `Alamat tidak boleh kosong`,
      "any.required": `Alamat tidak boleh kosong`,
    }),
    active_status: Joi.boolean().default(true),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);
  const [passUnmatched, setPassUnmatched] = useState(false);

  const onSubmit = (data) => {
    data = { ...data, role_id: data.role_id.value };
    const passwordConfirmValid =
      data.password.trim() === data.passwordConfirm.trim();
    if (!passwordConfirmValid) {
      setPassUnmatched(true);
      return false;
    }
    setPassUnmatched(false);
    const isValid = validator(data, ["email", "role_id", "active_status"]);
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
        <Modal.Title>Tambah User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mx-0">
          <Col className="px-3">
            <ValidationAlert
              show={validationAlertShow}
              setShow={setValidationAlertShow}
            />
            <PasswordConfirmUnmatched
              show={passUnmatched}
              setShow={setPassUnmatched}
            />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)} className="m-2">
          <Row className="mx-0">
            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Username<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("username")}
                  className={`cst-form-control ${
                    errors.username && "cst-form-invalid"
                  }`}
                  placeholder="Username"
                />
                <small className="cst-text-negative ">
                  {errors.username?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nama Lengkap<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("fullname")}
                  className={`cst-form-control ${
                    errors.fullname && "cst-form-invalid"
                  }`}
                  placeholder="Nama Lengkap"
                />
                <small className="cst-text-negative ">
                  {errors.fullname?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={6} className="py-2">
              <Form.Group>
                <Form.Label>
                  Password<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  {...register("password")}
                  className={`cst-form-control ${
                    errors.password && "cst-form-invalid"
                  }`}
                  placeholder="Password"
                />
                <small className="cst-text-negative ">
                  {errors.password?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={6} className="py-2">
              <Form.Group>
                <Form.Label>
                  Konfirmasi Password
                  <span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  {...register("passwordConfirm")}
                  className={`cst-form-control ${
                    errors.passwordConfirm && "cst-form-invalid"
                  }`}
                  placeholder="Konfirmasi Password"
                />
                <small className="cst-text-negative ">
                  {errors.passwordConfirm?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={4} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nomor Telepon<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register("contact")}
                  className={`cst-form-control ${
                    errors.contact && "cst-form-invalid"
                  }`}
                  placeholder="Nomor Telepon"
                />
                <small className="cst-text-negative ">
                  {errors.contact?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={4} className="py-2">
              <Form.Group>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
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

            <Col md={12} lg={4} className="py-2">
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={roleOptions}
                      // isDisabled={isFetching}
                      placeholder="Role"
                      defaultValue={roleOptions[0]}
                    />
                  )}
                />
                <small className="cst-text-negative ">
                  {errors.role_id?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={8} className="py-2">
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
                />
                <small className="cst-text-negative ">
                  {errors.address?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={4} className="py-2 d-flex">
              <Controller
                control={control}
                name="active_status"
                render={({ field }) => (
                  <Form.Group
                    {...field}
                    className="d-flex align-items-center my-auto"
                  >
                    <Form.Check type="switch" defaultChecked={true} />
                    <Form.Label className="m-0">Status User</Form.Label>
                  </Form.Group>
                )}
              />
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
                  Buat User
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserCreateModal;
