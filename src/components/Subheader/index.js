import React from "react";

function Subheader({ children, className }) {
  return (
    <h4 className={`${className}  cst-text-primary fw-bold pb-3`}>
      {children}
    </h4>
  );
}

export default Subheader;
