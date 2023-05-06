import React, { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
// import ValidationAlert from "./Alerts/ValidationAlert";
import PasswordConfirmUnmatched from "./Alerts/PasswordConfirmUnmatched";
import validator from "../../helpers/validator";

function ChangePasswordModal({ show, close, handler }) {
  const schema = Joi.object({
    password_current: Joi.string().required().messages({
      "string.empty": `Password lama tidak boleh kosong`,
      "any.required": `Password lama tidak boleh kosong`,
    }),
    password_new: Joi.string().required().messages({
      "string.empty": `Password baru tidak boleh kosong`,
      "any.required": `Password baru tidak boleh kosong`,
    }),
    password_new_confirm: Joi.string().required().messages({
      "string.empty": `Mohon masukkan password baru sekali lagi dengan benar ya`,
      "any.required": `Mohon masukkan password baru sekali lagi dengan benar ya`,
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  // const [validationAlertShow, setValidationAlertShow] = useState(false);
  const [passUnmatched, setPassUnmatched] = useState(false);

  const onSubmit = (data) => {
    const isPassConfirmValid =
      data.password_new.trim() === data.password_new_confirm.trim();
    if (!isPassConfirmValid) {
      setPassUnmatched(true);
      return false;
    }
    setPassUnmatched(false);
    // const isValid = validator(data);
    // if (!isValid) {
    //   setValidationAlertShow(true);
    //   return false;
    // }
    // setValidationAlertShow(false);
    console.log("UPDATE PARAM => ", data);
    handler();
  };

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header
        closeVariant="white"
        className="cst-bg-primary cst-text-plain"
        closeButton
      >
        <Modal.Title>Perbaharui Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="px-3">
            {/* <ValidationAlert
              show={validationAlertShow}
              setShow={setValidationAlertShow}
            /> */}
            <PasswordConfirmUnmatched
              show={passUnmatched}
              setShow={setPassUnmatched}
            />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <Form.Group className="my-3">
            <Form.Label>
              Password Lama<span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_current")}
              className={`cst-form-control ${
                errors.password_current && "cst-form-invalid"
              }`}
              placeholder="Password lama"
            />
            <small className="cst-text-negative ">
              {errors.password_current?.message}
            </small>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>
              Password Baru<span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_new")}
              className={`cst-form-control ${
                errors.password_new && "cst-form-invalid"
              }`}
              placeholder="Password baru"
            />
            <small className="cst-text-negative ">
              {errors.password_new?.message}
            </small>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>
              Konfirmasi Password Baru
              <span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_new_confirm")}
              className={`cst-form-control ${
                errors.password_new_confirm && "cst-form-invalid"
              }`}
              placeholder="Konfirmasi password baru"
            />
            <small className="cst-text-negative ">
              {errors.password_new_confirm?.message}
            </small>
          </Form.Group>
          <Row className="mt-5 mb-2 d-flex justify-content-end">
            <Col xs={6} lg={3}>
              <Button
                onClick={() => handleClose()}
                variant="none"
                className="cst-btn-danger w-100"
              >
                Batal
              </Button>
            </Col>
            <Col xs={6} lg={3}>
              <Button
                type="submit"
                variant="none"
                className="cst-btn-secondary w-100"
              >
                Simpan
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePasswordModal;
