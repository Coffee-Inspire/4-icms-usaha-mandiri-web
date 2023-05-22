import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";

function UserUpdateModal({ show, close, subjectData = {}, handler }) {
  const schema = Joi.object({
    status: Joi.boolean(),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);

  const onSubmit = (data) => {
    const updateParams = {
      ...subjectData,
      status: data.status,
    };
    handler(updateParams);
    close();
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
        <Modal.Title>Perbaharui Pengguna</Modal.Title>
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
                {/* <Controller
                  shouldUnregister
                  control={control}
                  name="status"
                  defaultValue={subjectData && subjectData.status}
                  render={({ field }) => (
                    <Form.Group {...field} className="d-flex">
                      <div className="d-flex me-3 me-md-4">
                        <Form.Check
                          type="radio"
                          name="status"
                          id="statusActive"
                          value={true}
                          className="cst-clickable me-2"
                          defaultChecked={subjectData.status}
                        />
                        <Form.Label
                          htmlFor="statusActive"
                          className="cst-click  able"
                        >
                          {"Aktif"}
                        </Form.Label>
                      </div>
                      <div className="cst-clickable d-flex me-3 me-md-4">
                        <Form.Check
                          type="radio"
                          name="status"
                          id="statusInactive"
                          value={false}
                          className="cst-clickable me-2"
                          defaultChecked={!subjectData.status}
                        />
                        <Form.Label
                          htmlFor="statusInactive"
                          className="cst-clickable"
                        >
                          {"Tidak Aktif"}
                        </Form.Label>
                      </div>
                    </Form.Group>
                  )}
                /> */}
                <Controller
                  shouldUnregister
                  control={control}
                  name="status"
                  defaultValue={subjectData && subjectData.status}
                  render={({ field }) => (
                    <Form.Group
                      {...field}
                      className="d-flex align-items-center"
                    >
                      <Form.Check
                        type="switch"
                        name="status"
                        defaultChecked={subjectData.status}
                      />
                      <Form.Label className="m-0">Status User</Form.Label>
                    </Form.Group>
                  )}
                />

                <small className="cst-text-negative ">
                  {errors.unit?.message}
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
                  Simpan
                </Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserUpdateModal;
