import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import Header from "../../components/Header";
import { takeIcon } from "../../helpers/iconMapper";
import Subheader from "../../components/Subheader";

function IncomingCreate() {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const schema = Joi.object({
    itemName: Joi.object().required().messages({
      "string.empty": `Nama barang tidak boleh kosong`,
      "any.required": `Nama barang tidak boleh kosong`,
    }),
    supplier: Joi.object().required().messages({
      "string.empty": `Nama supplier tidak boleh kosong`,
      "any.required": `Nama supplier tidak boleh kosong`,
    }),
    costPcs: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.empty": `Harga tidak boleh kosong`,
        "any.required": `Harga tidak boleh kosong`,
        "string.pattern.base": `Hanya angka`,
      }),
    purchaseQty: Joi.string()
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

    // TODO Checking if item name already exist in dataList
    const isExist = dataList.find(
      (i) => i.itemName.value === data.itemName.value
    );
    if (isExist) {
      alert("stop");
      return;
    }
    setDataList([...dataList, data]);
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

  const [isFetching, setIsFetching] = useState(false);

  return (
    <Container fluid className="p-4">
      <Header className="d-flex align-items-center">
        <span
          className="cst-clickable cst-hover-color-respond me-2"
          onClick={() => navigate(-1)}
        >
          {takeIcon("backspace")}
        </span>
        <span>TAMBAH BARANG</span>
      </Header>
      <Row className="mx-0">
        <Col xs={12} md={4} className="cst-border-right py-3">
          <Subheader>Input Data Barang</Subheader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12} md={12} className="pb-2">
                <Form.Group>
                  <Form.Label>Nama Barang</Form.Label>
                  <Controller
                    name="itemName"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={dummyItemOptions}
                        isDisabled={isFetching}
                        placeholder="Pilih atau buat barang"
                      />
                    )}
                  />
                  <small className="cst-text-negative">
                    {errors.itemName?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={12} className="pb-2">
                <Form.Group>
                  <Form.Label>Pilih Supplier</Form.Label>
                  <Controller
                    name="supplier"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        // className={`cst-form-control ${
                        //   errors.itemName && "cst-form-invalid"
                        // }`}
                        options={dummySupplyOptions}
                        placeholder="Pilih Supplier"
                      />
                    )}
                  />
                  <small className="cst-text-negative ">
                    {errors.supplier?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={12} md={12} className="pb-2">
                <Form.Group>
                  <Form.Label>Harga Beli</Form.Label>
                  <Form.Control
                    type="number"
                    className={`cst-form-control ${
                      errors.costPcs && "cst-form-invalid"
                    }`}
                    {...register("costPcs")}
                    placeholder="Harga beli"
                  />
                  <small className="cst-text-negative ">
                    {errors.costPcs?.message}
                  </small>
                </Form.Group>
              </Col>
              <Col xs={6} md={6} className="pb-2">
                <Form.Group>
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="number"
                    className={`cst-form-control ${
                      errors.purchaseQty && "cst-form-invalid"
                    }`}
                    {...register("purchaseQty")}
                    placeholder="Qty"
                  />
                  <small className="cst-text-negative ">
                    {errors.purchaseQty?.message}
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
                            className="me-2"
                            defaultChecked
                          />
                          <Form.Label htmlFor="unitPcs">Pcs</Form.Label>
                        </div>
                        <div className="d-flex me-3">
                          <Form.Check
                            type="radio"
                            name="unit"
                            id="unitBox"
                            value="box"
                            className="me-2"
                          />
                          <Form.Label htmlFor="unitBox">Box</Form.Label>
                        </div>
                      </Form.Group>
                    )}
                  />
                  <small className="cst-text-negative ">
                    {errors.unit?.message}
                  </small>
                </Form.Group>
              </Col>

              <Row className="mx-0 my-5 justify-content-end">
                <Col xs={5} md={4}>
                  <Button variant="none" className="cst-btn-danger w-100">
                    Bersihkan
                  </Button>
                </Col>

                <Col xs={7} md={5}>
                  <Button
                    type="submit"
                    variant="none"
                    className="cst-btn-secondary w-100"
                  >
                    Tambahkan ke list
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </Col>
        <Col xs={12} md={8} className="py-3">
          <Container>
            <Subheader>Order List</Subheader>
            {dataList.length > 0 && (
              <>
                <Table responsive>
                  <thead>
                    <tr>
                      {[
                        "Nama Barang",
                        "Supplier",
                        "Harga Barang",
                        "Order Qty",
                        "Unit",
                        "Amount",
                      ].map((i) => (
                        <th key={i}>{i}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((cell) => (
                      <tr key={cell.itemName.value}>
                        <td>{cell.itemName.label}</td>
                        <td>{cell.supplier.label}</td>
                        <td>{cell.costPcs}</td>
                        <td>{cell.purchaseQty}</td>
                        <td>{cell.unit}</td>
                        <td>{cell.costPcs * cell.purchaseQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Form.Label>Catatan</Form.Label>
                <Form.Control as="textarea" />
                <Row className="mx-0 my-5 justify-content-end">
                  <Col xs={5} md={2}>
                    <Button variant="none" className="cst-btn-danger w-100">
                      Ulangi
                    </Button>
                  </Col>

                  <Col xs={5} md={2}>
                    <Button
                      onClick={() => navigate(-1)}
                      variant="none"
                      className="cst-btn-secondary w-100"
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
