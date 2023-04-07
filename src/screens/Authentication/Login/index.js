import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Carousel, Row, Col, Form, Button } from "react-bootstrap";

import InvalidAlert from "../Alerts/InvalidAlert";
import Logo from "../../../assets/logo.png";
import CarouselImg1 from "../../../assets/Good team-pana.svg";
import CarouselImg2 from "../../../assets/Visual data-pana.svg";
import CarouselImg3 from "../../../assets/Creative team-pana.svg";

import authApi from "../../../apis/auth.js";
import { takeIcon } from "../../../helpers/iconMapper";

function Login() {
  const navigate = useNavigate();

  const [loginParam, setLoginParam] = useState({
    username: "",
    password: "",
  });
  const [isPwd, setIsPwd] = useState(true);

  const [invalidAlertShow, setInvalidAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const carouselContents = [
    {
      image: CarouselImg1,
      text: "ICM memberikan kemudahan dalam pengelolaan bisnis anda",
    },
    {
      image: CarouselImg2,
      text: "Data yang saling terintegrasi satu sama lain, minimalisir human error dalam penginputan data",
    },
    {
      image: CarouselImg3,
      text: "Tingkatkat performa bisnis anda dengan mekanisme yang user friendly dan mudah digunakan oleh siapa saja",
    },
  ];
  const submitLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authApi
      .login(loginParam)
      .then((res) => {
        if (!res.data.token) {
          console.error("error: ", res.data.data);
          setAlertMessage(res.data.data);
          setInvalidAlertShow(true);
          return;
        }
        // const payload = res.data.data
        // TODO saving payload in redux store and dispatch it when needed.
        const token = res.data.token;
        localStorage.setItem("access_token", token);
        navigate("/dashboard");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setInvalidAlertShow(false);
  }, []);

  return (
    <Container
      fluid
      className="cst-bg-primary-light vh-100 d-flex flex-column justify-content-center"
    >
      <Row className="mx-0 d-flex justify-content-center">
        <Col
          xs={11}
          md={11}
          lg={5}
          xl={4}
          xxl={3}
          className="cst-bg-plain cst-section-shadow cst-border-radius-left cst-border-radius-right-xs p-4 "
        >
          <div className="text-center">
            <div>
              <img alt="" src={Logo} />
            </div>
            <small
              className="cst-letter-spacing-sm cst-text-secondary"
              style={{ fontSize: "12px" }}
            >
              <strong>Inventory and Cash Monitoring</strong>
            </small>
          </div>

          <Form className="my-5">
            <InvalidAlert
              show={invalidAlertShow}
              setShow={setInvalidAlertShow}
              message={alertMessage}
            />
            <Form.Group className="my-3">
              <Form.Label className="mb-1 cst-text-secondary fw-bold">
                <small>Username</small>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="cst-form-control cst-form-control-inner-padding"
                  placeholder="Username"
                  onChange={(e) =>
                    setLoginParam({ ...loginParam, username: e.target.value })
                  }
                />
                <span className="cst-form-icon-float">
                  {takeIcon("person")}
                </span>
              </div>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="mb-1 cst-text-secondary fw-bold">
                <small>Password</small>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={isPwd ? "password" : "text"}
                  className="cst-form-control cst-form-control-inner-padding"
                  placeholder="Password"
                  onChange={(e) =>
                    setLoginParam({ ...loginParam, password: e.target.value })
                  }
                />
                <span className="cst-form-icon-float">{takeIcon("lock")}</span>
                <span
                  className="cst-form-icon-float-end cst-clickable"
                  onClick={() => setIsPwd(!isPwd)}
                >
                  {isPwd ? takeIcon("eye") : takeIcon("eyeSlash")}
                </span>
              </div>
            </Form.Group>
            <Form.Group className="text-center mt-4">
              <Button
                className="cst-btn-primary px-5"
                variant="none"
                type="submit"
                onClick={(e) => submitLogin(e)}
                disabled={isLoading}
              >
                Login
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col
          xs={12}
          md={11}
          lg={5}
          xl={4}
          xxl={3}
          className="cst-bg-primary cst-section-shadow cst-border-radius-right d-none d-lg-block p-4"
        >
          <Carousel controls={false} interval={3000}>
            {carouselContents.map((c, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={c.image}
                  style={{ width: "100px", height: "300px" }}
                />
                <div className="bg-warning cst-login-carousel-caption-margin">
                  <Carousel.Caption>
                    <p className="fw-light">{c.text}</p>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
