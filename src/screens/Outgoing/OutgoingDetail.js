import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Row, Col, Button, Spinner } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import Header from "../../components/Header";
import Receipt from "./Receipt";

import { takeIcon } from "../../helpers/iconMapper";
import convertIDR from "../../helpers/convertIDR";

function OutgoingDetail() {
  const navigate = useNavigate();
  const printRef = useRef();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);
    // ? For Development
    const dummy = {
      id: "1",
      receipt_no: "UM/PJL/23040001",
      guest: { name: "Julius", contact: "08238176131" },
      total_sold: 320000,
      note: "Lorem ipsum",
      outgoingDetails: [
        {
          id: "11",
          stock: { item_name: "Saringan air diameter 3" },
          sold_qty: "4",
          sold_price: "35000",
          total_amount: "140000",
        },
        {
          id: "22",
          stock: { item_name: "PVC RUCIKA 2 INCHI" },
          sold_qty: "8",
          sold_price: "10000",
          total_amount: "80000",
        },
        {
          id: "33",
          stock: { item_name: "KNEE L 2 INCHI" },
          sold_qty: "20",
          sold_price: "5000",
          total_amount: "100000",
        },
      ],
    };
    // TODO add maxToReceive property for each icdData (purchaseQty-receivedQty)
    setData(dummy);
    setIsLoading(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid className="p-4">
      <Header className="d-flex align-items-center">
        <span
          className="cst-clickable cst-hover-color-respond me-2"
          onClick={() => navigate(-1)}
        >
          {takeIcon("chevronLeft")}
        </span>
        <span>DETAIL BARANG KELUAR</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <Row className="mx-0 justify-content-between">
        <Col md={12} lg={6} className="">
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Nomor Nota</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>{data ? data.receipt_no : "-"}</strong>
              </small>
            </Col>
          </Row>
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Tanggal Order</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>30/03/2023</strong>
              </small>
            </Col>
          </Row>
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Nama Pelanggan</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>
                  {data ? (data.guest ? data.guest.name : "-") : "-"}
                </strong>
              </small>
            </Col>
          </Row>
          {data && data.guest && (
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Telp Pelanggan</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{data.guest.contact}</strong>
                </small>
              </Col>
            </Row>
          )}
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Total Harga</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>{`IDR ${convertIDR(data.total_sold)}`}</strong>
              </small>
            </Col>
          </Row>
        </Col>
        <Col md={12} lg={2} className="text-start my-2 text-md-end my-md-0">
          <Button
            variant="none"
            className="cst-btn-primary w-100  d-flex justify-content-center align-items-center p-1"
            onClick={() => handlePrint()}
          >
            <span> {takeIcon("print")}</span>
            <small className="mx-2">Cetak Nota</small>
          </Button>
        </Col>
      </Row>
      {data && data.outgoingDetails && (
        <Row className="mx-0 mt-3 mb-2 cst-h-sm cst-y-scroll">
          <Col xs={12}>
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th className="text-end">Banyaknya</th>
                  <th className="text-end">Harga Barang</th>
                  <th className="text-end">Amount</th>
                  {/* <th className="text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {data.outgoingDetails.map((i) => (
                  <tr key={i.id}>
                    <td>{i.stock && i.stock.item_name}</td>
                    <td className="text-end">
                      {i.sold_qty} {i.unit}
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column">
                        {convertIDR(i.sold_price)}
                        <span className="text-secondary">IDR</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column">
                        {convertIDR(i.total_amount)}
                        <span className="text-secondary">IDR</span>
                      </div>
                    </td>
                    {/* <td>Return</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      <Receipt innerRef={printRef} data={data} />
    </Container>
  );
}

export default OutgoingDetail;
