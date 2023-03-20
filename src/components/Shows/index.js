import React from "react";
import {
  Row,
  Col,
  Table,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

function Shows() {
  return (
    <div className="border border-secondary">
      <Row className="mx-0">
        <Col xs={4} md={1} className="bg-danger">
          Filter
        </Col>
        <Col xs={8} md={4} className="bg-warning">
          Search
        </Col>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            {Array.from({ length: 12 }).map((_, index) => (
              <th key={index}>Table heading</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 12 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Shows;
