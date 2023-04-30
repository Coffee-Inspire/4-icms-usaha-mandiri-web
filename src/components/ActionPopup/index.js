import React from "react";
import { Toast } from "react-bootstrap";

function ActionPopup({ show, setShow, actionRes }) {
  const colorType = (key) => {
    if (key >= 200 && key <= 299) {
      return "cst-bg-positive";
    } else if (key >= 300 && key <= 399) {
      return "cst-bg-warning";
    } else return "cst-bg-negative";
  };

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      className={`${colorType(
        actionRes.status
      )} position-fixed cst-fixed-right cst-clean-shadow`}
    >
      <Toast.Header>
        <div className="me-auto" />
      </Toast.Header>
      <Toast.Body className="cst-text-plain">{actionRes.message}</Toast.Body>
    </Toast>
  );
}

export default ActionPopup;
