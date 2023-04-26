import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import TransactionCreateModal from "./TransactionCreateModal";
import ActionPopup from "../../components/ActionPopup";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";

function Journal() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState("0");
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "tanggal",
      bind: "transactionDate",
    },
    {
      label: "lampiran",
      bind: "reference",
      align: "left",
    },
    {
      label: "catatan",
      bind: "note",
      align: "left",
    },
    {
      label: "tipe",
      bind: "type",
      align: "center",
      type: "transactionType",
    },
    {
      label: "nominal",
      bind: "mutation",
      type: "currency",
      align: "right",
    },
  ];

  const getData = () => {
    setIsLoading(true);
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    console.log("JOURNAL GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        transactionDate: "27/03/2023",
        reference: "OUT/23/03/1",
        note: "Manual/Tambah kas",
        type: "CR",
        mutation: "1000000",
      },
      {
        id: "2",
        transactionDate: "27/03/2023",
        reference: "INC/23/03/1",
        note: "Pembelian",
        type: "DB",
        mutation: "300000",
      },
      {
        id: "3",
        transactionDate: "27/03/2023",
        reference: "INC/23/03/2",
        note: "Pembelian",
        type: "DB",
        mutation: "500000",
      },
      {
        id: "4",
        transactionDate: "28/03/2023",
        reference: "OUT/23/03/2",
        note: "Penjualan",
        type: "CR",
        mutation: "120000",
      },
      {
        id: "5",
        transactionDate: "28/03/2023",
        reference: "OUT/23/03/3",
        note: "Penjualan",
        type: "CR",
        mutation: "480000",
      },
      {
        id: "6",
        transactionDate: "28/03/2023",
        reference: "INC/23/03/3",
        note: "Pembelian",
        type: "DB",
        mutation: "350000",
      },
      {
        id: "7",
        transactionDate: "29/03/2023",
        reference: "OUT/23/03/4",
        note: "Penjualan",
        type: "CR",
        mutation: "570000",
      },
      {
        id: "8",
        transactionDate: "29/03/2023",
        reference: "OUT/23/03/5",
        note: "Penjualan",
        type: "CR",
        mutation: "80000",
      },
      {
        id: "9",
        transactionDate: "30/03/2023",
        reference: "INC/23/03/4",
        note: "Pembelian",
        type: "DB",
        mutation: "500000",
      },
      {
        id: "10",
        transactionDate: "30/03/2023",
        reference: "OUT/23/03/6",
        note: "Penjualan",
        type: "CR",
        mutation: "750000",
      },
    ];
    setData(dummy);
    setBalance("1234567890");
    setTotalPage(5);
    setIsLoading(false);
  };

  const createData = (param) => {
    console.log("Current POST Parameter:", param);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"jurnal transaksi"} isLoading={isLoading} />
      <div className="d-flex justify-content-between align-items-center">
        <ButtonAddRow
          handler={() => setCreateModalShow(true)}
          disabled={isLoading}
        >
          Transaksi Manual
        </ButtonAddRow>
        <div className="text-end">
          <strong className="text-secondary">
            <span className="me-2">{takeIcon("cash")}</span>
            Saldo
          </strong>
          <h6>
            <strong>IDR {convertIDR(balance)}</strong>
          </h6>
        </div>
      </div>
      <Shows
        columns={columns}
        rows={data}
        limitOptions={limitOptions}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        setSearch={setSearch}
        setFilter={setFilter}
      />
      <TransactionCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Journal;
