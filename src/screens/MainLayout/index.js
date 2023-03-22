import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Container } from "react-bootstrap";
import ProfileBar from "../../components/ProfileBar";
import Stock from "../../screens/Stock";
import Customer from "../../screens/Customer";
import Supplier from "../Supplier";

function MainLayout({ prefix }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Container fluid className="p-0 vh-100">
      <Sidebar prefix={prefix} expanded={expanded} />
      <div
        className={`cst-content ${expanded && "cst-content-extended"} w-100`}
      >
        <ProfileBar expanded={expanded} setExpanded={setExpanded} />
        <Routes>
          <Route element={<Stock />} path="/stock" />
          <Route element={<Customer />} path="/customer" />
          <Route element={<Supplier />} path="/supplier" />
        </Routes>
      </div>
    </Container>
  );
}

export default MainLayout;
