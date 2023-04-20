import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import Header from "../../components/Header";
import Subheader from "../../components/Subheader";
import IsExistAlert from "./Alerts/IsExistAlert";

import convertIDR from "../../helpers/convertIDR";
import { takeIcon } from "../../helpers/iconMapper";

function IncomingCreate() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [isExistAlertShow, setIsExistAlertShow] = useState(false);
  const [rejected, setRejected] = useState("");
  const schema = Joi.object({
    itemName: Joi.object().required().messages({
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

  const onSubmit = (data) => {
    // TODO Checking whitespace
    // handler(data);
    // handleClose();
    data.total_amount = data.purchase_price * data.purchase_qty;
    // TODO Checking if item name already exist in dataList
    const isExist = dataList.find(
      (i) => i.itemName.value === data.itemName.value
    );
    if (isExist) {
      setRejected(data.itemName.label);
      setIsExistAlertShow(true);
      return;
    }
    setIsExistAlertShow(false);
    setDataList([...dataList, data]);
  };

  const createData = () => {
    const newDataList = dataList.map(
      (i) =>
        (i = {
          ...i,
          itemName: i.itemName.value,
          supplier_id: i.supplier_id.value,
          category_id: i.category_id.value,
        })
    );
    const params = {
      total_purchase: totalPrice,
      note: note,
      data: newDataList,
    };
    console.log("Full Params => ", params);
  };

  // ? For Development
  const dummySupplyOptions = [
    {
      label: "supply-1",
      value: "supply-1",
    },
    {
      label: "supply-2",
      value: "supply-2",
    },
    {
      label: "supply-3",
      value: "supply-3",
    },
    {
      label: "supply-4",
      value: "supply-4",
    },
    {
      label: "supply-5",
      value: "supply-5",
    },
  ];
  const dummyItemOptions = [
    {
      label: "item-1",
      value: "1",
    },
    {
      label: "item-2",
      value: "2",
    },
    {
      label: "item-3",
      value: "3",
    },
  ];
  const dummyCategoryOptions = [
    {
      label: "category-1",
      value: "1",
    },
    {
      label: "category-2",
      value: "2",
    },
    {
      label: "category-3",
      value: "3",
    },
    {
      label: "category-4",
      value: "4",
    },
  ];

  useEffect(() => {
    // * Computed total price
    const s = dataList.reduce((a, b) => a + b.total_amount, 0);
    setTotalPrice(s);
  }, [dataList]);

  return (
    <Container fluid className="p-4">
      <Header className="d-flex align-items-center">
        <span
          className="cst-clickable cst-hover-color-respond me-2"
          onClick={() => navigate(-1)}
        >
          {takeIcon("backspace")}
        </span>
        <span>ORDER BARANG</span>
        {isLoading && <Spinner className="mx-3" />}
      </Header>
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
                    name="itemName"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={dummyItemOptions}
                        isDisabled={isLoading}
                        placeholder="Pilih atau buat barang"
                      />
                    )}
                  />
                  <small className="cst-text-negative">
                    {errors.itemName?.message}
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
                        options={dummyCategoryOptions}
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
                        options={dummySupplyOptions}
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
                    // onClick={() => reset()}
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
            <Subheader>Order List</Subheader>
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
                        <tr key={cell.itemName.value}>
                          <td>{cell.itemName.label}</td>
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
                                    list.itemName.value != cell.itemName.value
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
                <Form.Label>Catatan</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Catatan (opsional)"
                  onChange={(e) => setNote(e.target.value)}
                />
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
    </Container>
  );
}

export default IncomingCreate;
