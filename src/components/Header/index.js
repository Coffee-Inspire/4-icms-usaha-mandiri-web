import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { takeIcon } from "../../helpers/iconMapper";

function Header({ className, headerLabel, useBack, isLoading }) {
  const navigate = useNavigate();
  return (
    <div
      className={`${className} cst-border-bottom cst-text-secondary cst-letter-spacing d-flex align-items-center pb-3`}
    >
      {useBack && (
        <span onClick={() => navigate(-1)} className="cst-clickable">
          {takeIcon("chevronLeft")}
        </span>
      )}
      <h2 className="text-uppercase fw-bold m-0 mx-2">{headerLabel}</h2>
      {isLoading && <Spinner className="mx-3" />}
    </div>
  );
}

export default Header;
