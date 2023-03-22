import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";

import limitOptions from "../../options/tableLimitOptions.json";
import CustomerCreateModal from "./CustomerCreateModal";

function Customer() {
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
      label: "Name",
      bind: "name",
      align: "left",
    },
    {
      label: "Contact",
      bind: "contact",
    },
    {
      label: "Email",
      bind: "email",
    },
    {
      label: "Address",
      bind: "address",
    },
    {
      label: "Action",
      bind: "action",
      type: "action",
      methods: ["edit", "delete"],
    },
  ];

  const getData = () => {
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    console.log("Current GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        name: "Paulin Mayasari",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "2",
        name: "Cayadi Natsir",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "3",
        name: "Mala Puspita",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "4",
        name: "Laksana Simanjuntak",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "5",
        name: "Lala Nuraini",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "6",
        name: "Ina Nuraini",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "7",
        name: "Qori Pudjiastuti",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "8",
        name: "Kezia Mardhiyah",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "9",
        name: "Capa Damanik",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "10",
        name: "Karsa Maulana",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "11",
        name: "Joko Januar",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
      {
        id: "12",
        name: "Nova Wahyuni",
        contact: "0123-12312-1231",
        email: "customer@mail.com",
        address: "Jln Kembang Ayu 23, Jakarta",
      },
    ];
    setData(dummy);
    setTotalPage(5);
  };

  const createData = (param) => {
    console.log("Current POST Parameter:", param);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>PELANGGAN</span>
      </Header>
      <ButtonAddRow handler={() => setCreateModalShow(true)}>
        Tambah Pelanggan
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
      <CustomerCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
    </Container>
  );
}

export default Customer;
