import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import Header from "../../components/Header";
import Receipt from "./Receipt";
import ActionPopup from "../../components/ActionPopup";

import outgoingApi from "../../apis/outgoing";
import { takeIcon } from "../../helpers/iconMapper";
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";

function OutgoingDetail() {
  const printRef = useRef();

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const getData = () => {
    setIsLoading(true);
    const params = {
      id,
    };
    outgoingApi
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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid className="p-4">
      <Header useBack headerLabel={"penjualan"} isLoading={isLoading} />
      {data && (
        <Row className="my-3 mx-0 justify-content-between">
          <Col md={12} lg={6} className="">
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Nomor Nota</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{data.receipt_no}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">Tanggal Nota</strong>
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
                    {data ? (data.guest ? data.guest.guest_name : "-") : "-"}
                  </strong>
                </small>
              </Col>
            </Row>
            {data && data.guest && (
              <Row className="m-0">
                <Col xs={6} md={3} className="px-0">
                  <small>
                    <strong className="cst-text-secondary">
                      Telp Pelanggan
                    </strong>
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
              <small className="m-2">Cetak Nota</small>
            </Button>
          </Col>
        </Row>
      )}
      {data && data.outgoing_details && (
        <Row className="mx-0 mt-4 mb-2 cst-h-sm cst-y-scroll">
          <Col xs={12}>
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th className="">Banyaknya</th>
                  <th>Nama Barang</th>
                  <th className="text-end">Harga Jual</th>
                  <th className="text-end">Jumlah</th>
                  <th className="text-end">Jumlah Retur</th>
                </tr>
              </thead>
              <tbody>
                {data.outgoing_details.map((i) => (
                  <tr key={i.id}>
                    <td className="">
                      {i.sold_qty} {i.unit}
                    </td>
                    <td>{i.stock && i.stock.item_name}</td>
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
                    <td
                      className={`${
                        i.return_qty > 0 && "cst-text-negative"
                      } text-end`}
                    >
                      {i.return_qty || 0} {i.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      <Receipt innerRef={printRef} data={data} />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default OutgoingDetail;
