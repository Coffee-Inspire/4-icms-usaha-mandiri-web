import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import moment from "moment";

import Header from "../../components/Header";
import InvalidReceiveAlert from "./Alerts/InvalidReturnAlert";
import ActionPopup from "../../components/ActionPopup";

import outgoingApi from "../../apis/outgoing";
import returnApi from "../../apis/return";
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";
import InvalidReturnAlert from "./Alerts/InvalidReturnAlert";

function ReturnCreate() {
  const [receiptOptions, setReceiptOptions] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [outgoingInfo, setOutgoingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });
  const [invalidReturnAlertShow, setInvalidReturnAlertShow] = useState(false);

  const getReceiptSource = () => {
    setIsLoading(true);
    outgoingApi
      .getDataSource()
      .then((res) => {
        if (res.status !== 200) throw res;
        setReceiptOptions(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };
  const getOutgoingInfo = (outgoingId) => {
    setIsLoading(true);
    const params = {
      id: outgoingId,
    };
    outgoingApi
      .getById(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setOutgoingInfo(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const create = (e, outgoingDetail) => {
    e.preventDefault();

    const returnQty = document.getElementById(
      `input-${outgoingDetail.id}`
    ).value;
    const qtyOnHand =
      outgoingDetail.sold_qty - (outgoingDetail.return_qty || 0);

    // TODO Have to validate alphabetical value for mobile usage

    // ? Custom validation
    if (returnQty < 1) {
      console.warn("value-is-minus validation");
      setInvalidReturnAlertShow(true);
      return false;
    }
    if (returnQty > qtyOnHand) {
      console.error("max-to-return validation");
      setInvalidReturnAlertShow(true);
      return false;
    }

    const params = {
      id: outgoingDetail.id,
      return_qty: parseInt(returnQty),
      // receipt_no: receipt.label,
    };

    setIsLoading(true);
    returnApi
      .create(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setInvalidReturnAlertShow(false);

        setActionRes({
          status: res.status,
          message: "Berhasil membuat pengajuan retur barang",
        });
        setActionAlertShow(true);
        getOutgoingInfo(receipt.value);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getReceiptSource();
  }, []);

  useEffect(() => {
    setInvalidReturnAlertShow(false);
    if (receipt !== null) {
      getOutgoingInfo(receipt.value);
    } else setOutgoingInfo(null);
  }, [receipt]);

  return (
    <Container fluid className="p-4">
      <Header useBack headerLabel={"Retur Barang"} isLoading={isLoading} />
      <Row className="my-3 mx-0 justify-content-between">
        <Col xs={12} lg={2}>
          <Form.Label>Pilih Nota</Form.Label>
          <Select
            // isClearable
            options={receiptOptions}
            placeholder="Pilih Nota"
            onChange={(e) => setReceipt(e)}
          />
        </Col>
        {outgoingInfo && (
          <Col xs={12} md={12} lg={7} xl={4}>
            {/* <Row className="m-0 justify-content-end"> */}
            <Row className="m-0 d-flex justify-content-lg-end">
              <Col xs={6} md={6} lg={4} xl={5} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Nomor Nota</strong>
                </small>
              </Col>
              <Col xs={6} md={6} lg={5} xl={6} className="text-end px-0">
                <small>
                  <strong>{outgoingInfo.receipt_no}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-lg-end">
              <Col xs={6} md={6} lg={4} xl={5} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Tanggal Nota</strong>
                </small>
              </Col>
              <Col xs={6} md={6} lg={5} xl={6} className="text-end px-0">
                <small>
                  <strong>30/03/2023</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0 d-flex justify-content-lg-end">
              <Col xs={6} md={6} lg={4} xl={5} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Nama Pelanggan</strong>
                </small>
              </Col>
              <Col xs={6} md={6} lg={5} xl={6} className="text-end px-0">
                <small>
                  <strong>
                    {outgoingInfo
                      ? outgoingInfo.guest
                        ? outgoingInfo.guest_name
                        : "-"
                      : "-"}
                  </strong>
                </small>
              </Col>
            </Row>
            {outgoingInfo && outgoingInfo.guest && (
              <Row className="m-0 d-flex justify-content-lg-end">
                <Col xs={6} md={6} lg={4} xl={5} className="px-0">
                  <small>
                    <strong className="cst-text-secondary">
                      Telp Pelanggan
                    </strong>
                  </small>
                </Col>
                <Col xs={6} md={6} lg={5} xl={6} className="text-end px-0">
                  <small>
                    <strong>{outgoingInfo.guest.contact}</strong>
                  </small>
                </Col>
              </Row>
            )}
            <Row className="m-0 d-flex justify-content-lg-end">
              <Col xs={6} md={6} lg={4} xl={5} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Total Harga</strong>
                </small>
              </Col>
              <Col xs={6} md={6} lg={5} xl={6} className="text-end px-0">
                <small>
                  <strong>{`IDR ${convertIDR(
                    outgoingInfo.total_sold
                  )}`}</strong>
                </small>
              </Col>
            </Row>
            {/* </Row> */}
          </Col>
        )}
      </Row>
      <Row className="mx-0 mt-5">
        <Col xs={12}>
          <InvalidReturnAlert
            show={invalidReturnAlertShow}
            setShow={setInvalidReturnAlertShow}
          />
        </Col>
      </Row>
      {outgoingInfo && (
        <Row className="mx-0 mt-4 mb-2 cst-h-sm- cst-y-scroll">
          <div className="cst-h-xs cst-y-scroll">
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th className="text-end">Banyaknya </th>
                  <th className="text-end">Harga</th>
                  <th className="text-end">Jumlah</th>
                  <th className="text-end">Total Retur</th>
                  <th className="text-center">Retur Barang</th>
                </tr>
              </thead>
              <tbody>
                {outgoingInfo &&
                  outgoingInfo.outgoing_details &&
                  outgoingInfo.outgoing_details.map((i) => (
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
                      <td className="text-end">
                        {i.return_qty ? i.return_qty : "0"} {i.unit}
                      </td>

                      <td>
                        {i.return_qty === i.sold_qty ? (
                          <span className="cst-text-negative">
                            Telah di retur sepenuhnya
                          </span>
                        ) : (
                          <Form onSubmit={(e) => create(e, i)}>
                            <Row className="mx-0 d-flex justify-content-end align-items-center">
                              <Col
                                lg={12}
                                xl={5}
                                className="d-flex justify-content-end align-items-center"
                              >
                                <Form.Control
                                  type="number"
                                  // style={{ width: "80px" }}
                                  className="cst-form-counter py-1 me-1"
                                  placeholder="Input"
                                  id={`input-${i.id}`}
                                />
                                <span>{i.unit}</span>
                              </Col>
                              <Col lg={12} xl={5} className="pt-2 pt-xl-0">
                                <Button
                                  type="submit"
                                  variant="none"
                                  className="cst-btn-primary w-100"
                                  // TODO button should be disabled if reached max return value or on loading
                                  disabled={
                                    isLoading || i.return_qty === i.sold_qty
                                  }
                                >
                                  Retur
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
      )}
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default ReturnCreate;
