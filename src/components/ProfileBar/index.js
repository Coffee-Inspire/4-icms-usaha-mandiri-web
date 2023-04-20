import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Button,
  Row,
  Col,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";

import { takeIcon } from "../../helpers/iconMapper";

function ProfileBar({ expanded, setExpanded }) {
  const navigate = useNavigate();

  const { profileData } = useSelector((state) => state.profileReducer);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  const popover = (
    <Popover id="popover-basic" className="cst-m-xs py-1 px-2">
      <Row className="mx-0 ">
        <Col xs={5} className="text-center py-2 px-1">
          <span
            style={{ width: "50px", height: "50px", padding: "5px" }}
            className="cst-text-plain cst-bg-secondary d-flex justify-content-center align-items-center rounded-circle mx-auto mb-1"
          >
            {takeIcon("avatar")}
          </span>
          <p className="m-0">
            {" "}
            <small>{profileData.username}</small>
          </p>

          <small className="m-0 cst-text-neutral">
            {profileData.role ? profileData.role.role_name : "role_unknown"}
          </small>
        </Col>
        <Col
          xs={7}
          className="d-flex flex-column justify-content-between py-2 px-1"
        >
          <p className="cst-text-primary text-center my-auto text-capitalize">
            <strong>{profileData.fullname}</strong>
          </p>
          <span className="text-end">
            <small
              className="cst-clickable cst-hover-bg-respond cst-text-secondary rounded-3 p-1"
              onClick={() => handleLogout()}
            >
              <strong>Logout</strong>
            </small>
          </span>
        </Col>
      </Row>
    </Popover>
  );
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
        {/* {expanded ? takeIcon("chevronRight") : takeIcon("chevronLeft")} */}
        {takeIcon("burger")}
      </Button>
      <div className="d-flex align-items-center me-md-3">
        Hi,{" "}
        <strong className="ms-1 me-2 text-capitalize">
          {profileData.username}
        </strong>
        <OverlayTrigger
          rootClose
          trigger="click"
          placement="bottom"
          overlay={popover}
        >
          <span
            style={{ width: "30px", height: "30px", padding: "5px" }}
            className="cst-clickable cst-bg-secondary cst-text-plain d-flex justify-content-center align-items-center rounded-circle"
          >
            {takeIcon("avatar")}
          </span>
        </OverlayTrigger>
      </div>
    </Container>
  );
}

export default ProfileBar;
