import React from "react";
import Logo from "../../assets/logo.png";
import convertIDR from "../../helpers/convertIDR";

function Receipt({ innerRef, data }) {
  const headingCellStyle = {
    border: "1px solid rgba(0,0,0,1)",
    padding: "2px 10px 2px 10px",
    textAlign: "right",
  };

  // ? For Development
  const dummyContent = {
    address:
      " Jln Diponegoro, Ruko Orchid Garden Blok B11-B12 95231, Jakarta Selatan, Bekasi",
    contact: "08271272372",
  };

  return (
    <div className="cst-print-only p-5" ref={innerRef}>
      <div className="d-flex mb-4">
        <div className="w-50">
          <img
            style={{ width: "250px", height: "30px" }}
            className="mb-2"
            alt=""
            src={Logo}
          />
          <div className="d-flex flex-column">
            <small>{dummyContent.address}</small>
            <small>Telp {dummyContent.contact}</small>
          </div>
        </div>
        <div className="w-50 text-end">
          <h5 className="cst-text-negative fw-bold mb-4">{data.incomingNo}</h5>
          <div className="d-flex justify-content-end">
            <table>
              <thead>
                <tr>
                  <td style={headingCellStyle}>Tanggal</td>
                  <td style={headingCellStyle}>{data.date}</td>
                </tr>
                <tr>
                  <td style={headingCellStyle}>Kepada Yth</td>
                  <td style={headingCellStyle}>{data.customer}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div>
        <table className="cst-print-table mb-3">
          <colgroup>
            <col span="1" style={{ width: "6%" }} />
            <col span="1" style={{ width: "50%" }} />
            <col span="1" style={{ width: "14%" }} />
            <col span="1" style={{ width: "15%" }} />
            <col span="1" style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>NO</th>
              <th>NAMA BARANG</th>
              <th>BANYAKNYA</th>
              <th>HARGA</th>
              <th>JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            {data.cart &&
              data.cart.length > 0 &&
              data.cart.map((i, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{i.itemName}</td>
                  <td className="text-center">{i.soldQty}</td>
                  <td className="text-end">{convertIDR(i.price)}</td>
                  <td className="text-end">{convertIDR(i.amount)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="border border-dark text-end py-1 px-2">
          <span className="fw-bold">TOTAL: </span> {convertIDR(data.totalPrice)}
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
