import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import roleOptions from "../../options/roleOptions.json";
import Select from "react-select";

import ValidationAlert from "./Alerts/ValidationAlert";
import PasswordConfirmUnmatched from "./Alerts/PasswordConfirmUnmatched";

import validator from "../../helpers/validator";

function UserCreateModal({ show, close, handler }) {
  const schema = Joi.object({
    userName: Joi.string().required().messages({
      "string.empty": `Username tidak boleh kosong`,
      "any.required": `Username tidak boleh kosong`,
    }),
    fullName: Joi.string().required().messages({
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
    role: Joi.object().default({ value: "administrator" }),
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
    // type: Joi.string().default("DB").messages({
    //   "string.empty": `Tipe tidak boleh kosong`,
    //   "any.required": `Tipe tidak boleh kosong`,
    // }),
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
    data = { ...data, role: data.role.value };
    const passwordConfirmValid =
      data.password.trim() === data.passwordConfirm.trim();
    if (!passwordConfirmValid) {
      setPassUnmatched(true);
      return false;
    }
    setPassUnmatched(false);
    const isValid = validator(data, ["email", "role"]);
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
            {/* <Col md={12} lg={7} className="pb-2">
              <Form.Group>
                <Form.Label>Tipe Transaksi</Form.Label>

                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Form.Group {...field} className="d-flex">
                      <div className="d-flex me-3 me-lg-4">
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
                      <div className="cst-clickable d-flex me-3 me-lg-4">
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
            </Col> */}
            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Username<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("userName")}
                  className={`cst-form-control ${
                    errors.userName && "cst-form-invalid"
                  }`}
                  placeholder="Username"
                />
                <small className="cst-text-negative ">
                  {errors.userName?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={12} className="py-2">
              <Form.Group>
                <Form.Label>
                  Nama Lengkap<span className="cst-text-negative">*</span>
                </Form.Label>
                <Form.Control
                  {...register("fullName")}
                  className={`cst-form-control ${
                    errors.fullName && "cst-form-invalid"
                  }`}
                  placeholder="Nama Lengkap"
                />
                <small className="cst-text-negative ">
                  {errors.fullName?.message}
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
                  name="role"
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
                  {errors.role?.message}
                </small>
              </Form.Group>
            </Col>

            <Col md={12} lg={12} className="py-2">
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
