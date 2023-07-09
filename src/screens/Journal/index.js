import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import TransactionCreateModal from "./TransactionCreateModal";
import ActionPopup from "../../components/ActionPopup";

import journalApi from "../../apis/journal";
import limitOptions from "../../options/tableLimitOptions.json";
import sortOptions from "./Options/sortOptions.json";
import filterOptions from "./Options/filterOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Journal() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState(filterOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "tgl. pembuatan",
      bind: "transaction_date",
      type: "date",
    },
    {
      label: "tipe",
      bind: "type",
      align: "center",
      type: "transactionType",
    },
    {
      label: "lampiran internal",
      bind: "reference_id",
      align: "left",
    },
    {
      label: "keterangan",
      bind: "note",
      align: "left",
    },
    {
      label: "tgl. jatuh tempo",
      bind: "deadline_date",
      type: "date",
    },
    {
      label: "status pembayaran",
      bind: "paid_status",
      align: "center",
      type: "paidStatus",
    },
    {
      label: "tgl. pembayaran",
      bind: "paid_date",
      type: "date",
    },
    {
      label: "nominal",
      bind: "mutation",
      type: "currency",
      align: "right",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: [
        {
          action: "edit",
          permission: ["Global"],
          label: "Selesaikan Pembayaran",
        },
      ],
    },
  ];

  const getData = () => {
    setIsLoading(true);
    const params = {
      page,
      limit,
      filter,
      sort,
      search,
    };
    journalApi
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

  const createData = (params) => {
    setIsLoading(true);
    journalApi
      .create(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menambahkan transaksi",
        });
        setActionAlertShow(true);
        getData();
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const editData = (subject) => {
    setIsLoading(true);
    const params = {
      id: subject.id,
      paid_status: true,
    };
    journalApi
      .updateStatus(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menyelesaikan pembayaran",
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

  useEffect(() => {
    getData();
  }, [limit, page, sort, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search, sort, filter]);

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
        setSort={setSort}
        filter={filter}
        sort={sort}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        actionForEdit={editData}
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
