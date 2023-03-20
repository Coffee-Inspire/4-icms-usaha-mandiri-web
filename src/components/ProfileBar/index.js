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
        // className="cst-aaa  cst-aaa-bbb cst-btn-primary cst-btn-eclipse d-flex justify-content-center align-items-center"
        className={`cst-float-on  ${
          expanded && "cst-float-off"
        }  cst-btn-primary cst-btn-eclipse d-flex justify-content-center align-items-center`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? take("chevron-right") : take("chevron-left")}
      </Button>
      <p>ProfileBar</p>
    </Container>
  );
}

export default ProfileBar;
