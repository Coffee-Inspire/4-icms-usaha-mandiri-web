import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import UserCreateModal from "./UserCreateModal";
import UserUpdateModal from "./UserUpdateModal";

import userApi from "../../apis/user";
import roleApi from "../../apis/role";
import selections from "../../helpers/selections";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

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
      label: "Telp",
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
      label: "status",
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
      .then((res) => setRoleOptions(selections(res.data.data, "role_name")))
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
        const dataLength = res.data.dataLength;
        const normalized = res.data.data.map(
          (i) =>
            (i = {
              ...i,
              role_name: i.role.role_name,
            })
        );
        setData(normalized);
        setTotalPage(Math.ceil(dataLength / params.limit));
      })
      .finally(setIsLoading(false));
  };

  const createData = (param) => {
    setIsLoading(true);
    userApi
      .create(param)
      .then(() => {
        getData();
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
      .then(() => getData())
      .finally(setIsLoading(false));
  };

  const triggerDelete = (targetId) => {
    setIsLoading(true);
    userApi
      .delete(targetId)
      .then(() => getData())
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    getData();
    getRoleSource();
  }, [limit, page, filter, search]);

  return (
    <Container fluid className="p-4">
      <Header>
        <span>USERS</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
      <ButtonAddRow
        handler={() => setCreateModalShow(true)}
        disabled={isLoading}
      >
        Tambah User
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
    </Container>
  );
}

export default User;
