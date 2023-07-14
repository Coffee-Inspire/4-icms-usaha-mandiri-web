import React, { useState, useEffect } from "react";
import { Modal, Table, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import InvalidReceiveAlert from "./Alerts/InvalidReceiveAlert";
import ActionPopup from "../../components/ActionPopup";

import incomingApi from "../../apis/incoming.js";
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";
import moment from "moment";

function IncomingUpdateModal({ show, close, subjectData, getAllData }) {
  const [data, setData] = useState({});
  const [invalidReceiveAlertShow, setInvalidReceiveAlertShow] = useState(false);
  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);
    const params = {
      id: subjectData.id,
    };
    incomingApi
      .getById(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setData(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const editStatus = (incomingData) => {
    setIsLoading(true);
    const params = {
      id: incomingData.id,
      status: true,
    };
    incomingApi
      .updateStatus(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setInvalidReceiveAlertShow(false);

        setActionRes({
          status: res.status,
          message: "Berhasil memperbaharui status",
        });
        setActionAlertShow(true);
        getData();
        getAllData();
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const editData = (e, incomingDetail) => {
    e.preventDefault();
    const receive = document.getElementById(`input-${incomingDetail.id}`).value;

    // TODO Have to validate alphabetical value for mobile usage

    // ? Custom validation
    if (receive < 1) {
      console.warn("value-is-minus validation");
      setInvalidReceiveAlertShow(true);
      return false;
    }
    if (receive > incomingDetail.receive_remain) {
      console.error("maxToReceive validation");
      setInvalidReceiveAlertShow(true);
      return false;
    }

    const params = {
      id: incomingDetail.id,
      received_qty: parseInt(receive),
    };
    setIsLoading(true);
    incomingApi
      .receive(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setInvalidReceiveAlertShow(false);

        setActionRes({
          status: res.status,
          message: "Berhasil menerima barang",
        });
        setActionAlertShow(true);
        getData();
        getAllData();
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (subjectData.id) getData();
  }, [subjectData]);

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
        <Row className="mx-0 mb-3 justify-content-between">
          <Col xs={12} md={3} className="mb-4">
            <div className="cst-text-primary  d-flex flex-row align-items-center">
              <h4 className=" cst-letter-spacing-sm m-0">Penerimaan Barang</h4>
              {isLoading && <Spinner className="mx-2" />}
            </div>
            {data.status ? (
              <small className="cst-text-positive">
                <strong>Transaksi telah ditutup</strong>
              </small>
            ) : (
              <>
                <small>
                  <strong>Transaksi sedang berlangsung</strong>
                </small>
                <div className="mt-2">
                  <Button
                    variant="none"
                    className="cst-btn-warning d-flex justify-content-center align-items-center w-100"
                    onClick={() => editStatus(data)}
                  >
                    {/* <span>{takeIcon("filter")}</span> */}
                    <span className="ms-1"> Tutup transaksi</span>
                  </Button>
                </div>
              </>
            )}
          </Col>
          <Col xs={12} md={6}>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">
                    Nomor Pemesanan
                  </strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{subjectData ? subjectData.incoming_no : "-"}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-end">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">
                    Tanggal Pemesanan
                  </strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>
                    {subjectData
                      ? moment(subjectData.purchase_date).format("DD-MM-YYYY")
                      : "-"}
                  </strong>
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
                      data.incoming_details &&
                      `${data.incoming_details.length} item`}
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
                    {subjectData &&
                      `IDR ${convertIDR(subjectData.total_purchase)}`}
                  </strong>
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mx-0 ">
          <Col xs={12}>
            <InvalidReceiveAlert
              show={invalidReceiveAlertShow}
              setShow={setInvalidReceiveAlertShow}
            />
          </Col>
        </Row>
        <Row className="mx-0 my-1">
          <div className="cst-h-xs cst-y-scroll">
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
                  data.incoming_details &&
                  data.incoming_details.map((i) => (
                    <tr key={i.id}>
                      <td>{i.stock && i.stock.item_name}</td>
                      <td>{i.supplier && i.supplier.supplier_name}</td>
                      <td className="text-end">
                        <div className="d-flex flex-column">
                          {convertIDR(i.total_amount)}
                          <span className="text-secondary">IDR</span>
                        </div>
                      </td>
                      <td className="text-end">
                        {" "}
                        <div className="d-flex flex-column">
                          {convertIDR(i.purchase_price)}
                          <span className="text-secondary">IDR</span>
                        </div>
                      </td>
                      <td className="text-end">
                        {i.purchase_qty} {i.unit}
                      </td>
                      <td className="text-end">
                        {i.received_qty} {i.unit}
                      </td>
                      <td className="text-center">
                        {i.arrive_date
                          ? moment(i.arrive_date).format("DD-MM-YYYY")
                          : "-"}
                      </td>
                      <td>
                        {i.receive_remain === 0 || data.status ? (
                          <span className="cst-text-positive">
                            Penerimaan Selesai
                          </span>
                        ) : (
                          <Form onSubmit={(e) => editData(e, i)}>
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
                                  defaultValue={i.receive_remain}
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
                                  disabled={isLoading || i.receive_remain === 0}
                                >
                                  Simpan
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Modal.Body>
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Modal>
  );
}

export default IncomingUpdateModal;
