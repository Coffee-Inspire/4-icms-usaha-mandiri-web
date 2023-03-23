import React from "react";
import Select from "react-select";
import {
  Row,
  Col,
  Table,
  Form,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";

import { takeIcon } from "../../helpers/iconMapper";
import Separator from "../Separator";

function Shows({
  columns,
  rows,
  limitOptions,
  setLimit,
  page,
  setPage,
  totalPage,
  setSearch,
  setFilter,
}) {
  let actionMethods = columns.find((col) => col.methods);
  if (actionMethods) actionMethods = actionMethods.methods;

  const filterPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Form>
          <Row>
            <Col xs={12}>
              <p className="cst-text-secondary">SORT BY:</p>
            </Col>
            <Col
              xs={12}
              className="cst-clickable cst-hover-respond my-1 d-flex justify-content-between align-items-center"
            >
              <label htmlFor="sortDefault" className="cst-clickable">
                Default
              </label>
              <Form.Check
                type={"radio"}
                name="filter"
                id="sortDefault"
                onChange={() => setFilter("")}
                className="cst-clickable"
                defaultChecked
              />
            </Col>
            <Col
              xs={12}
              className="cst-clickable cst-hover-respond my-1 d-flex justify-content-between align-items-center"
            >
              <label htmlFor="sortUpdatedAt" className="cst-clickable">
                Date modified
              </label>
              <Form.Check
                type={"radio"}
                name="filter"
                id="sortUpdatedAt"
                onChange={() => setFilter("updatedAt")}
                className="cst-clickable"
              />
            </Col>
          </Row>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderColor: "rgba(255,155,255,0)",
      backgroundColor: "rgba(255,155,255,0)",
      cursor: "pointer",
    }),

    option: (base) => {
      return {
        ...base,
        cursor: "pointer",
      };
    },
    singleValue: (provided) => ({
      ...provided,

      color: "rgba(110,104,147,1)",
      width: "100%",
      marginRight: "10px",
      textAlign: "center",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(110,104,147,1)",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
  };

  const renderColumns = () => {
    return columns.map((col) => {
      return (
        <th key={col.bind} className="text-center">
          {col.label}
        </th>
      );
    });
  };

  const renderCells = (record) => {
    const actionPopover = (
      <Popover id="popover-positioned-lft">
        <Popover.Body className="p-1">
          {actionMethods.includes("detail") && (
            <div
              className="cst-clickable cst-hover-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                console.log("View Detail - id:", record.id);
              }}
            >
              <span>Lihat Detail</span>
            </div>
          )}

          {actionMethods.includes("edit") && (
            <div
              className="cst-clickable cst-hover-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Ubah - id:", record.id);
              }}
            >
              <span>Ubah</span>
            </div>
          )}
          {actionMethods.includes("delete") && (
            <>
              <Separator className="mx-1 mt-2" />
              <div
                className="cst-text-negative cst-clickable cst-hover-respond my-1 py-1 px-2 rounded-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Hapus - id:", record.id);
                }}
              >
                <span>Hapus</span>
              </div>
            </>
          )}
        </Popover.Body>
      </Popover>
    );

    const recognizedCell = (col) => {
      const value = record[col.bind];
      const align = { textAlign: col.align || "center" };

      switch (col.type) {
        case "qty":
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              <div className="d-flex flex-column">
                <span>{`${value}`}</span>
                <span className="text-secondary">PCS</span>
              </div>
            </td>
          );
        case "currency":
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              <div className="d-flex flex-column">
                <span>{`${value}`}</span>
                <span className="text-secondary">IDR</span>
              </div>
            </td>
          );
        case "activeStatus":
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              {value ? (
                <div className="cst-bg-positive-light cst-chip-radius d-flex">
                  <span className="cst-text-positive w-100">Aktif</span>
                </div>
              ) : (
                <div className="cst-bg-negative-light cst-chip-radius d-flex">
                  <span className="cst-text-negative w-100">Non Aktif</span>
                </div>
              )}
            </td>
          );
        default:
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              {value}
            </td>
          );
      }
    };

    const unrecognizedCell = (col) => {
      const align = { textAlign: col.align || "center" };
      switch (col.type) {
        case "action":
          return (
            <OverlayTrigger
              key={`${record.id}-${col.bind}`}
              trigger="click"
              placement="bottom-start"
              rootClose
              rootCloseEvent="click"
              overlay={actionPopover}
            >
              <td style={align}>{takeIcon("menuVertical")}</td>
            </OverlayTrigger>
          );
        default:
          return <td key={`${record.id}-${col.bind}`}>-</td>;
      }
    };

    return columns.map((col) =>
      Object.keys(record).find((cell) => cell == col.bind)
        ? recognizedCell(col)
        : unrecognizedCell(col)
    );
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  return (
    <div className="cst-section-shadow rounded-3  my-4">
      <Row className="mx-0 py-3">
        <Col xs={5} md={2} className="px-0  d-flex justify-content-center">
          <OverlayTrigger
            rootClose
            trigger="click"
            placement="bottom-start"
            overlay={filterPopover}
          >
            <Button
              variant="none"
              className="cst-btn-secondary d-flex justify-content-center align-items-center w-75"
            >
              <span>{takeIcon("filter")}</span>
              <span className="ms-1"> Filter</span>
            </Button>
          </OverlayTrigger>
        </Col>
        <Col xs={7} md={4} className="px-0">
          <Form>
            <Form.Control
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      <Table responsive className="cst-table">
        <thead>
          <tr>{renderColumns()}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>{renderCells(row)}</tr>
          ))}
        </tbody>
      </Table>
      <Row className="cst-heading-bg cst-table-toolbar cst-text-secondary mx-0 fw-bold d-flex justify-content-end">
        <Col
          xs={5}
          md={2}
          className="d-flex justify-content-end align-items-center py-1"
        >
          <small className="me-1">Limit:</small>
          <small>
            <Select
              options={limitOptions}
              styles={customStyles}
              defaultValue={limitOptions[0]}
              onChange={(a) => setLimit(a)}
            />
          </small>
        </Col>
        <Col
          xs={7}
          md={3}
          className="d-flex justify-content-end align-items-center py-1"
        >
          <small>
            Page {page} <span>of {"99"}</span>
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => handlePrevPage()}
          >
            {takeIcon("chevronLeft")}
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => handleNextPage()}
          >
            {takeIcon("chevronRight")}
          </small>
        </Col>
      </Row>
    </div>
  );
}

export default Shows;
