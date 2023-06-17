import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import moment from "moment";

import Header from "../../components/Header";
import Subheader from "../../components/Subheader";
import IsExistAlert from "./Alerts/IsExistAlert";
import ActionPopup from "../../components/ActionPopup";

import incomingApi from "../../apis/incoming";
import stockApi from "../../apis/stock";
import categoryApi from "../../apis/category";
import supplierApi from "../../apis/supplier";
import convertIDR from "../../helpers/convertIDR";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function IncomingCreate() {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [dlDate, setDlDate] = useState("");
  const [errorDate, setErrorDate] = useState(false);

  const [isExistAlertShow, setIsExistAlertShow] = useState(false);
  const [rejected, setRejected] = useState("");

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const schema = Joi.object({
    item_name: Joi.object().required().messages({
      "string.empty": `Nama barang tidak boleh kosong`,
      "any.required": `Nama barang tidak boleh kosong`,
    }),
    supplier_id: Joi.object().required().messages({
      "string.empty": `Nama supplier tidak boleh kosong`,
      "any.required": `Nama supplier tidak boleh kosong`,
    }),
    category_id: Joi.object().required().messages({
      "string.empty": `Kategori tidak boleh kosong`,
      "any.required": `Kategori tidak boleh kosong`,
    }),
    purchase_price: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Harga beli tidak boleh kosong`,
        "any.required": `Harga beli tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
    price: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Harga jual tidak boleh kosong`,
        "any.required": `Harga jual tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
    purchase_qty: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Qty tidak boleh kosong`,
        "any.required": `Qty tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
    unit: Joi.string().default("pcs").messages({
      "string.empty": `Unit tidak boleh kosong`,
      "any.required": `Unit tidak boleh kosong`,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const resetForm = () => {
    const fields = [...schema._ids._byKey.keys()];
    let defaultValues = {};
    fields.map((i) => (defaultValues[i] = ""));
    reset(defaultValues);
  };

  const getCategorySource = () => {
    setIsLoading(true);
    categoryApi
      .getDataSource()
      .then((res) => {
        if (res.status !== 200) throw res;
        setCategoryOptions(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };
  const getSupplierSource = () => {
    setIsLoading(true);
    supplierApi
      .getDataSource()
      .then((res) => {
        if (res.status !== 200) throw res;
        setSupplierOptions(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };
  const getStockSource = () => {
    setIsLoading(true);
    stockApi
      .getDataSource()
      .then((res) => {
        if (res.status !== 200) throw res;
        setStockOptions(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data) => {
    // TODO Checking whitespace
    // handler(data);
    // handleClose();
    data.total_amount = data.purchase_price * data.purchase_qty;
    // TODO Checking if item name already exist in dataList
    const isExist = dataList.find(
      (i) => i.item_name.value === data.item_name.value
    );
    if (isExist) {
      setRejected(data.item_name.label);
      setIsExistAlertShow(true);
      return;
    }
    setIsExistAlertShow(false);
    setDataList([...dataList, data]);
  };

  const createData = () => {
    if (!dlDate) {
      setErrorDate(true);
      return;
    }
    setErrorDate(false);
    setIsLoading(true);
    const newDataList = dataList.map(
      (i) =>
        (i = {
          ...i,
          item_name: i.item_name.value,
          supplier_id: i.supplier_id.value,
          category_id: i.category_id.value,
        })
    );
    const params = {
      incoming: {
        total_purchase: totalPrice,
        note: note,
        deadline_date: dlDate,
      },
      details: newDataList,
    };
    incomingApi
      .create(params)
      .then((res) => {
        console.log("Incoming POST Callback => ", res);
        if (res.status !== 200) throw res;
        setActionRes({
          status: res.status,
          message: "Berhasil membuat pesanan",
        });
        setActionAlertShow(true);
        // TODO Clear All Form
        resetForm();
        dataList([]);
        // TODO Show decision modal, options: open new tab to whatsapp, stay on page, view detail
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // * Computed total price
    const s = dataList.reduce((a, b) => a + b.total_amount, 0);
    setTotalPrice(s);
  }, [dataList]);

  useEffect(() => {
    getStockSource();
    getCategorySource();
    getSupplierSource();
  }, []);

  return (
    <Container fluid className="p-4">
      <Header useBack headerLabel={"pemesanan barang"} isLoading={isLoading} />
      <Row className="mx-0">
        <Col xs={12} md={5} className="cst-border-right py-3">
          <Subheader>Input Data Barang</Subheader>

          <IsExistAlert
            show={isExistAlertShow}
            setShow={setIsExistAlertShow}
            rejected={rejected}
          />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} md={8} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Nama Barang<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Controller
                    name="item_name"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={stockOptions}
                        isDisabled={isLoading}
                        placeholder="Pilih atau buat barang"
                      />
                    )}
                  />
                  <small className="cst-text-negative">
                    {errors.item_name?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={4} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Kategori<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={categoryOptions}
                        placeholder="Kategori"
                        isDisabled={isLoading}
                      />
                    )}
                  />
                  <small className="cst-text-negative ">
                    {errors.category_id?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={12} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Pilih Supplier<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Controller
                    name="supplier_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={supplierOptions}
                        placeholder="Pilih supplier"
                        isDisabled={isLoading}
                      />
                    )}
                  />
                  <small className="cst-text-negative ">
                    {errors.supplier_id?.message}
                  </small>
                </Form.Group>
              </Col>

              <Col xs={6} md={6} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Qty<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    className={`cst-form-control ${
                      errors.purchase_qty && "cst-form-invalid"
                    }`}
                    {...register("purchase_qty")}
                    placeholder="Qty"
                  />
                  <small className="cst-text-negative ">
                    {errors.purchase_qty?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={6} md={6} className="pb-2">
                <Form.Group>
                  <Form.Label>Unit</Form.Label>

                  <Controller
                    control={control}
                    name="unit"
                    render={({ field }) => (
                      <Form.Group {...field} className="d-flex">
                        <div className="d-flex me-3">
                          <Form.Check
                            type="radio"
                            name="unit"
                            id="unitPcs"
                            value="pcs"
                            className="cst-clickable me-2"
                            defaultChecked
                          />
                          <Form.Label
                            htmlFor="unitPcs"
                            className="cst-clickable"
                          >
                            Pcs
                          </Form.Label>
                        </div>
                        <div className="cst-clickable d-flex me-3">
                          <Form.Check
                            type="radio"
                            name="unit"
                            id="unitBox"
                            value="box"
                            className="cst-clickable me-2"
                          />
                          <Form.Label
                            htmlFor="unitBox"
                            className="cst-clickable"
                          >
                            Box
                          </Form.Label>
                        </div>
                        <div className="cst-clickable d-flex me-3">
                          <Form.Check
                            type="radio"
                            name="unit"
                            id="unitSack"
                            value="sack"
                            className="cst-clickable me-2"
                          />
                          <Form.Label
                            htmlFor="unitSack"
                            className="cst-clickable"
                          >
                            Sack
                          </Form.Label>
                        </div>
                      </Form.Group>
                    )}
                  />
                  <small className="cst-text-negative ">
                    {errors.unit?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Harga Beli<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    className={`cst-form-control ${
                      errors.purchase_price && "cst-form-invalid"
                    }`}
                    {...register("purchase_price")}
                    placeholder="Harga beli"
                  />
                  <small className="cst-text-negative ">
                    {errors.purchase_price?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className="pb-2">
                <Form.Group>
                  <Form.Label>
                    Harga Jual<span className="cst-text-negative">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    className={`cst-form-control ${
                      errors.price && "cst-form-invalid"
                    }`}
                    {...register("price")}
                    placeholder="Harga jual"
                  />
                  <small className="cst-text-negative ">
                    {errors.price?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={12} className="my-2 text-end">
                <small>
                  <span className="cst-text-negative">*</span> Wajib diisi
                </small>
              </Col>
              <Row className="mx-0 my-5 justify-content-end">
                <Col xs={5} md={4}>
                  <Button
                    variant="none"
                    className="cst-btn-danger w-100"
                    disabled={isLoading}
                    onClick={() => resetForm()}
                  >
                    Bersihkan
                  </Button>
                </Col>

                <Col xs={7} md={6}>
                  <Button
                    type="submit"
                    variant="none"
                    className="cst-btn-secondary w-100"
                    disabled={isLoading}
                  >
                    Tambahkan ke list
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </Col>
        <Col xs={12} md={7} className="py-3">
          <Container>
            <Subheader>Daftar Pemesanan</Subheader>

            {dataList.length > 0 && (
              <>
                <Row className="mx-0 mb-3 border-bottom border-1 d-flex justify-content-between justify-content-md-end">
                  <Col xs={6} md={3} className="px-2">
                    <h6 className="cst-text-secondary text-md-end">
                      Total Barang: {dataList.length} Item
                    </h6>
                  </Col>
                  <Col xs={6} md={5} className="px-2">
                    <h6 className="cst-text-secondary text-md-end">
                      Total Harga: IDR {convertIDR(totalPrice)}
                    </h6>
                  </Col>
                </Row>
                <div className="cst-h-md cst-y-scroll mb-2">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Nama Barang</th>
                        <th>Supplier</th>
                        <th>Jumlah Pemesanan</th>
                        <th className="text-end">Harga Barang</th>
                        <th className="text-end">Amount</th>
                        <th className="text-end">Harga Jual</th>
                        <th className="text-center">Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.map((cell) => (
                        <tr key={cell.item_name.value}>
                          <td>{cell.item_name.label}</td>
                          <td>{cell.supplier_id.label}</td>
                          <td>
                            {cell.purchase_qty} {cell.unit}
                          </td>
                          <td className="text-end">
                            <div className="d-flex flex-column">
                              {convertIDR(cell.purchase_price)}
                              <span className="cst-text-neutral">IDR</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="d-flex flex-column">
                              {convertIDR(cell.total_amount)}
                              <span className="cst-text-neutral">IDR</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="d-flex flex-column">
                              {convertIDR(cell.price)}
                              <span className="cst-text-neutral">IDR</span>
                            </div>
                          </td>
                          <td
                            className="cst-text-negative cst-clickable text-center"
                            onClick={() => {
                              setDataList(
                                dataList.filter(
                                  (list) =>
                                    list.item_name.value != cell.item_name.value
                                )
                              );
                            }}
                          >
                            {takeIcon("x")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Row className="justify-content-between">
                  <Col xs={12} lg={8}>
                    <Form.Label>Tambah Keterangan</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Keterangan (opsional)"
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} lg={4}>
                    <Form.Label>
                      Jatuh Tempo Pembayaran
                      <span className="cst-text-negative">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      className={errorDate && "cst-form-invalid"}
                      onChange={(e) => setDlDate(e.target.value)}
                      value={dlDate}
                      required
                    />
                    {errorDate && (
                      <small className="cst-text-negative ">
                        Wajib mengisi tanggal jatuh tempo
                      </small>
                    )}
                  </Col>
                </Row>

                <Row className="mx-0 my-5 justify-content-end">
                  <Col xs={5} md={3}>
                    <Button
                      variant="none"
                      className="cst-btn-danger w-100"
                      onClick={() => setDataList([])}
                      disabled={isLoading}
                    >
                      Ulangi
                    </Button>
                  </Col>

                  <Col xs={5} md={4}>
                    <Button
                      // onClick={() => navigate(-1)}
                      // onClick={() => setShow(true)}
                      onClick={() => createData()}
                      variant="none"
                      className="cst-btn-secondary w-100"
                      disabled={isLoading}
                    >
                      Buat Order
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Col>
      </Row>
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default IncomingCreate;
