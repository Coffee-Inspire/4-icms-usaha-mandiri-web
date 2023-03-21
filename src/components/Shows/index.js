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
    }),

    option: (base) => {
      return {
        ...base,
        color: "rgba(109,91,208,1)",
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
  };
  const renderColumns = () => {
    return columns.map((col) => {
      return <th key={col.bind}>{col.label}</th>;
    });
  };
  const renderRecords = () => {
    const aaa = rows;
    console.log(aaa);
    //   <tr>
    //   {Array.from({ length: 8 }).map((_, index) => (
    //     <td key={index}>Table cell {index}</td>
    //   ))}
    // </tr>
  };
  renderRecords();
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
          <tr>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
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
