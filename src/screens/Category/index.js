import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import CategoryCreateModa from "./CategoryCreateModal";
import CategoryUpdateModal from "./CategoryUpdateModal";

import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function Category() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [subjectData, setSubjectData] = useState({});
  const handleCloseUpdateModal = () => setUpdateModalShow(false);

  const columns = [
    {
      label: "Nama",
      bind: "name",
      align: "left",
      textTransform: "capitalize",
    },
    {
      label: "Deskripsi",
      bind: "note",
      align: "left",
      textTransform: "capitalize",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["delete", "edit"],
    },
  ];

  const getData = () => {
    setIsLoading(true);
    const param = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    console.log("USERS GET Parameter:", param);
    // * Call API

    // ? For Development
    const dummy = [
      {
        id: "1",
        name: "kayu",
        note: "lorem ipsum",
      },
      {
        id: "2",
        name: "pasir dan semen",
        note: "lorem ipsum",
      },
      {
        id: "3",
        name: "batu",
        note: "lorem ipsum",
      },
      {
        id: "4",
        name: "listrik",
        note: "lorem ipsum",
      },
      {
        id: "5",
        name: "cat",
        note: "lorem ipsum",
      },
    ];
    setData(dummy);
    setTotalPage(5);
    setIsLoading(false);
  };

  const triggerDelete = (dataId) => {
    console.log("Delete =>", dataId);
  };

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
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
        <span>KATEGORI</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <ButtonAddRow
        handler={() => setCreateModalShow(true)}
        disabled={isLoading}
      >
        Tambah Kategori
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
        actionForEdit={triggerEdit}
        actionForDelete={triggerDelete}
      />
      <CategoryCreateModa
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
      <CategoryUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        subjectData={subjectData}
      />
    </Container>
  );
}

export default Category;
