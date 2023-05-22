import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import sitemap from "../../routing/sitemap.js";
import Sidebar from "../../components/Sidebar";
import { Container } from "react-bootstrap";
import ProfileBar from "../../components/ProfileBar";
import { useSelector } from "react-redux";
import Forbidden from "../Fallback/Forbidden/index.js";

function MainLayout({ prefix }) {
  const { profileData } = useSelector((state) => state.profileReducer);

  const [expanded, setExpanded] = useState(false);
  return (
    <Container fluid className="p-0 vh-100">
      <Sidebar prefix={prefix} expanded={expanded} />
      <div
        className={`cst-content ${
          expanded && "cst-content-extended"
        } w-100 vh-100`}
      >
        <div className="position-relative bg-inf vh-100">
          <ProfileBar expanded={expanded} setExpanded={setExpanded} />
          <Routes>
            {sitemap.length > 0 &&
              sitemap.map((r) => {
                if (
                  r.permissions.includes("Global") ||
                  r.permissions.includes(profileData.role.role_name)
                ) {
                  return (
                    <Route key={r.path} element={r.element} path={r.path} />
                  );
                } else
                  return (
                    <Route key={r.path} element={<Forbidden />} path={r.path} />
                  );
              })}
          </Routes>
          {!expanded && (
            <div
              className="cst-sidebar-overlay"
              onClick={() => setExpanded(true)}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default MainLayout;
