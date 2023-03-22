import React from "react";

function index({ children, className }) {
  return (
    <h2
      className={`${className} cst-letter-spacing cst-text-secondary cst-border-bottom fw-bold pb-3`}
    >
      {children}
    </h2>
  );
}

export default index;
