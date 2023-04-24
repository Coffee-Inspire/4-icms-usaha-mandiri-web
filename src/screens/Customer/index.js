import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import CustomerUpdateModal from "./CustomerUpdateModal";
import ConfirmationModal from "../../components/ConfirmationModal";

import customerApi from "../../apis/customer";
import limitOptions from "../../options/tableLimitOptions.json";
import CustomerCreateModal from "./CustomerCreateModal";
import { takeIcon } from "../../helpers/iconMapper";

function Customer() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState({});

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [updateModalShow, setUpdateModalShow] = useState(false);
  const handleCloseUpdateModal = () => setUpdateModalShow(false);

  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const columns = [
    {
      label: "Nama",
      bind: "guest_name",
      align: "left",
      textTransform: "capitalize",
    },
    {
      label: "Telp",
      bind: "contact",
    },
    {
      label: "Email",
      bind: "email",
    },
    {
      label: "Alamat",
      bind: "address",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["edit", "delete"],
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
    customerApi
      .getAll(params)
      .then((res) => {
        const dataLength = res.data.data.count;
        setData(res.data.data.rows);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .finally(() => setIsLoading(false));
  };

  const createData = (params) => {
    setIsLoading(true);
    customerApi
      .create(params)
      .then(() => {
        getData();
      })
      .finally(() => setIsLoading(false));
  };

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
  };

  const editData = (params) => {
    setIsLoading(true);
    customerApi
      .update(params)
      .then(() => getData())
      .finally(setIsLoading(false));
  };

  const triggerDelete = (targetData) => {
    setSubjectData(targetData);
    setConfirmModalShow(true);
  };

  const deleteData = (targetId) => {
    setIsLoading(true);
    customerApi
      .delete(targetId)
      .then(() => getData())
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    getData();
  }, [limit, page, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>PELANGGAN</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <ButtonAddRow
        handler={() => setCreateModalShow(true)}
        disabled={isLoading}
      >
        Tambah Pelanggan
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
      <CustomerCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
      <CustomerUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        handler={editData}
        subjectData={subjectData}
      />
      <ConfirmationModal
        show={confirmModalShow}
        close={() => setConfirmModalShow(false)}
        handler={deleteData}
        subjectData={subjectData}
      />
    </Container>
  );
}

export default Customer;
