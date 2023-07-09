import React from "react";
import moment from "moment";
import Select from "react-select";
import {
  Row,
  Col,
  Table,
  Form,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
import NoData from "../../assets/NoData.jpg";
import { takeIcon } from "../../helpers/iconMapper";
import Separator from "../Separator";
import convertIDR from "../../helpers/convertIDR";
import { useSelector } from "react-redux";

function Shows({
  columns,
  rows,
  limitOptions,
  setLimit,
  page,
  setPage,
  totalPage,
  setSearch,
  setSort,
  setFilter,
  filterOptions,
  sortOptions,
  sort,
  filter,
  actionForEdit,
  actionForDetail,
  actionForDelete,
}) {
  const { profileData } = useSelector((state) => state.profileReducer);
  let actionMethods = columns.find((col) => col.methods);
  actionMethods
    ? (actionMethods = actionMethods.methods)
    : (actionMethods = []);

  const sortPopover = (
    <Popover id="popover-basic" className="cst-max-h-md cst-y-scroll">
      <Popover.Body>
        <Form>
          <Row>
            {sortOptions &&
              sortOptions.map((s) => (
                <Col
                  key={s.label}
                  xs={12}
                  className="cst-clickable cst-hover-bg-respond py-1 my-1 d-flex justify-content-between align-items-center"
                  onClick={() => {
                    const me = document.getElementById(`sort-${s.label}`);
                    me.click();
                    document.body.click();
                  }}
                >
                  <label htmlFor={`sort-${s.label}`} className="cst-clickable">
                    {s.label}
                  </label>
                  <Form.Check
                    type={"radio"}
                    name="sort"
                    id={`sort-${s.label}`}
                    onChange={() => setSort(s)}
                    className="cst-clickable"
                    defaultChecked={sort.label === s.label}
                  />
                </Col>
              ))}
          </Row>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const filterPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Form>
          <Row>
            {filterOptions &&
              filterOptions.map((f) => (
                <Col
                  key={f.label}
                  xs={12}
                  className="cst-clickable cst-hover-bg-respond py-1 my-1 d-flex justify-content-between align-items-center"
                  onClick={() => {
                    const me = document.getElementById(`filter-${f.label}`);
                    me.click();
                    document.body.click();
                  }}
                >
                  <label
                    htmlFor={`filter-${f.label}`}
                    className="cst-clickable"
                  >
                    {f.label}
                  </label>
                  <Form.Check
                    type={"radio"}
                    name="filter"
                    id={`filter-${f.label}`}
                    onChange={() => setFilter(f)}
                    className="cst-clickable"
                    defaultChecked={filter.label === f.label}
                  />
                </Col>
              ))}
          </Row>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderColor: "rgba(255,155,255,0)",
      backgroundColor: "rgba(255,155,255,0)",
      cursor: "pointer",
    }),

    option: (base) => {
      return {
        ...base,
        cursor: "pointer",
      };
    },
    singleValue: (provided) => ({
      ...provided,

      color: "rgba(110,104,147,1)",
      width: "100%",
      marginRight: "10px",
      textAlign: "center",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(110,104,147,1)",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
  };

  const renderColumns = () => {
    return columns.map((col) => {
      const align = { textAlign: col.align || "center" };
      return (
        <th key={col.bind}>
          <div style={align} className="w-75 mx-auto">
            {col.label}
          </div>
        </th>
      );
    });
  };

  const renderCells = (record) => {
    const actionPopover = (
      <Popover id="popover-positioned-left">
        <Popover.Body className="p-1">
          {actionMethods.find(
            (x) =>
              x.action.toLowerCase() === "detail" &&
              (x.permission.includes("Global") ||
                x.permission.includes(profileData.role.role_name))
          ) && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForDetail(record.id);
              }}
            >
              <span>
                {actionMethods.find((x) => x.action.toLowerCase() === "detail")
                  .label || "Lihat Detail"}
              </span>
            </div>
          )}
          {actionMethods.find(
            (x) =>
              x.action.toLowerCase() === "edit" &&
              (x.permission.includes("Global") ||
                x.permission.includes(profileData.role.role_name))
          ) && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForEdit(record);
              }}
            >
              <span>
                {actionMethods.find((x) => x.action.toLowerCase() === "edit")
                  .label || "Ubah"}
              </span>
            </div>
          )}
          {actionMethods.find(
            (x) =>
              x.action.toLowerCase() === "delete" &&
              (x.permission.includes("Global") ||
                x.permission.includes(profileData.role.role_name))
          ) && (
            <>
              {actionMethods.length > 1 && <Separator className="mx-1 mt-2" />}
              <div
                className="cst-text-negative cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
                onClick={(e) => {
                  e.stopPropagation();
                  document.body.click();
                  actionForDelete(record);
                }}
              >
                <span>
                  {actionMethods.find(
                    (x) => x.action.toLowerCase() === "delete"
                  ).label || "Hapus"}
                </span>
              </div>
            </>
          )}

          {/* {actionMethods.includes("detail") && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForDetail(record.id);
              }}
            >
              <span>Lihat Detail</span>
            </div>
          )}

          {actionMethods.includes("edit") && (
            <div
              className="cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
              onClick={(e) => {
                e.stopPropagation();
                document.body.click();
                actionForEdit(record);
              }}
            >
              <span>Ubah</span>
            </div>
          )}
          {actionMethods.includes("delete") && (
            <>
              {actionMethods.length > 1 && <Separator className="mx-1 mt-2" />}
              <div
                className="cst-text-negative cst-clickable cst-hover-bg-respond my-1 py-1 px-2 rounded-2"
                onClick={(e) => {
                  e.stopPropagation();
                  document.body.click();
                  actionForDelete(record);
                }}
              >
                <span>Hapus</span>
              </div>
            </>
          )} */}
        </Popover.Body>
      </Popover>
    );

    const recognizedCell = (col) => {
      const value = record[col.bind];
      const customized = {
        textAlign: col.align || "center",
        textTransform: col.textTransform || "",
      };

      switch (col.type) {
        case "qty":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="w-75 mx-auto">
                <div className="d-flex flex-column">
                  <span>{`${value}`}</span>
                  <span className="text-secondary text-uppercase">{`${record.unit}`}</span>
                  {/* <span className="text-secondary">PCS</span> */}
                </div>
              </div>
            </td>
          );
        case "currency": {
          if (col.bind === "mutation") {
            return (
              <td style={customized} key={`${record.id}-${col.bind}`}>
                <div className="w-75 mx-auto">
                  <div className="d-flex flex-column">
                    <span
                      className={`${
                        record.type === "CR"
                          ? "cst-text-positive"
                          : "cst-text-negative"
                      }`}
                    >{`${convertIDR(value)}`}</span>
                    <span className="text-secondary">IDR</span>
                  </div>
                </div>
              </td>
            );
          } else
            return (
              <td style={customized} key={`${record.id}-${col.bind}`}>
                <div className="w-75 mx-auto">
                  <div className="d-flex flex-column">
                    <span>{`${convertIDR(value)}`}</span>
                    <span className="text-secondary">IDR</span>
                  </div>
                </div>
              </td>
            );
        }
        case "transactionType": {
          switch (value) {
            case "CR":
              return (
                <td key={`${record.id}-${col.bind}`}>
                  <div className="cst-bg-positive-light cst-chip-radius w-100 mx-auto text-center">
                    <span className="cst-text-positive">Kredit</span>
                  </div>
                </td>
              );

            case "DB":
              return (
                <td key={`${record.id}-${col.bind}`}>
                  <div className="cst-bg-negative-light cst-chip-radius w-100 mx-auto text-center">
                    <span className="cst-text-negative">Debit</span>
                  </div>
                </td>
              );
          }
        }
        case "activeStatus":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              {value ? (
                <div className="cst-bg-positive-light cst-chip-radius d-flex">
                  <span className="cst-text-positive w-100">Aktif</span>
                </div>
              ) : (
                <div className="cst-bg-negative-light cst-chip-radius d-flex">
                  <span className="cst-text-negative w-100">Non Aktif</span>
                </div>
              )}
            </td>
          );
        case "incomingStatus":
          return (
            <td
              style={customized}
              key={`${record.id}-${col.bind}`}
              className=""
            >
              {value ? (
                <span>
                  <div className="cst-bg-neutral-light cst-chip-radius cst-w-150 mx-auto cst-text-positive px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-positive mx-1" />
                      <span>Ditutup</span>
                    </div>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="cst-bg-neutral-lighter cst-chip-radius cst-w-150 mx-auto cst-text-warning px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-warning mx-1" />
                      <span>Berlangsung</span>
                    </div>
                  </div>
                </span>
              )}
            </td>
          );
        case "userStatus":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              {value ? (
                <span>
                  <div className="cst-bg-neutral-light cst-chip-radius cst-w-100 mx-auto cst-text-primary px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-primary mx-1" />
                      <span>Aktif</span>
                    </div>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="cst-bg-neutral-lighter cst-chip-radius cst-w-100 mx-auto cst-text-secondary px-2 ">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-neutral mx-1" />
                      <span>Nonaktif</span>
                    </div>
                  </div>
                </span>
              )}
            </td>
          );
        case "paidStatus":
          return (
            <td
              style={customized}
              key={`${record.id}-${col.bind}`}
              className=""
            >
              {value ? (
                <span>
                  <div className="cst-bg-neutral-light cst-chip-radius cst-w-150 mx-auto cst-text-positive px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-positive mx-1" />
                      <span>Selesai</span>
                    </div>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="cst-bg-neutral-lighter cst-chip-radius cst-w-150 mx-auto cst-text-negative px-2">
                    <div className="d-flex align-items-center">
                      <div className="cst-guide-negative mx-1" />
                      <span>Belum selesai</span>
                    </div>
                  </div>
                </span>
              )}
            </td>
          );
        case "stockStatus":
          const currentStockStatus = (key) => {
            return {
              OUT: {
                label: "Stok Habis",
                type: "negative",
              },
              LIMIT: {
                label: "Stok Terbatas",
                type: "warning",
              },
              READY: {
                label: "Stok Tersedia",
                type: "positive",
              },
            }[key];
          };
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div
                className={`cst-bg-${
                  currentStockStatus(value).type
                }-light cst-chip-radius d-flex`}
              >
                <span
                  className={`cst-text-${currentStockStatus(value).type} w-100`}
                >
                  {currentStockStatus(value).label}
                </span>
              </div>
            </td>
          );
        case "returnStatus":
          const currentReturnStatus = (key) => {
            return {
              null: {
                label: "Pengajuan",
                type: "warning",
              },
              true: {
                label: "Selesai",
                type: "positive",
              },
              false: {
                label: "Ditolak",
                type: "negative",
              },
            }[key];
          };
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div
                className={`cst-bg-${
                  currentReturnStatus(value).type
                }-light cst-chip-radius d-flex justify-content-center`}
              >
                <span className={`cst-text-${currentReturnStatus(value).type}`}>
                  {currentReturnStatus(value).label}
                </span>
              </div>
            </td>
          );
        case "date":
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="d-flex justify-content-center">
                <div className="w-75">
                  {value ? moment(value).format("DD-MM-YYYY") : "-"}
                </div>
              </div>
            </td>
          );
        default:
          return (
            <td style={customized} key={`${record.id}-${col.bind}`}>
              <div className="d-flex justify-content-center">
                <div className="w-75">{value || "-"}</div>
              </div>
            </td>
          );
      }
    };

    const unrecognizedCell = (col) => {
      const align = { textAlign: col.align || "center" };
      switch (col.type) {
        case "action":
          return (
            <td style={align} key={`${record.id}-${col.bind}`}>
              <OverlayTrigger
                trigger="click"
                placement="bottom-start"
                rootClose
                rootCloseEvent="click"
                overlay={actionPopover}
              >
                {takeIcon("menuVertical")}
              </OverlayTrigger>
            </td>
          );
        default:
          return <td key={`${record.id}-${col.bind}`}>-</td>;
      }
    };
    return columns.map((col) =>
      Object.keys(record).find((cell) => cell == col.bind)
        ? recognizedCell(col)
        : unrecognizedCell(col)
    );
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPage) setPage(page + 1);
  };

  return (
    <div className="cst-section-shadow rounded-3  my-4">
      <Row className="mx-0 py-3 ">
        <Col
          xs={12}
          lg={2}
          className="px-1 my-1 my-lg-0 d-flex justify-content-center"
        >
          <OverlayTrigger
            rootClose
            trigger="click"
            placement="bottom-start"
            overlay={sortPopover}
          >
            <Button
              variant="none"
              className="cst-btn-secondary d-flex justify-content-center align-items-center w-100"
            >
              <span>{takeIcon("sort")}</span>
              <span className="ms-1"> Urutan: {sort.label}</span>
            </Button>
          </OverlayTrigger>
        </Col>
        {filterOptions && (
          <Col
            xs={12}
            lg={2}
            className="px-1 my-1 my-lg-0 d-flex justify-content-center"
          >
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="bottom-start"
              overlay={filterPopover}
            >
              <Button
                variant="none"
                className="cst-btn-secondary d-flex justify-content-center align-items-center w-100"
              >
                <span>{takeIcon("filter")}</span>
                <span className="ms-1"> Tampilkan: {filter.label}</span>
              </Button>
            </OverlayTrigger>
          </Col>
        )}
        <Col xs={12} lg={4} className="px-1 mt-3 mt-lg-0">
          <Form.Group className=" position-relative">
            <Form.Control
              placeholder="Cari"
              onChange={(e) => setSearch(e.target.value)}
              className="cst-form-control cst-form-control-inner-padding"
            />
            <span className="cst-form-icon-float">{takeIcon("search")}</span>
          </Form.Group>
        </Col>
      </Row>
      {rows.length > 0 ? (
        <Table responsive className="cst-table">
          <thead>
            <tr>{renderColumns()}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>{renderCells(row)}</tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex flex-column">
          <img
            style={{ width: "200px", height: "200px" }}
            className="align-self-center"
            alt=""
            src={NoData}
          />
          <strong className="mt-2 mb-3 text-center cst-text-secondary">
            Data tidak ditemukan
          </strong>
        </div>
      )}
      <Row className="cst-heading-bg cst-pagination-toolbar cst-text-secondary mx-0 fw-bold d-flex justify-content-end">
        <Col
          xs={5}
          md={2}
          className="d-flex justify-content-end align-items-center py-1"
        >
          <small className="me-1">Baris maksimal:</small>
          <small>
            <Select
              options={limitOptions}
              styles={customStyles}
              defaultValue={limitOptions[0]}
              onChange={(a) => setLimit(a)}
            />
          </small>
        </Col>
        <Col
          xs={7}
          md={3}
          className="d-flex justify-content-end align-items-center py-1"
        >
          <small>
            Halaman {page} <span>dari {totalPage}</span>
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => handlePrevPage()}
          >
            {takeIcon("chevronLeft")}
          </small>
          <small
            className="cst-item px-2 mx-2 p-1"
            onClick={() => {
              handleNextPage();
            }}
          >
            {takeIcon("chevronRight")}
          </small>
        </Col>
      </Row>
    </div>
  );
}

export default Shows;
