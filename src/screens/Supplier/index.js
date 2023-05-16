import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import SupplierCreateModal from "./SupplierCreateModal";
import SupplierUpdateModal from "./SupplierUpdateModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import ActionPopup from "../../components/ActionPopup";

import supplierApi from "../../apis/supplier";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function Supplier() {
  const [data, setData] = useState([]);
  const [subjectData, setSubjectData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "nama supplier",
      bind: "supplier_name",
      align: "left",
    },
    {
      label: "Telp pribadi",
      bind: "person_contact",
    },
    {
      label: "Telp kantor",
      bind: "company_contact",
    },
    {
      label: "e-mail",
      bind: "email",
    },
    {
      label: "alamat",
      bind: "address",
    },
    {
      label: "status",
      bind: "active_status",
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
    setIsLoading(true);
    const params = {
      page,
      limit: limit.value,
      filter,
      search,
    };
    // * Call API
    supplierApi
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
    setIsLoading(true);
    supplierApi
      .create(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menambahkan supplier",
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

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
  };

  const editData = (params) => {
    setIsLoading(true);
    supplierApi
      .update(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil memperbaharui supplier",
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

  const triggerDelete = (targetData) => {
    setSubjectData(targetData);
    setConfirmModalShow(true);
  };

  const deleteData = (targetId) => {
    setIsLoading(true);
    supplierApi
      .delete(targetId)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menghapus supplier",
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
  }, [limit, page, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"supplier"} isLoading={isLoading} />
      <ButtonAddRow
        handler={() => setCreateModalShow(true)}
        disabled={isLoading}
      >
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
        actionForEdit={triggerEdit}
        actionForDelete={triggerDelete}
      />
      <SupplierCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        handler={createData}
      />
      <SupplierUpdateModal
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
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default Supplier;
