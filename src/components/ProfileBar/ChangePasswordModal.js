import React, { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import PasswordConfirmUnmatched from "./Alerts/PasswordConfirmUnmatched";

function ChangePasswordModal({ show, close, handler }) {
  const schema = Joi.object({
    password_current: Joi.string().required().messages({
      "string.empty": `Kata sandi lama tidak boleh kosong`,
      "any.required": `Kata sandi lama tidak boleh kosong`,
    }),
    password_new: Joi.string().required().messages({
      "string.empty": `Kata sandi baru tidak boleh kosong`,
      "any.required": `Kata sandi baru tidak boleh kosong`,
    }),
    password_new_confirm: Joi.string().required().messages({
      "string.empty": `Mohon ulangi kata sandi dengan benar ya`,
      "any.required": `Mohon ulangi kata sandi dengan benar ya`,
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [passUnmatched, setPassUnmatched] = useState(false);

  const onSubmit = (data) => {
    const isPassConfirmValid =
      data.password_new.trim() === data.password_new_confirm.trim();
    if (!isPassConfirmValid) {
      setPassUnmatched(true);
      return false;
    }
    setPassUnmatched(false);
    handler(data);
    close();
    reset();
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
        <Modal.Title>Perbaharui Kata Sandi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="px-3">
            <PasswordConfirmUnmatched
              show={passUnmatched}
              setShow={setPassUnmatched}
            />
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <Form.Group className="my-3">
            <Form.Label>
              Kata Sandi Lama<span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_current")}
              className={`cst-form-control ${
                errors.password_current && "cst-form-invalid"
              }`}
              placeholder="Kata sandi lama"
            />
            <small className="cst-text-negative ">
              {errors.password_current?.message}
            </small>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>
              Kata Sandi Baru<span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_new")}
              className={`cst-form-control ${
                errors.password_new && "cst-form-invalid"
              }`}
              placeholder="Kata sandi baru"
            />
            <small className="cst-text-negative ">
              {errors.password_new?.message}
            </small>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>
              Ulangi Kata Sandi Baru
              <span className="cst-text-negative">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              {...register("password_new_confirm")}
              className={`cst-form-control ${
                errors.password_new_confirm && "cst-form-invalid"
              }`}
              placeholder="Ulangi kata sandi baru"
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
