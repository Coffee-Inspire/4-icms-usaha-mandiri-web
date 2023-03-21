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
import { take } from "../../helpers/iconMapper";

function Shows({ columns, rows }) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <p className="cst-text-secondary">SORT BY:</p>
        <Form>
          <Form.Check type={"radio"} label={`label`} name="sort" />
          <Form.Check type={"radio"} label={`label2`} name="sort" />
        </Form>
      </Popover.Body>
    </Popover>
  );

  const limitOptions = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
  ];

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
    const recognizedCell = (col) => {
      const value = record[col.bind];
      const align = { textAlign: col.align || "center" };

      switch (col.type) {
        case "qty":
          <td style={align} key={`${record.id}-${col.bind}`}>
            <div className="d-flex flex-column">
              <span>{`${value}`}</span>
              <span className="text-secondary">PCS</span>
            </div>
          </td>;

        case "currency":
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              <div className="d-flex flex-column">
                <span>{`${value}`}</span>
                <span className="text-secondary">IDR</span>
              </div>
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
            <td style={align} key={`${record.id}-${col.bind}`}>
              <Button
                variant="none"
                className="cst-btn-neutral mx-1"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("test");
                }}
              >
                {take("view")}
              </Button>
              <Button
                variant="none"
                className="cst-btn-success mx-1"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("test");
                }}
              >
                {take("edit")}
              </Button>
              <Button
                variant="none"
                className="cst-btn-danger mx-1"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("test");
                }}
              >
                {take("delete")}
              </Button>
            </td>
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

  return (
    <div className="cst-section-shadow rounded-3  my-4">
      <Row className="mx-0 py-3">
        <Col xs={12} md={1} className="px-0  d-flex justify-content-center">
          <OverlayTrigger
            rootClose
            trigger="click"
            placement="bottom-start"
            overlay={popover}
          >
            <Button
              variant="none"
              className="cst-btn-secondary d-flex align-items-center w-75"
            >
              <span>{take("filter")}</span>
              <span className="ms-1"> Filter</span>
            </Button>
          </OverlayTrigger>
        </Col>
        <Col xs={12} md={4} className="px-0">
          <Form>
            <Form.Control placeholder="Search user by name" className="" />
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
      <div className="cst-heading-bg p-3 text-end fw-bold rounded-3 ">
        <span className="d-flex justify-content-end align-items-center">
          <small className=" cst-text-secondary me-1 ">Rows per page:</small>
          <small>
            <Select options={limitOptions} styles={customStyles} />
          </small>
          <small className=" cst-text-secondary mx-5">Page 1-3 of 3</small>
        </span>
      </div>
    </div>
  );
}

export default Shows;
