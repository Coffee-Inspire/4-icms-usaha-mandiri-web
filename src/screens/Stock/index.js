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
    },
    {
      label: "Cost",
      bind: "cost",
    },
    {
      label: "Price",
      bind: "price",
    },
    {
      label: "Last Order",
      bind: "lastOrder",
    },
    {
      label: "Last Restock",
      bind: "lastRestock",
    },
  ];

  useEffect(() => {
    // * For Development
    const dummy = [
      {
        id: "1",
        name: "KUSEN 2S",
        qty: "50",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastOrderDate: "20/03/2023",
        lastRestockDate: "21/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "2",
        name: "KUSEN 3S",
        qty: "16",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastOrderDate: "20/03/2023",
        lastRestockDate: "21/03/2023",
        supplier: "PT. Sinar Abadi",
      },
      {
        id: "3",
        name: "KUSEN 4S",
        qty: "21",
        cost: "30000",
        hpp: "50000",
        category: "KAYU",
        lastOrderDate: "20/03/2023",
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
