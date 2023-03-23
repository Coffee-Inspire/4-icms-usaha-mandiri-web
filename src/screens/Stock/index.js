import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";

// import stocksAPI from "../../apis/stocksAPI";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Stock() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const columns = [
    {
      label: "Nama",
      bind: "name",
      align: "left",
    },
    {
      label: "Kategori",
      bind: "category",
    },
    {
      label: "Supplier",
      bind: "supplier",
    },
    {
      label: "Qty",
      bind: "qty",
      type: "qty",
      align: "right",
    },
    {
      label: "Modal",
      bind: "cost",
      type: "currency",
      align: "right",
    },
    {
      label: "HPP",
      bind: "hpp",
      type: "currency",
      align: "right",
    },
    {
      label: "Tgl Order",
      bind: "lastOrderDate",
    },
    {
      label: "Tgl Restock",
      bind: "lastRestockDate",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["edit", "delete", "detail"],
    },
  ];

  const getData = () => {
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };

    console.log("Current GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        name: "KUSEN 2S",
        lastOrderDate: "20/03/2023",
        qty: "50",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastRestockDate: "21/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "2",
        name: "KUSEN 3S",
        lastOrderDate: "20/03/2023",
        qty: "16",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastRestockDate: "21/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "3",
        name: "KUSEN 4S",
        lastOrderDate: "20/03/2023",
        qty: "21",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastRestockDate: "21/03/2023",
        supplier: "PT. Alco Jaya",
      },
      {
        id: "4",
        name: "SEMEN HITAM",
        lastOrderDate: "18/03/2023",
        qty: "62",
        cost: "35000",
        hpp: "55000",
        category: "PASIR",
        lastRestockDate: "18/03/2023",
        supplier: "PT. Alco Jaya",
      },
      {
        id: "5",
        name: "BATA MERAH",
        lastOrderDate: "18/03/2023",
        qty: "259",
        cost: "900",
        hpp: "1200",
        category: "BATU",
        lastRestockDate: "18/03/2023",
        supplier: "PT. Alco Jaya",
      },
      {
        id: "6",
        name: "PASIR TONGKANG DUM",
        lastOrderDate: "12/03/2023",
        qty: "7",
        cost: "130000",
        hpp: "180000",
        category: "PASIR",
        lastRestockDate: "14/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "7",
        name: "PIPA RUBEKA 4M",
        lastOrderDate: "19/03/2023",
        qty: "44",
        cost: "4000",
        hpp: "8000",
        category: "PIPA",
        lastRestockDate: "20/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "8",
        name: "PIPA RUBEKA 5M",
        lastOrderDate: "19/03/2023",
        qty: "23",
        cost: "4000",
        hpp: "8000",
        category: "PIPA",
        lastRestockDate: "20/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "9",
        name: "KABEL MERAH ROLL",
        lastOrderDate: "17/03/2023",
        qty: "12",
        cost: "90000",
        hpp: "120000",
        category: "KABEL",
        lastRestockDate: "17/03/2023",
        supplier: "PT. Sinar Abadi",
      },
    ];
    setData(dummy);
    setTotalPage(5);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>STOK BARANG</span>
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
      />
    </Container>
  );
}

export default Stock;
