import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Shows from "../../components/Shows";

function Stock() {
  const [data, setData] = useState([]);
  // const columns = [
  //   "Name",
  //   "Category",
  //   "Qty",
  //   "Supplier",
  //   "Cost",
  //   "Price",
  //   "Last Order",
  //   "Last Restock",
  // ];

  const columns = [
    {
      label: "Name",
      bind: "name",
      align: "left",
    },
    {
      label: "Category",
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
      label: "Cost",
      bind: "cost",
      type: "currency",
      align: "right",
    },
    {
      label: "Price",
      bind: "hpp",
      type: "currency",
      align: "right",
    },
    {
      label: "Last Order",
      bind: "lastOrderDate",
    },
    {
      label: "Last Restock",
      bind: "lastRestockDate",
    },
    {
      label: "Action",
      bind: "action",
      type: "action",
      method: ["edit", "delete"],
    },
  ];

  useEffect(() => {
    // * For Development
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
    ];

    setData(dummy);
  }, []);

  return (
    <Container fluid className="p-4">
      <h2 className="cst-letter-spacing cst-text-secondary cst-border-bottom fw-bold pb-3 ">
        STOK BARANG
      </h2>
      {/* <Button
        variant="none"
        className="cst-btn-primary cst-btn-add fw-bold px-4 py-2"
      >
        Tambah Stok
      </Button> */}
      <Shows columns={columns} rows={data} />
    </Container>
  );
}

export default Stock;
