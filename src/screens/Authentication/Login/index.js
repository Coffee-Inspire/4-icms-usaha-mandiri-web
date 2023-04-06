import React from "react";
import { Container, Carousel, Row, Col, Form, Button } from "react-bootstrap";

import Logo from "../../../assets/logo.png";
import CarouselImg1 from "../../../assets/Good team-pana.svg";
import CarouselImg2 from "../../../assets/Visual data-pana.svg";
import CarouselImg3 from "../../../assets/Creative team-pana.svg";

import { takeIcon } from "../../../helpers/iconMapper";

function Login() {
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
            <Form.Group className="my-3">
              <Form.Label className="mb-1 cst-text-secondary fw-bold">
                <small>Username</small>
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  className="cst-form-control cst-form-control-inner-padding"
                  placeholder="Username"
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
                  type="password"
                  className="cst-form-control cst-form-control-inner-padding"
                  placeholder="Password"
                />
                <span className="cst-form-icon-float">{takeIcon("lock")}</span>
              </div>
            </Form.Group>
            <Form.Group className="text-center mt-4">
              <Button className="cst-btn-primary px-5" variant="none">
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
              <Carousel.Item key={c.index}>
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
