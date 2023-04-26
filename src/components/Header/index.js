import React from "react";
import { Spinner } from "react-bootstrap";

function Header({ className, headerLabel, isLoading }) {
  return (
    <div
      className={`${className} cst-border-bottom cst-text-secondary cst-letter-spacing d-flex align-items-center pb-3`}
    >
      <h2 className="text-uppercase fw-bold m-0">{headerLabel}</h2>
      {isLoading && <Spinner className="mx-3" />}
    </div>
  );
}

export default Header;
