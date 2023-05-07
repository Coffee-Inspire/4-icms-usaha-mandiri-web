import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import moment from "moment/moment";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import Header from "../../components/Header";
import Receipt from "./Receipt";
import ChainModal from "./ChainModal";
import ActionPopup from "../../components/ActionPopup";

import customerApi from "../../apis/customer";
import stockApi from "../../apis/stock";
import outgoingApi from "../../apis/outgoing";
import convertIDR from "../../helpers/convertIDR";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";

function OutgoingCreate() {
  const navigate = useNavigate();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // ? For Development
  // const dummyCustomerOptions = [
  //   {
  //     value: "1",
  //     label: "Desmond Tan",
  //   },
  //   {
  //     value: "2",
  //     label: "Jonathan Lee",
  //   },
  //   {
  //     value: "3",
  //     label: "Michelle Wong",
  //   },
  //   {
  //     value: "4",
  //     label: "Amelia Ng",
  //   },
  // ];

  const dummyItemOptions = [
    {
      value: "1",
      label: "Semen",
    },
    {
      value: "2",
      label: "Kayu",
    },
    {
      value: "3",
      label: "Besi",
    },
  ];

  const { profileData } = useSelector((state) => state.profileReducer);
  const [quickData, setQuickData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [invoiceInfo, setInvoiceInfo] = useState({
    date: "",
    user: "",
  });
  const [customer, setCustomer] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [stock, setStock] = useState(null);
  const [stockInfo, setStockInfo] = useState(null);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [payment, setPayment] = useState({
    pay: "0",
    change: "0",
  });
  const initialCartRow = {
    stock_id: null,
    stock_name: "",
    sold_price: "",
    price: 0,
    qty: 0,
    sold_qty: "1",
    total_amount: 0,
    unit: "-",
    // itemId: "",
    // itemName: "",
    // price: 0,
    // qty: 0,
    // soldQty: "1",
    // unit: "-",
    // amount: 0,
  };

  const [chainModalShow, setChainModalShow] = useState(false);

  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const getCustomerSource = () => {
    setIsLoading(true);
    customerApi
      .getDataSource()
      .then((res) => {
        if (res.status !== 200) throw res;
        setCustomerOptions(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getCustomerInfo = (customerId) => {
    setIsLoading(true);
    const params = {
      id: customerId,
    };
    customerApi
      .getById(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setCustomerInfo(res.data.data);
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

  // const getStockInfo = (stockId) => {
  //   setIsLoading(true);
  //   const params = {
  //     id: stockId,
  //   };
  //   stockApi
  //     .getById(params)
  //     .then((res) => {
  //       if (res.status !== 200) throw res;
  //       setStockInfo(res.data.data);
  //     })
  //     .catch((err) => {
  //       setActionRes(errorReader(err));
  //       setActionAlertShow(true);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const handleAddRow = () => {
    setCart((cart) => [...cart, initialCartRow]);
  };

  const handleAssignStockToCart = async (targetIndex, item) => {
    // * Hit GetItemById API ,requesting for stock price
    // // ? For Development
    // const dummyItemPrice = [
    //   {
    //     id: "1",
    //     itemName: "Semen",
    //     price: "50000",
    //     qty: "50",
    //     unit: "pcs",
    //   },
    //   {
    //     id: "2",
    //     itemName: "Kayu",
    //     price: "30000",
    //     qty: "60",
    //     unit: "box",
    //   },
    //   {
    //     id: "3",
    //     itemName: "Besi",
    //     price: "80000",
    //     qty: "30",
    //     unit: "pcs",
    //   },
    // ];
    // const itemData = dummyItemPrice.find((i) => i.id === item.value);

    setIsLoading(true);
    const params = {
      id: item.value,
    };
    stockApi
      .getById(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const stock = res.data.data;
        setCart(
          cart.map((c, idx) => {
            if (idx === targetIndex) {
              return {
                ...c,
                stock_id: item.value,
                stock_name: item.label,
                sold_price: stock.price,
                price: stock.price,
                qty: stock.qty,
                // sold_qty: "1",
                total_amount: stock.price * c.sold_qty,
                unit: stock.unit,
              };
            } else return c;
          })
        );
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));

    // setCart(
    //   cart.map((c, idx) => {
    //     if (idx === targetIndex) {
    //       return {
    //         ...c,
    //         itemId: item.value,
    //         itemName: itemData.itemName,
    //         price: itemData.price,
    //         qty: itemData.qty,
    //         unit: itemData.unit,
    //         amount: itemData.price * c.soldQty,
    //       };
    //     } else {
    //       return c;
    //     }
    //   })
    // );
  };

  const handleAssignQtyToCart = (targetIndex, value) => {
    setCart(
      cart.map((c, idx) => {
        if (idx === targetIndex) {
          return { ...c, sold_qty: value, total_amount: value * c.price };
        } else {
          return c;
        }
      })
    );
    // setCart(
    //   cart.map((c, idx) => {
    //     if (idx === targetIndex) {
    //       return { ...c, soldQty: value, amount: value * c.price };
    //     } else {
    //       return c;
    //     }
    //   })
    // );
  };

  const handleRemoveFromCart = (targetIndex) => {
    const newData = cart.filter((i, idx) => idx !== targetIndex);
    setCart(newData);
  };

  // ? For Development
  const [dummyApiResultReturn, setDummyApiResultReturn] = useState({
    incomingNo: "UM/RCPT/23/3/0001",
  });
  const handleSubmit = () => {
    const params = {
      outgoing: {
        sold_date: moment(),
        guest_id: customer ? customer.value : null,
        total_sold: totalPrice,
        note: "",
      },
      cart: cart,
      // customer: customer,
      // totalPrice: totalPrice,
      // date: moment(),
      // user: profileData.id,
    };

    setIsLoading(true);
    outgoingApi
      .create(params)
      .then((res) => {
        console.log("Outgoing POST Callback => ", res);
        if (res.status !== 200) throw res;
        // TODO Set quick data from response for fast receipt and details redirect
        setQuickData("");
        // TODO Shows chain popup if status res is 200
        setChainModalShow(true);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));

    // // ? For Development
    // const d = {
    //   ...params,
    //   customer: customer ? customer.label : "",
    //   date: moment().format("D-MM-YYYY"),
    // };
    // setDummyApiResultReturn({ ...dummyApiResultReturn, ...d });

    // setChainModalShow(true);
  };

  const stopCheckout = (cart) => {
    let flag = false;
    if (cart.length < 1) flag = true;
    if (cart.length > 0 && cart[0].stock_id === null) flag = true;
    return flag;
  };

  useEffect(() => {
    const currentDate = moment().format("D-MM-YYYY hh:mm A");
    setInvoiceInfo({
      date: currentDate,
      user: profileData.fullname,
    });
    getCustomerSource();
    setCart([initialCartRow]);
    getStockSource();
  }, []);

  useEffect(() => {
    if (customer !== null) {
      // * Hit single GetByID API, request for customer data
      getCustomerInfo(customer.value);
      // // ? For Development
      // const dummyCustomerInfo = [
      //   {
      //     id: "1",
      //     contact: "082283569190",
      //     address: "Avr River 149 Road, Jt Street 19221",
      //   },
      //   {
      //     id: "2",
      //     contact: "082283561143",
      //     address: "Bencholeen Sideways 301, 19228",
      //   },
      //   {
      //     id: "3",
      //     contact: "082283569187",
      //     address: "Anderson Hills, Rochor Road 52",
      //   },
      //   {
      //     id: "4",
      //     contact: "082283566570",
      //     address: "MTS Apartement 709, B-Side Doorways 19885",
      //   },
      // ];
      // const getCustomerInfo = dummyCustomerInfo.find(
      //   (i) => i.id === customer.value
      // );
      // setCustomerInfo(getCustomerInfo);
    } else setCustomerInfo(null);
  }, [customer]);

  // useEffect(() => {
  //   if (stock !== null) {
  //     // * Request for stock data
  //     getStockInfo(stock.value);
  //   } else setStockIn(null);
  // }, [stock]);

  useEffect(() => {
    if (cart.length > 0) {
      const s = cart.reduce((a, b) => a + b.total_amount, 0);
      setTotalPrice(s);
    } else setTotalPrice("0");
  }, [cart]);

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"kasir"} isLoading={isLoading} />
      <Row className="mx-0 pt-3">
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Header className="cst-bg-secondary cst-text-plain">
              Informasi Nota
            </Card.Header>
            <div className="pt-2 pb-3">
              <Row className="mx-0 px-4 px-md-0">
                <Col xs={3} className="my-2 px-0 d-flex justify-content-end">
                  <small className="my-auto text-end">
                    <strong>Tanggal</strong>
                  </small>
                </Col>
                <Col xs={9} className="my-2">
                  <Form.Control
                    className="cst-form-control py-1 px-2"
                    value={invoiceInfo.date}
                    disabled
                  />
                </Col>
                <Col xs={3} className="my-2 px-0 d-flex  justify-content-end">
                  <small className="my-auto text-end">
                    <strong>Operator</strong>
                  </small>
                </Col>
                <Col xs={9}>
                  <Form.Control
                    className="cst-form-control py-1 px-2"
                    value={invoiceInfo.user}
                    disabled
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Header className="cst-bg-secondary cst-text-plain">
              Informasi Pelanggan
            </Card.Header>
            <div className="pt-2 pb-3">
              <Row className="mx-0 px-4 px-md-0">
                <Col xs={3} className="my-2 px-0 d-flex justify-content-end">
                  <small className="my-auto text-end">
                    <strong>Pelanggan</strong>
                  </small>
                </Col>
                <Col xs={9} className="my-2">
                  <Select
                    isClearable
                    options={customerOptions}
                    placeholder="Pilih Pelanggan"
                    onChange={(e) => setCustomer(e)}
                  />
                </Col>
                {customerInfo !== null && (
                  <>
                    <Col xs={3} className="my-1 d-flex  justify-content-end">
                      <small className="my-auto text-end">
                        <strong>Telp</strong>
                      </small>
                    </Col>
                    <Col xs={9} className="my-1">
                      <Form.Control
                        className="cst-form-control py-1 px-2"
                        defaultValue={customerInfo && customerInfo.contact}
                        disabled
                      />
                    </Col>
                    <Col xs={3} className="my-1 d-flex  justify-content-end">
                      <small className="my-auto text-end">
                        <strong>Alamat</strong>
                      </small>
                    </Col>
                    <Col xs={9} className="my-1">
                      <Form.Control
                        as="textarea"
                        className="cst-form-control py-1 px-2"
                        defaultValue={customerInfo && customerInfo.address}
                        disabled
                      />
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={12} className="mb-3">
              <Table hover bordered responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Amount</th>
                    <th>Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((i, index) => (
                    <tr key={index}>
                      <td>{`${index + 1}`}</td>
                      <td>
                        <Select
                          menuPortalTarget={document.body}
                          // options={dummyItemOptions}
                          options={stockOptions}
                          onChange={(e) => {
                            handleAssignStockToCart(index, e);
                          }}
                          placeholder="Pilih Barang"
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={`IDR ${convertIDR(cart[index].price)}`}
                          className="cst-form-control"
                          disabled
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          className="cst-form-control cst-w-sm"
                          onChange={(e) =>
                            handleAssignQtyToCart(index, e.target.value)
                          }
                          value={cart[index].sold_qty}
                        />
                      </td>
                      <td>{cart[index].unit}</td>
                      <td>
                        <Form.Control
                          className="cst-form-control"
                          value={`IDR ${convertIDR(cart[index].total_amount)}`}
                          disabled
                        />
                      </td>
                      <td>
                        <span
                          className="cst-clickable cst-text-negative"
                          onClick={() => handleRemoveFromCart(index)}
                        >
                          {takeIcon("x")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Row className="cst-text-plain cst-bg-primary mx-0 mt-1 mb-3 py-2 d-flex align-items-center">
                <Col xs={5} md={4}>
                  <Button
                    onClick={() => handleAddRow()}
                    variant="none"
                    className="cst-btn-plain py-0 px-2"
                  >
                    {takeIcon("addNode")} Tambah Baris
                  </Button>
                </Col>
                <Col xs={7} md={8} className="text-end">
                  <span>
                    <strong>{`Total: IDR ${convertIDR(totalPrice)}`}</strong>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between">
            <Col xs={12} md={6} className="mb-4">
              <Form.Control
                as="textarea"
                placeholder="Keterangan (opsional)"
                className="cst-form-control"
              />
            </Col>
            <Col xs={12} md={4}>
              <Row>
                <Col xs={3} className="my-1 d-flex align-items-center">
                  <span>Bayar:</span>
                </Col>
                <Col xs={9} className="my-1">
                  <Form.Control
                    type="number"
                    className="cst-form-control"
                    value={payment.pay}
                    onChange={(e) => {
                      const paymentPay = e.target.value;
                      const paymentChange = Math.max(
                        paymentPay - totalPrice,
                        0
                      );
                      setPayment({
                        ...payment,
                        pay: paymentPay,
                        change: paymentChange,
                      });
                    }}
                  />
                </Col>
                <Col xs={3} className="my-1 d-flex align-items-center">
                  <span>Kembali:</span>
                </Col>
                <Col xs={9} className="my-1">
                  <Form.Control
                    className="cst-form-control"
                    value={`IDR ${convertIDR(payment.change)}`}
                    disabled
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Row className="d-flex justify-content-end my-4">
                <Col xs={12} md={2} className="my-2">
                  <Button
                    variant="none"
                    className="cst-btn-primary w-100 d-flex justify-content-center align-items-center"
                    onClick={() => handleSubmit()}
                    disabled={isLoading || stopCheckout(cart)}
                  >
                    <span>{takeIcon("save")}</span>
                    <span className="mx-2">Checkout</span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <ChainModal
        show={chainModalShow}
        close={() => setChainModalShow(false)}
        handlePrint={handlePrint}
        subjectId={quickData}
      />
      <Receipt innerRef={printRef} data={dummyApiResultReturn} />
      <ActionPopup
        show={actionAlertShow}
        setShow={setActionAlertShow}
        actionRes={actionRes}
      />
    </Container>
  );
}

export default OutgoingCreate;
