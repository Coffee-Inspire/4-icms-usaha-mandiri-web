import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import ActionPopup from "../../components/ActionPopup";

import outgoingApi from "../../apis/outgoing";
import limitOptions from "../../options/tableLimitOptions.json";
import sortOptions from "./Options/sortOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Outgoing() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "nomor nota",
      bind: "receipt_no",
      align: "left",
    },
    {
      label: "tanggal nota",
      bind: "sold_date",
      type: "date",
    },
    {
      label: "total harga nota",
      bind: "total_sold",
      type: "currency",
      align: "right",
    },
    {
      label: "nama pelanggan",
      bind: "guest_name",
    },
    {
      label: "keterangan",
      bind: "note",
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
      ],
    },
  ];

  const getData = () => {
    setIsLoading(true);
    const params = {
      page,
      limit,
      sort,
      search,
    };
    outgoingApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        const normalized = res.data.data.rows.map(
          (i) =>
            (i = {
              ...i,
              guest_name: i.guest ? i.guest.guest_name : "",
            })
        );
        setData(normalized);
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

  useEffect(() => {
    getData();
  }, [limit, page, sort, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search, sort]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"penjualan"} isLoading={isLoading} />
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
        setSort={setSort}
        sort={sort}
        sortOptions={sortOptions}
        actionForDetail={triggerDetail}
      />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Outgoing;
