import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Incoming() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const columns = [
    {
      label: "order no",
      bind: "incomingNumber",
      align: "left",
    },
    {
      label: "tgl order",
      bind: "purchaseDate",
    },
    {
      label: "harga order",
      bind: "totalPurchase",
      type: "currency",
      align: "right",
    },
    {
      label: "catatan",
      bind: "note",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["detail", "edit"],
    },
  ];

  const getData = () => {
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    console.log("INCOMING GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        incomingNumber: "INC/0323/1",
        purchaseDate: "22/03/2023",
        totalPurchase: "300000",
        note: "Lorem Ipsum",
      },
      {
        id: "2",
        incomingNumber: "INC/0323/2",
        purchaseDate: "23/03/2023",
        totalPurchase: "500000",
        note: "Lorem Ipsum",
      },
      {
        id: "3",
        incomingNumber: "INC/0323/3",
        purchaseDate: "25/03/2023",
        totalPurchase: "1600000",
        note: "Lorem Ipsum",
      },
    ];
    setData(dummy);
    setTotalPage(5);
  };

  const createData = (param) => {
    console.log("INCOMING POST Parameter:", param);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>BARANG MASUK</span>
      </Header>
      <ButtonAddRow handler={() => navigate("create")}>
        Tambah Barang
      </ButtonAddRow>
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
    </Container>
  );
}

export default Incoming;
