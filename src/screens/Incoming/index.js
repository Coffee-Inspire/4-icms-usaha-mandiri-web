import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import IncomingUpdateModal from "./IncomingUpdateModal";
import ActionPopup from "../../components/ActionPopup";

import incomingApi from "../../apis/incoming.js";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

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

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "nomor pemesanan",
      bind: "incoming_no",
      align: "left",
    },
    {
      label: "tanggal pemesanan",
      bind: "purchase_date",
      type: "date",
    },
    {
      label: "total harga pemesanan",
      bind: "total_purchase",
      type: "currency",
      align: "right",
    },
    {
      label: "keterangan",
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
    const params = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    incomingApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        setData(res.data.data.rows);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const triggerDetail = (dataId) => {
    navigate(`detail/${dataId}`);
  };

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"pembelian"} isLoading={isLoading} />
      <ButtonAddRow handler={() => navigate("create")} disabled={isLoading}>
        Pesan Barang
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
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Incoming;
