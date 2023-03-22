import React from "react";
import { Button } from "react-bootstrap";
import { takeIcon } from "../../helpers/iconMapper";

function ButtonAddRow({ children, className, handler }) {
  return (
    <Button
      variant="none"
      className={`${className} cst-btn-primary cst-btn-add fw-bold d-flex justify-content-center align-items-center px-4 py-2 my-3`}
      onClick={handler}
    >
      {takeIcon("add")}
      <span className="ms-1">{children}</span>
    </Button>
  );
}

export default ButtonAddRow;
