import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import IncomingUpdateModal from "./IncomingUpdateModal";

function Incoming() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [subjectData, setSubjectData] = useState({});
  const handleCloseUpdateModal = () => setUpdateModalShow(false);

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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const triggerDetail = (dataId) => {
    navigate(`detail/${dataId}`);
  };

  const triggerEdit = (targetData) => {
    setSubjectData(targetData.id);
    setUpdateModalShow(true);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>BARANG MASUK</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <ButtonAddRow handler={() => navigate("create")} disabled={isLoading}>
        Order Barang
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
        actionForEdit={triggerEdit}
        actionForDetail={triggerDetail}
      />
      {}
      <IncomingUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        subjectData={subjectData}
        // handler={}
      />
    </Container>
  );
}

export default Incoming;
