import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import SupplierCreateModal from "./SupplierCreateModal";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Supplier() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const columns = [
    {
      label: "nama",
      bind: "name",
      align: "left",
    },
    {
      label: "Telp pribadi",
      bind: "personContact",
    },
    {
      label: "Telp kantor",
      bind: "companyContact",
    },
    {
      label: "email",
      bind: "email",
    },
    {
      label: "alamat",
      bind: "address",
    },
    {
      label: "status",
      bind: "activeStatus",
      type: "activeStatus",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["edit", "delete"],
    },
  ];

  const getData = () => {
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    console.log("SUPPLIER GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        name: "PT. Stanton Distributor",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "2",
        name: "PT. Jaya Abadi",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "3",
        name: "PT. Alco Jaya",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "4",
        name: "PT. PT. Sinar Abadi",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "5",
        name: "CV. Cahaya Bangunan",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: false,
      },
      {
        id: "6",
        name: "Sinar Timur",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: false,
      },
      {
        id: "7",
        name: "Mitra Jaya Bangunan",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "8",
        name: "Rubeka Nasional",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: true,
      },
      {
        id: "9",
        name: "CV. Terang Indah",
        personContact: "0123-12312-1231",
        companyContact: "1998-12987-0761",
        email: "supply@mail.com",
        address: "Jln Kembang Ayu 23, Bekasi",
        activeStatus: false,
      },
    ];
    setData(dummy);
    setTotalPage(5);
  };

  const createData = (param) => {
    console.log("Current POST Parameter:", param);
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>SUPPLIER</span>
      </Header>
      <ButtonAddRow handler={() => setCreateModalShow(true)}>
        Tambah Supplier
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
      />
      <SupplierCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
    </Container>
  );
}

export default Supplier;
