import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import sitemap from "../../routing/sitemap.js";
import Sidebar from "../../components/Sidebar";
import { Container } from "react-bootstrap";
import ProfileBar from "../../components/ProfileBar";

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
          {sitemap.length > 0 &&
            sitemap.map((r) => (
              <Route key={r.path} element={r.element} path={r.path} />
            ))}
        </Routes>
      </div>
    </Container>
  );
}

export default MainLayout;
