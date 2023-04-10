import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Outgoing() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const columns = [
    {
      label: "Nota",
      bind: "receiptNumber",
      align: "left",
    },
    {
      label: "tgl nota",
      bind: "soldDate",
    },
    {
      label: "harga nota",
      bind: "totalSold",
      type: "currency",
      align: "right",
    },
    {
      label: "customer",
      bind: "guestName",
    },
    {
      label: "catatan",
      bind: "note",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["detail"],
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
    console.log("OUTGOING GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        receiptNumber: "OUT/0323/1",
        soldDate: "24/03/2023",
        totalSold: "70000",
        guestName: "customer 1",
        note: "Lorem Ipsum",
      },
      {
        id: "2",
        receiptNumber: "OUT/0323/2",
        soldDate: "24/03/2023",
        totalSold: "120000",
        guestName: "cusomer 1",
        note: "Lorem Ipsum",
      },
      {
        id: "3",
        receiptNumber: "OUT/0323/3",
        soldDate: "24/03/2023",
        totalSold: "160000",
        guestName: "cusomer 2",
        note: "Lorem Ipsum",
      },
      {
        id: "4",
        receiptNumber: "OUT/0323/4",
        soldDate: "24/03/2023",
        totalSold: "55000",
        guestName: "cusomer 3",
        note: "Lorem Ipsum",
      },
    ];
    setData(dummy);
    setTotalPage(5);
    setIsLoading(false);
  };

  const createData = (param) => {
    console.log("OUTGOING POST Parameter:", param);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>BARANG TERJUAL</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <ButtonAddRow handler={() => navigate("create")} disabled={isLoading}>
        Kasir
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

export default Outgoing;
