import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import UserCreateModal from "./UserCreateModal";
import UserUpdateModal from "./UserUpdateModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import ActionPopup from "../../components/ActionPopup";

import userApi from "../../apis/user";
import roleApi from "../../apis/role";
import selections from "../../helpers/selections";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function User() {
  const [data, setData] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [limit, setLimit] = useState(limitOptions[0]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const [createModalShow, setCreateModalShow] = useState(false);
  const handleCloseCreateModal = () => setCreateModalShow(false);

  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [subjectData, setSubjectData] = useState({});
  const handleCloseUpdateModal = () => setUpdateModalShow(false);

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const columns = [
    {
      label: "username",
      bind: "username",
      align: "left",
    },
    {
      label: "nama lengkap",
      bind: "fullname",
      align: "left",
      textTransform: "capitalize",
    },
    {
      label: "role",
      bind: "role_name",
      align: "left",
    },
    {
      label: "telepon",
      bind: "contact",
    },
    {
      label: "Alamat",
      bind: "address",
      align: "left",
    },
    {
      label: "e-mail",
      bind: "email",
    },
    {
      label: "status akun",
      bind: "active_status",
      type: "userStatus",
    },
    {
      label: takeIcon("menuVertical"),
      bind: "action",
      type: "action",
      methods: ["delete", "edit"],
    },
  ];

  const getRoleSource = () => {
    setIsLoading(true);
    roleApi
      .getAll()
      .then((res) => {
        if (res.status !== 200) throw res;
        setRoleOptions(selections(res.data.data.rows, "role_name"));
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
    userApi
      .getAll(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const dataLength = res.data.data.count;
        const normalized = res.data.data.rows.map(
          (i) =>
            (i = {
              ...i,
              role_name: i.role.role_name,
            })
        );
        setData(normalized);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(setIsLoading(false));
  };

  const createData = (param) => {
    setIsLoading(true);
    userApi
      .create(param)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menambahkan pengguna",
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

  const triggerEdit = (targetData) => {
    setSubjectData(targetData);
    setUpdateModalShow(true);
  };

  const updateData = (updateParams) => {
    setIsLoading(true);
    userApi
      .update(updateParams)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil memperbaharui pengguna",
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
    userApi
      .delete(targetId)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil menghapus pengguna",
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
    getRoleSource();
  }, [limit, page, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [limit, search]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"daftar pengguna"} isLoading={isLoading} />
      <ButtonAddRow
        handler={() => setCreateModalShow(true)}
        disabled={isLoading}
      >
        Tambah Pengguna
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
      <UserCreateModal
        show={createModalShow}
        close={handleCloseCreateModal}
        roleOptions={roleOptions}
        handler={createData}
      />
      <UserUpdateModal
        show={updateModalShow}
        close={handleCloseUpdateModal}
        subjectData={subjectData}
        handler={updateData}
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

export default User;
