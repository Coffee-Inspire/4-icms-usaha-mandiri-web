import React from "react";
import Sidebar from "../../components/Sidebar";
import Stock from "../../screens/Stock";
import { Container } from "react-bootstrap";
import ProfileBar from "../../components/ProfileBar";

function MainLayout() {
  return (
    <Container fluid className="d-flex p-0">
      <Sidebar />
      <div className="cst-content w-100">
        <ProfileBar />
        <Stock />
      </div>
    </Container>
  );
}

export default MainLayout;
