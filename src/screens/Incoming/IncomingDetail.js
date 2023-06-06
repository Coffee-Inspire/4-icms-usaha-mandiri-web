import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Table, Row, Col } from "react-bootstrap";

import Header from "../../components/Header";
import ActionPopup from "../../components/ActionPopup";

import incomingApi from "../../apis/incoming.js";
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";
import moment from "moment";

function IncomingDetail() {
  const navigate = useNavigate();

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
    incomingApi
      .getById(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        // if (Array.isArray(res.data.data)) {
        //   // ? Custom exeption due to unconsistent respond
        //   res.response = {
        //     status: 404,
        //     data: { error: { message: "Data tidak ditemukan" } },
        //   };
        //   throw res;
        // }
        setData(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const receiveStatusString = (total, remain) => {
    if (remain === 0)
      return <span className="cst-text-positive">Diterima Sepenuhnya</span>;
    if (remain < total)
      return <span className="cst-text-warning">Diterima sebagian</span>;
    if (remain === total)
      return <span className="cst-text-negative">Belum diterima</span>;
  };

  const receivedCount = (data) => {
    const totalData = data.length;
    const completedData = data.filter(
      (i) => i.purchase_qty === i.received_qty
    ).length;
    return `${completedData}/${totalData}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container fluid className="p-4">
      <Header useBack headerLabel={"pembelian"} isLoading={isLoading} />
      {data && (
        <Row className="my-3 mx-0">
          <Col md={12} lg={6}>
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">No. Order</strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{data.incoming_no}</strong>
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
                  <strong>
                    {moment(data.purchase_date).format("DD-MM-YYYY")}
                  </strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">
                    Penerimaan Selesai
                  </strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong>{receivedCount(data.incoming_details)}</strong>
                </small>
              </Col>
            </Row>
            <Row className="m-0">
              <Col xs={6} md={3} className="px-0">
                <small>
                  <strong className="cst-text-secondary">
                    Status Transaksi
                  </strong>
                </small>
              </Col>
              <Col xs={6} md={4} className="text-end px-0">
                <small>
                  <strong
                    className={`${
                      data.status ? "cst-text-positive" : "cst-text-negative"
                    }`}
                  >
                    {data.status ? "Selesai" : "Belum Selesai"}
                  </strong>
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
                  <strong>{`IDR ${convertIDR(data.total_purchase)}`}</strong>
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {data && data.incoming_details && (
        <Row className="mx-0 mt-4 mb-2 cst-h-sm cst-y-scroll">
          {/* <Row className="mx-0 mt-3 mb-2"> */}
          <Col xs={12}>
            <Table responsive className="cst-subtable">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  {/* <th>Kategori</th> */}
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
                {data.incoming_details.map((i) => (
                  <tr key={i.id}>
                    <td>{i.stock && i.stock.item_name}</td>
                    {/* <td>
                      {i.stock && i.stock.category && i.stock.category.name}
                    </td> */}
                    <td>{i.supplier && i.supplier.supplier_name}</td>
                    <td className="text-end">
                      <div className="d-flex flex-column">
                        {convertIDR(i.total_amount)}
                        <span className="text-secondary">IDR</span>
                      </div>
                    </td>
                    <td className="text-end">
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
                      <small>
                        {receiveStatusString(i.purchase_qty, i.receive_remain)}
                      </small>
                    </td>
                    <td className="text-center">
                      {i.arrive_date
                        ? moment(i.arrive_date).format("DD-MM-YYYY")
                        : "-"}
                    </td>
                    {/* <td>Return</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
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

export default IncomingDetail;
