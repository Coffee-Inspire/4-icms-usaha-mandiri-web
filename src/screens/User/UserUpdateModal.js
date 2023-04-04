import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import ValidationAlert from "./Alerts/ValidationAlert";
import PasswordConfirmUnmatched from "./Alerts/PasswordConfirmUnmatched";

function UserUpdateModal({ show, close, subjectData = {} }) {
  const schema = Joi.object({
    activeStatus: Joi.boolean(),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const [validationAlertShow, setValidationAlertShow] = useState(false);
  const [passUnmatched, setPassUnmatched] = useState(false);

  const onSubmit = (data) => {
    const params = {
      id: subjectData.id,
      activeStatus: data.activeStatus,
    };
    console.log("Updating =>", params);
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
        <Modal.Title>Perbaharui User</Modal.Title>
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
                <Form.Label>Status User</Form.Label>

                <Controller
                  shouldUnregister
                  control={control}
                  name="activeStatus"
                  defaultValue={subjectData && subjectData.activeStatus}
                  render={({ field }) => (
                    <Form.Group {...field} className="d-flex">
                      <div className="d-flex me-3 me-md-4">
                        <Form.Check
                          type="radio"
                          name="activeStatus"
                          id="statusActive"
                          value={true}
                          className="cst-clickable me-2"
                          defaultChecked={subjectData.activeStatus}
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
                          name="activeStatus"
                          id="statusInactive"
                          value={false}
                          className="cst-clickable me-2"
                          defaultChecked={!subjectData.activeStatus}
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
