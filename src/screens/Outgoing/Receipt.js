import React from "react";
import moment from "moment";

import Logo from "../../assets/logo.png";

import convertIDR from "../../helpers/convertIDR";

function Receipt({ innerRef, data }) {
  const headingCellStyle = {
    border: "1px solid rgba(0,0,0,1)",
    padding: "2px 10px 2px 10px",
    textAlign: "right",
  };

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
        <tr key={i} style={{ height: "30px" }}>
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
  };

  return (
    <div className="cst-print-only p-5" ref={innerRef}>
      <div className="d-flex mb-4">
        <div className="w-50">
          <img
            style={{ width: "230px", height: "55px" }}
            className="mb-2"
            alt=""
            src={Logo}
          />
          <div className="d-flex flex-column">
            <small>{metaContent.address}</small>
            <small>Telp {metaContent.contact}</small>
          </div>
        </div>
        <div className="w-50 text-end">
          <h5 className="cst-text-negative fw-bold mb-4">
            {data && data.receipt_no}
          </h5>
          <div className="d-flex justify-content-end">
            <table>
              <thead>
                <tr>
                  <td style={headingCellStyle}>Tanggal</td>
                  <td style={headingCellStyle}>
                    {data && moment(data.sold_date).format("DD-MM-YYYY")}
                  </td>
                </tr>
                <tr>
                  <td style={headingCellStyle}>Kepada Yth</td>
                  <td style={headingCellStyle}>
                    {data && data.guest && data.guest.guest_name}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div>
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
        <div className="border border-dark text-end py-1 px-2">
          <span className="fw-bold">Total Rp: </span>{" "}
          {convertIDR(data && data.total_sold)}
        </div>
        <div className="my-3 d-flex justify-content-between">
          <div
            style={{ width: "30%" }}
            className="text-center border border-dark d-flex flex-column py-1 px-3"
          >
            <strong>PERHATIAN</strong>
            <small style={{ fontSize: "12px" }}>
              Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan
            </small>
          </div>
          <div>
            <p>Hormat Kami,</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
