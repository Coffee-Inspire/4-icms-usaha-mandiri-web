import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

import Logo from "../../assets/emblem.png";

import refEmblem1 from "../../assets/mandiri.png";
import refEmblem2 from "../../assets/bca_card.png";
import refEmblem3 from "../../assets/debit_bca.png";
import refEmblem4 from "../../assets/visa.png";
import refEmblem5 from "../../assets/master_card.png";

import convertIDR from "../../helpers/convertIDR";

function Receipt({ innerRef, data }) {
  const renderRow = (data) => {
    const totalData = data.length;
    const minRow = 11;

    let output = data.map((i, index) => {
      return (
        <tr key={index}>
          <td className="text-center">{`${i.sold_qty} ${i.unit}`}</td>
          <td>{i.stock.item_name}</td>
          <td className="text-end">{convertIDR(i.sold_price)}</td>
          <td className="text-end">{convertIDR(i.total_amount)}</td>
        </tr>
      );
    });

    for (let i = totalData; i < minRow; i++) {
      output.push(
        <tr key={i} style={{ height: "17px" }}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return output;
  };

  const metaContent = {
    address: "Taman Wisma Asri Blok B27-39, Bekasi",
    contact: "0812-2252-9267",
    refEmblem1: refEmblem1,
    refEmblem2: refEmblem2,
    refEmblem3: refEmblem3,
    refEmblem4: refEmblem4,
    refEmblem5: refEmblem5,
  };

  return (
    <div
      className="cst-print-only"
      ref={innerRef}
      style={{
        width: "415.8px",
        height: "453.6px",
        padding: "5px",
      }}
    >
      <Row className="mx-0 pb-1 border-bottom border-dark">
        <Col xs={"auto"} className="pe-0 d-flex justify-content-center pt-2">
          <img style={{ width: "42px", height: "42px" }} alt="" src={Logo} />
        </Col>
        <Col xs={6} className="px-0 d-flex flex-column text-center">
          <span style={{ fontSize: "9px" }} className="m-0 p-0 fw-bold">
            Toko Besi & Bahan Bangunan
          </span>
          <span className="m-0 p-0">
            <h5 className="m-0 p-0 cst-text-negative fw-bold">USAHA MANDIRI</h5>
          </span>
          <span style={{ fontSize: "9px" }} className="m-0 p-0">
            {metaContent.address}
          </span>
          <span style={{ fontSize: "9px" }} className="m-0 p-0">
            Telp/WA: {metaContent.contact}
          </span>
        </Col>
        <Col className="px-0 d-flex flex-column justify-content-between">
          <div className="d-flex flex-column">
            <span style={{ fontSize: "9px" }} className="m-0 p-0">
              Bekasi, {data && moment(data.sold_date).format("DD-MM-YYYY")}
            </span>
            <span style={{ fontSize: "9px" }}>Kepada Yth,</span>
            <span style={{ fontSize: "9px" }} className="m-0 p-0">
              {data && data.guest
                ? data.guest.guest_name
                : "...................."}
            </span>
          </div>
          <span
            style={{ fontSize: "9px" }}
            className="m-0 p-0 cst-text-negative fw-bold text-end"
          >
            {data && data.receipt_no}
          </span>
        </Col>
      </Row>
      <div className="mt-1">
        <table className="cst-print-table mb-3">
          <colgroup>
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "50%" }} />
            <col span="1" style={{ width: "35%" }} />
            <col span="1" style={{ width: "35%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>BANYAKNYA</th>
              <th>NAMA BARANG</th>
              <th>HARGA SATUAN</th>
              <th>JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.outgoing_details &&
              data.outgoing_details.length > 0 &&
              renderRow(data.outgoing_details)}
          </tbody>
        </table>
        <div
          style={{ fontSize: "11px" }}
          className="border border-dark text-end py-1 px-2"
        >
          <span className="fw-bold">Total Rp: </span>{" "}
          {convertIDR(data && data.total_sold)}
        </div>
        <Row className="mx-0">
          <Col className="px-0 text-start">
            <span style={{ fontSize: "9px" }} className="fw-bold">
              TANDA TERIMA,
            </span>
          </Col>
          <Col className="px-0 text-end">
            <span style={{ fontSize: "9px" }}>Hormat Kami,</span>
          </Col>
          <Col xs={12} className="px-0 mt-4 d-flex flex-column">
            <span style={{ fontSize: "9px" }} className="text-center">
              Menerima Pembayaran:
            </span>
            <Row className="mx-0 my-2">
              <Col className="px-0 text-center">
                <img
                  style={{ width: "60px", height: "35px" }}
                  src={refEmblem1}
                  alt=""
                />
              </Col>
              <Col className="px-0 text-center">
                <img
                  style={{ width: "60px", height: "35px" }}
                  src={refEmblem2}
                  alt=""
                />
              </Col>
              <Col className="px-0 text-center">
                <img
                  style={{ width: "60px", height: "35px" }}
                  src={refEmblem3}
                  alt=""
                />
              </Col>
              <Col className="px-0 text-center">
                <img
                  style={{ width: "60px", height: "35px" }}
                  src={refEmblem4}
                  alt=""
                />
              </Col>
              <Col className="px-0 text-center">
                <img
                  style={{ width: "60px", height: "35px" }}
                  src={refEmblem5}
                  alt=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Receipt;
