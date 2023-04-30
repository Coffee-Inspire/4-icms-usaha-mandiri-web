import React from "react";
import { Container, Spinner } from "react-bootstrap";

function Redirect() {
  return (
    <Container className="d-flex vh-100">
      <div className="test-center m-auto">
        <h4 className="fw-bold cst-letter-spacing-sm text-center m-0">
          Halaman Sedang <span className="cst-text-primary">Dialihkan</span>
        </h4>
        <div className="text-center mt-2 mb-4">
          <strong className="cst-letter-spacing-sm cst-text-neutral">
            Mohon menunggu
          </strong>
        </div>
        <div className="text-center">
          <Spinner animation="grow" className="cst-text-secondary" />
        </div>
      </div>
    </Container>
  );
}

export default Redirect;
