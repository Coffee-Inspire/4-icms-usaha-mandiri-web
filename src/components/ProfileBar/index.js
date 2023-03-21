import React from "react";
import { Container, Button } from "react-bootstrap";
import { take } from "../../helpers/iconMapper";

function ProfileBar({ expanded, setExpanded }) {
  return (
    <Container
      fluid
      className="d-flex justify-content-between align-items-center p-2"
    >
      <Button
        variant="none"
        className={`cst-float-on  ${
          expanded && "cst-float-off"
        }  cst-btn-primary cst-btn-eclipse d-flex justify-content-center align-items-center`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? take("chevron-right") : take("chevron-left")}
      </Button>
      <div className="d-flex align-items-center me-md-3">
        Hi, <strong className="ms-1 me-2">{"Admin"}</strong>
        <span className="cst-avatar-bg cst-avatar d-flex justify-content-center align-items-center rounded-circle">
          {take("avatar")}
        </span>
      </div>
    </Container>
  );
}

export default ProfileBar;
