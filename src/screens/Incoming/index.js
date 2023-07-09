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
import filterOptions from "./Options/filterOptions.json";
import sortOptions from "./Options/sortOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Incoming() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");

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
      label: "tgl. pemesanan",
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
      label: "status penerimaan",
      bind: "status",
      type: "incomingStatus",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: [
        {
          action: "detail",
          permission: ["Global"],
        },
        {
          action: "edit",
          label: "Terima Barang",
          permission: ["Global"],
        },
      ],
    },
  ];

  const getData = () => {
    setIsLoading(true);
    const params = {
      page,
      limit,
      sort,
      filter,
      search,
    };
    incomingApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        setData(res.data.data.rows);
        setTotalPage(Math.ceil(dataLength / params.limit.value));
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
  }, [limit, page, filter, sort, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search, filter, sort]);

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
        setSort={setSort}
        filter={filter}
        sort={sort}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        actionForEdit={triggerEdit}
        actionForDetail={triggerDetail}
      />
      {}
      <IncomingUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        subjectData={subjectData}
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
