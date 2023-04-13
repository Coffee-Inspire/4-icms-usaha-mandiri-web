import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

import Shows from "../../components/Shows";
import Header from "../../components/Header";
import ButtonAddRow from "../../components/ButtonAddRow";
import UserCreateModal from "./UserCreateModal";
import UserUpdateModal from "./UserUpdateModal";

import userApi from "../../apis/user";
import limitOptions from "../../options/tableLimitOptions.json";
import { takeIcon } from "../../helpers/iconMapper";

function User() {
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

  const getData = () => {
    setIsLoading(true);
    const params = {
      page,
      limit: limit.value,
      filter,
      search,
    };

    // * Call API
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
    // ? For Development
    // // const dummy = [
    //   {
    //     id: "1",
    //     userName: "ricky",
    //     fullName: "ricky wijaya",
    //     role: {
    //       id: "11",
    //       name: "administrator",
    //     },
    //     activeStatus: true,
    //     email: "ricky@gmail.com",
    //     contact: "0822 8356 9190",
    //     address: "Jln Bekasi 29443",
    //   },
    //   {
    //     id: "2",
    //     userName: "effendy",
    //     fullName: "effendy tan",
    //     role: {
    //       id: "11",
    //       name: "administrator",
    //     },
    //     activeStatus: true,
    //     email: "effendy@gmail.com",
    //     contact: "0822 8356 9190",
    //     address: "Jln Bekasi 29443",
    //   },
    //   {
    //     id: "3",
    //     userName: "jessica",
    //     fullName: "jessica tan",
    //     role: {
    //       id: "11",
    //       name: "administrator",
    //     },
    //     activeStatus: false,
    //     email: "jessica@gmail.com",
    //     contact: "0822 8356 9190",
    //     address: "Jln Bekasi 29443",
    //   },
    //   {
    //     id: "4",
    //     userName: "johnny",
    //     fullName: "johnny ng",
    //     role: {
    //       id: "22",
    //       name: "normal",
    //     },
    //     activeStatus: true,
    //     email: "johnny@gmail.com",
    //     contact: "0822 8356 9190",
    //     address: "Tangerang 28761",
    //   },
    // // ];
    // // setData(dummy);
    // // setTotalPage(5);
  };

  const updateData = (updateParams) => {
    setIsLoading(true);
    userApi
      .update(updateParams)
      .then(() => getData())
      .finally(setIsLoading(false));
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
