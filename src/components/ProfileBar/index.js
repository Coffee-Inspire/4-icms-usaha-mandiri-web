import React, { useState } from "react";
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

import ChangePasswordModal from "./ChangePasswordModal";
import ActionPopup from "../ActionPopup";

import userApi from "../../apis/user";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function ProfileBar({ expanded, setExpanded }) {
  const navigate = useNavigate();

  const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);
  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const { profileData } = useSelector((state) => state.profileReducer);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleChangePassword = (data) => {
    const params = {
      id: profileData.id,
      password_current: data.password_current,
      password_new: data.password_new,
    };
    userApi
      .update(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil mengganti kata sandi",
        });
        setActionAlertShow(true);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      });
  };

  const popover = (
    <Popover id="popover-basic" className="cst-m-xs py-1 px-2">
      <Row className="mx-0 ">
        <Col xs={6} className="cst-border-light-right text-center py-2 px-1">
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
          xs={6}
          className="d-flex flex-column justify-content-end py-2 px-1"
        >
          <span className="my-1 text-end">
            <small
              className="cst-clickable cst-hover-bg-respond cst-text-secondary rounded-3 p-1"
              onClick={() => setChangePasswordModalShow(true)}
            >
              <strong>
                <u>Ganti Kata Sandi</u>
              </strong>
            </small>
          </span>
          <span className="my-1 text-end">
            <small
              className="cst-clickable cst-hover-bg-respond cst-text-secondary rounded-3 p-1"
              onClick={() => handleLogout()}
            >
              <strong>
                <u>Keluar</u>
              </strong>
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
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        {takeIcon("burger")}
      </Button>
      <div className="d-flex align-items-center me-md-3">
        Hi,{" "}
        <strong className="ms-1 me-2 text-capitalize">
          {profileData.fullname}
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
      <ChangePasswordModal
        show={changePasswordModalShow}
        close={() => setChangePasswordModalShow(false)}
        handler={handleChangePassword}
      />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default ProfileBar;
