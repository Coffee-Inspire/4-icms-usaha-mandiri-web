import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import ActionPopup from "../../components/ActionPopup";

import returnApi from "../../apis/return";
import filterOptions from "./Options/filterOptions.json";
import limitOptions from "../../options/tableLimitOptions.json";
import sortOptions from "./Options/sortOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Return() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "nomor nota penjualan",
      bind: "receipt_no",
      align: "left",
    },
    {
      label: "tgl. nota",
      bind: "outgoing_date",
      type: "date",
    },

    {
      label: "nama barang",
      bind: "stock_name",
      align: "left",
    },
    {
      label: "tgl. pengajuan retur",
      bind: "return_date",
      type: "date",
    },
    {
      label: "jumlah pengajuan retur",
      type: "qty",
      bind: "qty",
      align: "left",
    },
    {
      label: "status",
      type: "returnStatus",
      bind: "status",
      align: "center",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: [
        {
          action: "edit",
          permission: ["Global"],
          label: "Setujui",
        },
        {
          action: "delete",
          permission: ["Global"],
          label: "Tolak",
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
    returnApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        const normalized = res.data.data.rows.map(
          (i) =>
            (i = {
              ...i,
              receipt_no: i.outgoing_detail
                ? i.outgoing_detail.outgoing
                  ? i.outgoing_detail.outgoing.receipt_no
                  : "-"
                : "-",
              outgoing_date: i.outgoing_detail
                ? i.outgoing_detail.outgoing
                  ? i.outgoing_detail.outgoing.sold_date
                  : "-"
                : "-",
              stock_name: i.outgoing_detail
                ? i.outgoing_detail.stock
                  ? i.outgoing_detail.stock.item_name
                  : "-"
                : "-",
              unit: i.outgoing_detail ? i.outgoing_detail.unit : "-",
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

  const updateData = (updateParams) => {
    setIsLoading(true);
    returnApi
      .update(updateParams)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil memperbaharui status retur barang",
        });
        setActionAlertShow(true);
        getData();
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(setIsLoading(false));
  };

  const validateStatus = (targetData) => {
    if (targetData.status !== null) {
      setActionRes({
        status: "400",
        message:
          "Tidak dapat merubah status yang telah melewati tahap pengajuan",
      });
      setActionAlertShow(true);
      return false;
    }
    return true;
  };

  const handleApprove = (targetData) => {
    if (!validateStatus(targetData)) return;
    const params = {
      id: targetData.id,
      outgoingDetailId: targetData.outgoing_detail.id,
      status: true,
    };
    updateData(params);
  };

  const handleReject = (targetData) => {
    if (!validateStatus(targetData)) return;
    const params = {
      id: targetData.id,
      outgoingDetailId: targetData.outgoing_detail.id,
      status: false,
    };
    updateData(params);
  };

  useEffect(() => {
    getData();
  }, [limit, page, sort, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search, sort, filter]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"retur penjualan"} isLoading={isLoading} />
      <ButtonAddRow handler={() => navigate("create")} disabled={isLoading}>
        Buat Baru
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
        sortOptions={sortOptions}
        filterOptions={filterOptions}
        actionForEdit={handleApprove}
        actionForDelete={handleReject}
      />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Return;
