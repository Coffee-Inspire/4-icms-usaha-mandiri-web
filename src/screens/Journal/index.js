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
import convertIDR from "../../helpers/convertIDR";
import errorReader from "../../helpers/errorReader";

function Journal() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState(filterOptions[0].value);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "tanggal",
      bind: "transaction_date",
      type: "date",
    },
    {
      label: "lampiran transaksi",
      bind: "reference_id",
      align: "left",
    },
    {
      label: "keterangan",
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
    const params = {
      page,
      limit: limit.value,
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
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const createData = (params) => {
    params = {
      ...params,
      mutation: parseInt(params.mutation),
    };
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
        setFilter={setFilter}
        setSort={setSort}
        filter={filter}
        sort={sort}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
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
