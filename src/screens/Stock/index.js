import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";

import stockApi from "../../apis/stock";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Stock() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const columns = [
    {
      label: "Nama",
      bind: "item_name",
      align: "left",
    },
    {
      label: "Kategori",
      bind: "category_name",
    },
    {
      label: "Supplier",
      bind: "supplier_name",
    },
    {
      label: "Qty",
      bind: "qty",
      type: "qty",
      align: "right",
    },
    {
      label: "Modal",
      bind: "purchase_price",
      type: "currency",
      align: "right",
    },
    {
      label: "HPP",
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
      methods: ["edit", "delete", "detail"],
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
    // * Call API
    stockApi
      .getAll(params)
      .then((res) => {
        const dataLength = res.data.data.count;
        const normalized = res.data.data.rows.map(
          (i) =>
            (i = {
              ...i,
              category_name: i.Item_category.category_name,
              supplier_name: i.supplier.supplier_name,
              status: i.qty === 0 ? "OUT" : i.qty <= 80 ? "LIMIT" : "READY",
            })
        );
        setData(normalized);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>STOK BARANG </span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
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
        actionForEdit={null}
        actionForDelete={null}
      />
    </Container>
  );
}

export default Stock;
