import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Row, Col } from "react-bootstrap";

import Header from "../../components/Header";
import { takeIcon } from "../../helpers/iconMapper";
import convertIDR from "../../helpers/convertIDR";

function IncomingDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const getData = () => {
    // ? For Development
    const dummy = {
      id: "1",
      incomingNumber: "UM/P/23/03/30",
      createdAt: "30/03/2023",
      totalPurchase: "10630000",
      note: "Lorem Ipsum",
      status: false,
      IncomingDetails: [
        {
          id: "31",
          stock: {
            stockId: "99",
            itemName: "SEMEN HITAM SAK",
            category: {
              name: "Semen dan Pasir",
            },
          },
          supplier: {
            supplierId: "90",
            supplierName: "supply-1",
          },
          purchaseQty: "120",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "120",
          receiveRemain: "0",
          cost: "35000",
          totalAmount: "4200000",
        },
        {
          id: "32",
          stock: {
            stockId: "99",
            itemName: "KERAN 3M PUTIH",
            category: {
              name: "Air",
            },
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "20",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "20",
          receiveRemain: "0",
          cost: "22000",
          totalAmount: "440000",
        },
        {
          id: "33",
          stock: {
            stockId: "99",
            itemName: 'PIPA RUBEKA 2.5"',
            category: {
              name: "Air",
            },
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "60",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          receiveRemain: "60",
          cost: "5000",
          totalAmount: "300000",
        },
        {
          id: "34",
          stock: {
            stockId: "96",
            itemName: 'PIPA RUBEKA 3"',
            category: {
              name: "Air",
            },
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "50",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "49",
          receiveRemain: "1",
          cost: "5000",
          totalAmount: "25000",
        },
        {
          id: "35",
          stock: {
            stockId: "63",
            itemName: "KAWAT LAS GULUNG",
            category: {
              name: "Kawat",
            },
          },
          supplier: {
            supplierId: "70",
            supplierName: "supply-1",
          },
          purchaseQty: "16",
          unit: "box",
          arrivedDate: null,
          receivedQty: "0",
          receiveRemain: "16",
          cost: "240000",
          totalAmount: "3840000",
        },
        {
          id: "36",
          stock: {
            stockId: "69",
            itemName: "BATA MERAH BLOK KAMPUNG",
            category: {
              name: "Batu",
            },
          },
          supplier: {
            supplierId: "70",
            supplierName: "supply-1",
          },
          purchaseQty: "800",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "800",
          receiveRemain: "0",
          cost: "1000",
          totalAmount: "800000",
        },
      ],
    };
    // TODO add maxToReceive property for each icdData (purchaseQty-receivedQty)
    setData(dummy);
  };

  const receiveStatusString = (total, remain) => {
    if (remain === "0")
      return <span className="cst-text-positive">Diterima Sepenuhnya</span>;
    if (remain < total)
      return <span className="cst-text-warning">Diterima sebagian</span>;
    if (remain === total)
      return <span className="cst-text-negative">Belum diterima</span>;
  };

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
          {takeIcon("backspace")}
        </span>
        <span>DETAIL BARANG MASUK</span>
      </Header>
      <Row className="mx-0">
        <Col md={12} lg={6} className="">
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">No. Order</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>{data ? data.incomingNumber : "-"}</strong>
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
                <strong className="cst-text-secondary">Barang Selesai</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>3/6</strong>
              </small>
            </Col>
          </Row>
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Status</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong className="cst-text-negative">Belum selesai</strong>
              </small>
            </Col>
          </Row>
          <Row className="m-0">
            <Col xs={6} md={3} className="px-0">
              <small>
                <strong className="cst-text-secondary">Total Harga</strong>
              </small>
            </Col>
            <Col xs={6} md={4} className="text-end px-0">
              <small>
                <strong>{`IDR ${convertIDR("6000000")}`}</strong>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
      {data && data.IncomingDetails && (
        <Row className="mx-0 mt-3 mb-2 cst-h-sm cst-y-scroll">
          {/* <Row className="mx-0 mt-3 mb-2"> */}
          <Col xs={12}>
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Kategori</th>
                  <th>Supplier</th>
                  <th className="text-end">Amount</th>
                  <th className="text-end">Harga Barang</th>
                  <th className="text-end">Jumlah Pemesanan</th>
                  <th className="text-end">Jumlah Diterima</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Tgl Terakhir Diterima</th>
                  {/* <th className="text-center">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {data.IncomingDetails.map((i) => (
                  <tr key={i.id}>
                    <td>{i.stock && i.stock.itemName}</td>
                    <td>
                      {i.stock && i.stock.category && i.stock.category.name}
                    </td>
                    <td>{i.supplier && i.supplier.supplierName}</td>
                    <td className="text-end">
                      <div className="d-flex flex-column">
                        {convertIDR(i.totalAmount)}
                        <span className="text-secondary">IDR</span>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column">
                        {convertIDR(i.cost)}
                        <span className="text-secondary">IDR</span>
                      </div>
                    </td>
                    <td className="text-end">
                      {i.purchaseQty} {i.unit}
                    </td>
                    <td className="text-end">
                      {i.receivedQty} {i.unit}
                    </td>
                    <td>
                      <small>
                        {receiveStatusString(i.purchaseQty, i.receiveRemain)}
                      </small>
                    </td>
                    <td className="text-center">
                      {i.arrivedDate ? i.arrivedDate : "-"}
                    </td>
                    {/* <td>Return</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default IncomingDetail;
