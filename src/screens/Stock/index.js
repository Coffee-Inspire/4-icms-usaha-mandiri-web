import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import StockUpdateModal from "./StockUpdateModal";
import ActionPopup from "../../components/ActionPopup";

import stockApi from "../../apis/stock";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Stock() {
  const { profileData } = useSelector((state) => state.profileReducer);

  const [data, setData] = useState([]);
  const [subjectData, setSubjectData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [updateModalShow, setUpdateModalShow] = useState(false);
  const handleCloseUpdateModal = () => setUpdateModalShow(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "nama barang",
      bind: "item_name",
      align: "left",
    },
    {
      label: "kategori",
      bind: "category_name",
    },
    {
      label: "supplier",
      bind: "supplier_name",
    },
    {
      label: "jumlah stok",
      bind: "qty",
      type: "qty",
      align: "right",
    },
    {
      label: "harga modal",
      bind: "purchase_price",
      type: "currency",
      align: "right",
    },
    {
      label: "harga jual",
      bind: "price",
      type: "currency",
      align: "right",
    },
    {
      label: "Tgl Order",
      bind: "last_order_date",
      type: "date",
    },
    {
      label: "Tgl Restock",
      bind: "last_restock_date",
      type: "date",
    },
    {
      label: "Status",
      bind: "status",
      type: "stockStatus",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: [
        {
          action: "edit",
          permission: ["Administrator"],
        },
      ],
    },
  ];

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
  };

  const editData = (params) => {
    setIsLoading(true);
    stockApi
      .update(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil memperbaharui stok",
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

  const getData = () => {
    setIsLoading(true);
    const params = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    // * Call API
    stockApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        const normalized = res.data.data.rows.map(
          (i) =>
            (i = {
              ...i,
              category_name: i.item_category?.category_name,
              supplier_name: i.supplier?.supplier_name,
              status: i.qty === 0 ? "OUT" : i.qty <= 80 ? "LIMIT" : "READY",
            })
        );
        setData(normalized);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"stok barang"} isLoading={isLoading} />
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
        actionForDelete={null}
      />
      <StockUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        handler={editData}
        subject={subjectData}
      />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Stock;
