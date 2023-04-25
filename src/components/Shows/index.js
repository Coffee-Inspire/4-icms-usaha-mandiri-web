import React from "react";
import moment from "moment";
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
import NoData from "../../assets/NoData.jpg";
import { takeIcon } from "../../helpers/iconMapper";
import Separator from "../Separator";
import convertIDR from "../../helpers/convertIDR";

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
  actionForEdit,
  actionForDetail,
  actionForDelete,
}) {
  let actionMethods = columns.find((col) => col.methods);
  actionMethods
    ? (actionMethods = actionMethods.methods)
    : (actionMethods = []);

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
              className="cst-clickable cst-hover-bg-respond my-1 d-flex justify-content-between align-items-center"
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
              className="cst-clickable cst-hover-bg-respond my-1 d-flex justify-content-between align-items-center"
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
      const align = { textAlign: col.align || "center" };
      return (
        <th key={col.bind}>
          <div style={align} className="w-75 mx-auto">
            {col.label}
          </div>
        </th>
      );
    });
  };

  const renderCells = (record) => {
    const actionPopover = (
      <Popover id="popover-positioned-left">
        <Popover.Body className="p-1">
          {actionMethods.includes("detail") && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForDetail(record.id);
              }}
            >
              <span>Lihat Detail</span>
            </div>
          )}

          {actionMethods.includes("edit") && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForEdit(record);
              }}
            >
              <span>Ubah</span>
            </div>
          )}
          {actionMethods.includes("delete") && (
            <>
              {actionMethods.length > 1 && <Separator className="mx-1 mt-2" />}
              <div
                className="cst-text-negative cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
                onClick={(e) => {
                  e.stopPropagation();
                  document.body.click();
                  actionForDelete(record);
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
      const customized = {
        textAlign: col.align || "center",
        textTransform: col.textTransform || "",
      };

      switch (col.type) {
        case "qty":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="w-75 mx-auto">
                <div className="d-flex flex-column">
                  <span>{`${value}`}</span>
                  <span className="text-secondary">PCS</span>
                </div>
              </div>
            </td>
          );
        case "currency": {
          if (col.bind === "mutation") {
            return (
              <td style={customized} key={`${record.id}-${col.bind}`}>
                <div className="w-75 mx-auto">
                  <div className="d-flex flex-column">
                    <span
                      className={`${
                        record.type === "CR"
                          ? "cst-text-positive"
                          : "cst-text-negative"
                      }`}
                    >{`${convertIDR(value)}`}</span>
                    <span className="text-secondary">IDR</span>
                  </div>
                </div>
              </td>
            );
          } else
            return (
              <td style={customized} key={`${record.id}-${col.bind}`}>
                <div className="w-75 mx-auto">
                  <div className="d-flex flex-column">
                    <span>{`${convertIDR(value)}`}</span>
                    <span className="text-secondary">IDR</span>
                  </div>
                </div>
              </td>
            );
        }
        case "transactionType": {
          switch (value) {
            case "CR":
              return (
                <td key={`${record.id}-${col.bind}`}>
                  <div className="cst-bg-positive-light cst-chip-radius w-75 mx-auto text-center">
                    <span className="cst-text-positive">CR</span>
                  </div>
                </td>
              );

            case "DB":
              return (
                <td key={`${record.id}-${col.bind}`}>
                  <div className="cst-bg-negative-light cst-chip-radius w-75 mx-auto text-center">
                    <span className="cst-text-negative">DB</span>
                  </div>
                </td>
              );
          }
        }
        case "activeStatus":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
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
        case "userStatus":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              {value ? (
                <span className="bg-danger">
                  <div className="cst-bg-neutral-light cst-chip-radius cst-w-100 mx-auto cst-text-primary px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-primary mx-1" />
                      <span>Aktif</span>
                    </div>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="cst-bg-neutral-lighter cst-chip-radius cst-w-100 mx-auto cst-text-secondary px-2 ">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-neutral mx-1" />
                      <span>Nonaktif</span>
                    </div>
                  </div>
                </span>
              )}
            </td>
          );
        case "date":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  {value ? moment(value).format("DD-MM-YYYY") : "-"}
                </div>
              </div>
            </td>
          );
        default:
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="d-flex justify-content-center">
                <div className="w-75">{value || "-"}</div>
              </div>
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
          <Form.Group className=" position-relative">
            <Form.Control
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="cst-form-control cst-form-control-inner-padding"
            />
            <span className="cst-form-icon-float">{takeIcon("search")}</span>
          </Form.Group>
        </Col>
      </Row>
      {rows.length > 0 ? (
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
      ) : (
        <div className="d-flex flex-column">
          <img
            style={{ width: "200px", height: "200px" }}
            className="align-self-center"
            alt=""
            src={NoData}
          />
          <strong className="mt-2 mb-3 text-center cst-text-secondary">
            Data tidak ditemukan
          </strong>
        </div>
      )}
      <Row className="cst-heading-bg cst-pagination-toolbar cst-text-secondary mx-0 fw-bold d-flex justify-content-end">
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
            Page {page} <span>of {totalPage}</span>
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => handlePrevPage()}
          >
            {takeIcon("chevronLeft")}
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => {
              handleNextPage();
            }}
          >
            {takeIcon("chevronRight")}
          </small>
        </Col>
      </Row>
    </div>
  );
}

export default Shows;
