import React, { useState } from "react";
import { Navbar, Nav, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import navs from "../../helpers/navs";
import logo from "../../assets/logo.png";
import { takeIcon } from "../../helpers/iconMapper";

function Sidebar({ prefix, expanded }) {
  const { profileData } = useSelector((state) => state.profileReducer);

  const [collapseList, setCollapseList] = useState([]);

  const checkDropdownState = (label) => {
    if (collapseList.some((item) => item === label)) {
      setCollapseList(collapseList.filter((item) => item !== label));
    } else {
      setCollapseList((collapseList) => [...collapseList, label]);
    }
  };

  return (
    <div
      className={`cst-sidebar  ${
        expanded && "cst-sidebar-collapsed"
      } text-nowrap pb-5`}
    >
      <Navbar.Brand>
        <div className="text-center">
          <img
            src={logo}
            alt=""
            className="my-5"
            style={{ width: "160px", height: "40px" }}
          />
        </div>
      </Navbar.Brand>
      {navs.length > 0 &&
        navs.map((navItem) => {
          if (navItem.childs && navItem.childs.length > 0) {
            return (
              <div key={navItem.label} className="mb-2">
                {/* Nav parent */}
                <div
                  onClick={() => checkDropdownState(navItem.label)}
                  className="cst-text-primary cst-clickable d-flex justify-content-between align-items-center ps-4 pe-5 py-2 r"
                >
                  <div>
                    {navItem.icon}
                    <span className="ms-2">{navItem.label}</span>
                  </div>
                  {collapseList.some((item) => item === navItem.label)
                    ? takeIcon("chevronUp")
                    : takeIcon("chevronDown")}
                </div>
                <Collapse
                  in={collapseList.some((item) => item === navItem.label)}
                >
                  <div>
                    <div className="d-flex flex-column ps-5">
                      {navItem.childs.map((navChild) => {
                        // * Nav childs
                        if (
                          navChild.permissions.includes("Global") ||
                          navChild.permissions.includes(
                            profileData.role.role_name
                          )
                        )
                          return (
                            <NavLink
                              key={navChild.label}
                              to={`${prefix}${navChild.destination}`}
                              style={{ textDecoration: "none" }}
                              className="cst-text-primary py-2"
                            >
                              {navChild.icon}
                              <span className="ms-2">{navChild.label}</span>
                            </NavLink>
                          );
                      })}
                    </div>
                  </div>
                </Collapse>
              </div>
            );
          } else {
            return (
              // * Nav single
              <NavLink
                key={navItem.label}
                to={`${prefix}${navItem.destination}`}
                style={{ textDecoration: "none" }}
                className="cst-text-primary d-flex align-items-center ps-4 pe-5 py-2 mb-2"
              >
                {navItem.icon}
                <span className="ms-2">{navItem.label}</span>
              </NavLink>
            );
          }
        })}
    </div>
  );
}

export default Sidebar;
