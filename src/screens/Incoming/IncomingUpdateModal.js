import React, { useState, useEffect } from "react";
import { Modal, Table, Row, Col, Form, Button, Alert } from "react-bootstrap";

import convertIDR from "../../helpers/convertIDR";
import { takeIcon } from "../../helpers/iconMapper";

function IncomingUpdateModal({ show, close, id }) {
  const [data, setData] = useState({});
  const [alertShow, setAlertShow] = useState(false);

  const getData = () => {
    // ? For Development
    const dummy = {
      id: "1",
      incomingNumber: "UM/P/23/03/30",
      createdAt: "30/03/2023",
      totalPurchase: "10630000",
      note: "Lorem Ipsum",
      IncomingDetails: [
        {
          id: "31",
          stock: {
            stockId: "99",
            itemName: "SEMEN HITAM SAK",
          },
          supplier: {
            supplierId: "90",
            supplierName: "supply-1",
          },
          purchaseQty: "120",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          cost: "35000",
          totalAmount: "4200000",
        },
        {
          id: "32",
          stock: {
            stockId: "99",
            itemName: "KERAN 3M PUTIH",
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "20",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          cost: "22000",
          totalAmount: "440000",
        },
        {
          id: "33",
          stock: {
            stockId: "99",
            itemName: 'PIPA RUBEKA 2.5"',
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "60",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          cost: "5000",
          totalAmount: "300000",
        },
        {
          id: "34",
          stock: {
            stockId: "96",
            itemName: 'PIPA RUBEKA 3"',
          },
          supplier: {
            supplierId: "80",
            supplierName: "supply-2",
          },
          purchaseQty: "50",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          cost: "5000",
          totalAmount: "25000",
        },
        {
          id: "35",
          stock: {
            stockId: "63",
            itemName: "KAWAT LAS GULUNG",
          },
          supplier: {
            supplierId: "70",
            supplierName: "supply-1",
          },
          purchaseQty: "16",
          unit: "box",
          arrivedDate: null,
          receivedQty: "0",
          cost: "240000",
          totalAmount: "3840000",
        },
        {
          id: "36",
          stock: {
            stockId: "69",
            itemName: "BATA MERAH BLOK KAMPUNG",
          },
          supplier: {
            supplierId: "70",
            supplierName: "supply-1",
          },
          purchaseQty: "800",
          unit: "pcs",
          arrivedDate: null,
          receivedQty: "0",
          cost: "1000",
          totalAmount: "800000",
        },
      ],
    };
    // TODO add maxToReceive property for each icdData (purchaseQty-receivedQty)
    setData(dummy);
  };

  const editData = (e, IncomingDetailsId) => {
    e.preventDefault();
    const receivingValue = document.getElementById(
      `input-${IncomingDetailsId}`
    ).value;
    const icdData = data.IncomingDetails.find(
      (i) => i.id === IncomingDetailsId
    );

    // ? For Development
    const maxToReceive = icdData.purchaseQty - icdData.receivedQty;

    // TODO Check alphabetical value for mobile usage
    if (receivingValue < 1) {
      console.warn("value-is-minus validation");
      setAlertShow(true);
      return false;
    }
    if (receivingValue > maxToReceive) {
      console.error("maxToReceive validation");
      setAlertShow(true);
      return false;
    }

    setAlertShow(false);
    console.log("IncomingDetailsId value-", IncomingDetailsId);
    console.log("receiving quantity value-", receivingValue);
    // * Hit API
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal centered size="xl" show={show} onHide={handleClose}>
      <Modal.Header
        closeVariant="white"
        className="cst-bg-primary cst-text-plain"
        closeButton
      >
        <Modal.Title>Pembaharuan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mx-0 mb-3">
          <Col xs={12} md={6} className="mb-4">
            <h4 className="cst-text-primary cst-letter-spacing-sm m-0">
              Penerimaan Barang
            </h4>
            <small className="cst-text-negative">
              <strong>Transaksi ini belum selesai</strong>
            </small>
          </Col>
          <Col xs={12} md={6}>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">No. Order</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{data && data.incomingNumber}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Tanggal Order</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{data && data.createdAt}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Total Barang</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>
                    {data &&
                      data.IncomingDetails &&
                      `${data.IncomingDetails.length} item`}
                  </strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Total Harga</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>
                    {data && `IDR ${convertIDR(data.totalPurchase)}`}
                  </strong>
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mx-0 ">
          <Col xs={12}>
            <Alert
              show={alertShow}
              transition
              variant="danger"
              onClose={() => setAlertShow(false)}
              dismissible
            >
              <Alert.Heading>Oops, kamu gagal menyimpan barang</Alert.Heading>
              <p>
                Pastikan jumlah yang diinput tidak kosong dan tidak melebihi
                batas maksimum pada jumlah pemesanan kamu ya {takeIcon("smile")}
              </p>
            </Alert>
          </Col>
        </Row>
        <Row className="mx-0 my-1">
          <div className="cst-h-sm cst-y-scroll">
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Supplier</th>
                  <th className="text-end">Amount</th>
                  <th className="text-end">Harga Barang</th>
                  <th className="text-end">Jumlah Pemesanan</th>
                  <th className="text-end">Jumlah Diterima</th>
                  <th className="text-center">Tgl Terakhir diterima</th>
                  <th className="text-center">Terima Barang</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.IncomingDetails &&
                  data.IncomingDetails.map((i) => (
                    <tr key={i.id}>
                      <td>{i.stock && i.stock.itemName}</td>
                      <td>{i.supplier && i.supplier.supplierName}</td>
                      <td className="text-end">
                        <div className="d-flex flex-column">
                          {convertIDR(i.totalAmount)}
                          <span className="text-secondary">IDR</span>
                        </div>
                      </td>
                      <td className="text-end">
                        {" "}
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
                      <td className="text-center">
                        {i.arrivedDate ? i.arrivedDate : "-"}
                      </td>
                      <td>
                        <Form onSubmit={(e) => editData(e, i.id)}>
                          <Row className="mx-0 d-flex justify-content-center align-items-center">
                            <Col
                              lg={12}
                              xl={5}
                              className="d-flex  align-items-center"
                            >
                              <Form.Control
                                type="number"
                                className="cst-form-counter me-1"
                                // TODO defaultValue should be equals maxToReceive value
                                // defaultValue={"0"}
                                placeholder="Input"
                                id={`input-${i.id}`}
                              />
                              <span>{i.unit}</span>
                            </Col>
                            <Col lg={12} xl={5} className="pt-2 pt-xl-0">
                              <Button
                                type="submit"
                                variant="none"
                                className="cst-btn-primary w-100 py-0"
                                // TODO button should be disabled if maxToReceive value is 0 or on loading
                                disabled={false}
                              >
                                Simpan
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Row>
        <Row className="mx-0 mt-5 mb-2 d-flex justify-content-end">
          <Col xs={12} md={3}>
            <Button
              variant="none"
              onClick={() => {}}
              className="cst-btn-primary w-100"
              disabled={false}
            >
              Ubah Status Menjadi Selesai
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default IncomingUpdateModal;
