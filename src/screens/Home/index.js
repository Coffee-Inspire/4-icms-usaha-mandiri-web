import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Row,
  Col,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartJSTooltip,
} from "chart.js";
import moment from "moment";
import "react-circular-progressbar/dist/styles.css";

import Header from "../../components/Header";
import ActionPopup from "../../components/ActionPopup";

import dashboardApi from "../../apis/dashboard";
import { takeIcon } from "../../helpers/iconMapper";
import errorReader from "../../helpers/errorReader";
import convertIDR from "../../helpers/convertIDR";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, [
  ChartJSTooltip,
]);

function Home() {
  const [activityData, setActivityData] = useState({
    totalOutgoing: 0,
    totalIncoming: 0,
    totalReturn: 0,
  });
  const [transactionData, setTransactionData] = useState({
    credits: 0,
    debits: 0,
  });
  const [journalProgData, setJournalProgData] = useState({
    allCount: 0,
    unpaidCount: 0,
  });
  const [currentProfit, setCurrentProfit] = useState({
    value: 0,
  });
  const [periodProfit, setPeriodProfit] = useState({
    value: 0,
  });
  const [debtData, setDebtData] = useState({
    main: null,
    others: [],
  });
  const [profitData, setProfitData] = useState({
    // TODO: label is the list of current month's date
    labels: ["June 1", "June 2", "June 3", "June 4", "June 5", "June 6"],
    datasets: [
      {
        label: "Profits",
        data: [100000, 200000, 100000, 500000, 450000, 700000, 900000], // TODO data fetched from API, sorted by corresponding date
        backgroundColor: "rgba(109, 91, 208, 1)",
        borderColor: "#f26c6d",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        pointRadius: 8,
        borderWidth: 8,
        tension: 0.5,
        type: "line",
        fill: false,
      },
    ],
  });

  const statisticOption = {
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: true },
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        titleFont: {
          size: 20,
        },
        bodyFont: {
          size: 18,
          fontWeight: "bold",
        },
        padding: "10",
        callbacks: {
          label: (context) => {
            return `IDR ${convertIDR(context.raw)}`;
          },
        },
      },
    },
    onHover: (_, chartElement) => {
      const el = document.getElementById("line-canvas");
      if (chartElement.length > 0) {
        el.classList.add("cst-clickable");
      } else {
        el.classList.remove("cst-clickable");
      }
    },
  };

  const [period, setPeriod] = useState("1D");
  const [isLoading, setIsLoading] = useState(false);
  const [actionAlertShow, setActionAlertShow] = useState(false);
  const [actionRes, setActionRes] = useState({ status: null, message: "" });

  const paramModel = (data) => {
    switch (data) {
      case "1D": {
        const startDate = moment().startOf("days");
        const endDate = moment().endOf("days");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: `${startDate.format("DD MMM YYYY")}`,
        };
      }
      case "1M": {
        const startDate = moment().startOf("month");
        const endDate = moment().endOf("month");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: ` ${startDate.format("DD MMM YYYY")} s/d ${endDate.format(
            "DD MMM YYYY"
          )}`,
        };
      }
      case "3M": {
        const startDate = moment().subtract(2, "year").startOf("month");
        const endDate = moment().endOf("month");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: ` ${startDate.format("DD MMM YYYY")} s/d ${endDate.format(
            "DD MMM YYYY"
          )}`,
        };
      }
      case "6M": {
        const startDate = moment().subtract(5, "months").startOf("month");
        const endDate = moment().endOf("month");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: ` ${startDate.format("DD MMM YYYY")} s/d ${endDate.format(
            "DD MMM YYYY"
          )}`,
        };
      }
      case "12M": {
        const startDate = moment().startOf("year");
        const endDate = moment().endOf("year");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: ` ${startDate.format("DD MMM YYYY")} s/d ${endDate.format(
            "DD MMM YYYY"
          )}`,
        };
      }
      default: {
        const startDate = moment().startOf("days");
        const endDate = moment().endOf("days");
        return {
          startDate: startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: endDate.format("YYYY-MM-DD HH:mm:ss"),
          label: `${startDate.format("DD MMM YYYY")}`,
        };
      }
    }
  };

  const percentModel = (data) => {
    return 100 - Math.floor((data.unpaidCount / data.allCount) * 100) || 0;
  };

  const getActivityData = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getActivity(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setActivityData(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getTransactionData = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getTransaction(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setTransactionData(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getJournalProgData = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getJournalProgress(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setJournalProgData(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getCurrentProfit = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getCurrentProfit(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        setCurrentProfit(res.data.data);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getProfit = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getProfits(params)
      .then((res) => {
        if (res.status !== 200) throw res;
        const values = res.data.data.map((i) => i.value);
        const profitSum = values
          .map((i) => parseInt(i))
          .reduce((a, b) => a + b, 0);
        const dates = res.data.data.map((i) =>
          moment(i.date, "DD-MM-YYYY").format("D MMM YY")
        );
        setProfitData({
          ...profitData,
          labels: dates,
          datasets: [
            {
              ...profitData.datasets[0],
              data: values,
            },
          ],
        });
        setPeriodProfit({ value: profitSum });
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  const getDebt = () => {
    setIsLoading(true);
    const params = paramModel(period);
    dashboardApi
      .getDebt(params)
      .then((res) => {
        if (res.status !== 200) throw res;

        const sortedValue = res.data.data
          .sort((a, b) => {
            const x = moment(a.transaction_date);
            const y = moment(b.transaction_date);
            return y - x;
          })
          .filter((i) => i.mutation !== "0"); // ! Temporary filter for empty mutation, should've be done in BE
        const newValue = {
          main: sortedValue.find((i, x) => x === 0),
          others: sortedValue.filter((i, x) => x !== 0),
        };
        setDebtData(newValue);
      })
      .catch((err) => {
        setActionRes(errorReader(err));
        setActionAlertShow(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getCurrentProfit();
    getDebt();
  }, []);

  useEffect(() => {
    getActivityData();
    getTransactionData();
    getJournalProgData();
    getProfit();
  }, [period]);

  const styles = buildStyles({
    strokeLinecap: "round",
    pathTransitionDuration: 0.5,
    pathColor: "rgba(0, 127, 0, 1)",
    textColor: "rgba(0, 0, 0, 1)",
    textSize: "16",
    trailColor: "rgba(187, 127, 47, 1)",
  });

  return (
    <Container fluid className="p-4">
      <Header headerLabel={"beranda"} isLoading={isLoading} />
      <Row className="mt-3 mb-5 justify-content-between">
        <Col xs={12} md={3} className="px-md-3 text-center text-md-start">
          <ButtonGroup>
            <Button
              variant="none"
              className={period === "1D" ? "cst-tab-active" : "cst-tab"}
              onClick={() => setPeriod("1D")}
            >
              1HR
            </Button>
            <Button
              variant="none"
              className={period === "1M" ? "cst-tab-active" : "cst-tab"}
              onClick={() => setPeriod("1M")}
            >
              1BLN
            </Button>
            <Button
              variant="none"
              className={period === "3M" ? "cst-tab-active" : "cst-tab"}
              onClick={() => setPeriod("3M")}
            >
              3BLN
            </Button>
            <Button
              variant="none"
              className={period === "6M" ? "cst-tab-active" : "cst-tab"}
              onClick={() => setPeriod("6M")}
            >
              6BLN
            </Button>
            <Button
              variant="none"
              className={period === "12M" ? "cst-tab-active" : "cst-tab"}
              onClick={() => setPeriod("12M")}
            >
              1TH
            </Button>
          </ButtonGroup>
        </Col>
        <Col
          xs={12}
          md={5}
          className="px-3 mt-4 mt-md-0 text-center text-md-end"
        >
          <h6 className="fw-bold">
            Periode:{" "}
            <span className="cst-text-primary">{paramModel(period).label}</span>
          </h6>
        </Col>
      </Row>

      <Row className="">
        <Col xs={12} md={3} className="px-3 my-2 my-md-3">
          <div className="cst-border-neutral rounded-4 px-3 py-4">
            <h5 className="cst-text-secondary">Profit Hari Ini</h5>
            <h3 className="fw-bold">
              <span className="fw-normal">IDR</span>{" "}
              {convertIDR(currentProfit.value)}
            </h3>
          </div>
        </Col>
        <Col xs={12} md={3} className="px-3 my-2 my-md-3">
          <div className="cst-border-neutral rounded-4 ps-3 pb-4">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>Total profit dalam periode yang dipilih</p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <h5 className="cst-text-secondary">Profit Periode</h5>
            <h3 className="fw-bold">
              <span className="fw-normal">IDR</span>{" "}
              {convertIDR(periodProfit.value)}
            </h3>
          </div>
        </Col>
        <Col xs={12} md={2} className="px-3 my-2 my-md-3">
          <div className="cst-border-neutral rounded-4 ps-3 pb-4">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>
                        Jumlah penjualan yang terjadi dalam periode yang dipilih
                      </p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <h5 className="cst-text-secondary">
              <span className="d-inline d-md-none">Jumlah </span>Penjualan
            </h5>
            <h3 className="fw-bold">{activityData.totalOutgoing}</h3>
          </div>
        </Col>
        <Col xs={12} md={2} className="px-3 my-2 my-md-3">
          <div className="cst-border-neutral rounded-4 ps-3 pb-4">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>
                        Jumlah pembelian yang terjadi dalam periode yang dipilih
                      </p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <h5 className="cst-text-secondary">
              <span className="d-inline d-md-none">Jumlah </span>Pembelian
            </h5>
            <h3 className="fw-bold">{activityData.totalIncoming}</h3>
          </div>
        </Col>
        <Col xs={12} md={2} className="px-3 my-2 my-md-3">
          <div className="cst-border-neutral rounded-4 ps-3 pb-4">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>
                        Jumlah retur yang terjadi dalam periode yang dipilih
                      </p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <h5 className="cst-text-secondary">
              <span className="d-inline d-md-none">Jumlah </span>Retur
            </h5>
            <h3 className="fw-bold">{activityData.totalReturn}</h3>
          </div>
        </Col>
        <Col xs={12} md={6} className="px-3 my-2 my-md-3">
          <div className="rounded-4 cst-bg-primary text-white">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>Total pendapatan dalam periode yang dipilih</p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2 text-dark">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <div className="d-flex align-items-center px-3 py-4 px-md-4 py-md-5">
              <span>{takeIcon("income")}</span>
              <div className="mx-3">
                <h5>Pendapatan</h5>

                <h3 className="fw-bold">
                  <span className="fw-normal">IDR</span>{" "}
                  {convertIDR(Math.abs(transactionData.credits) || 0)}
                </h3>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="px-3 my-2 my-md-3">
          <div className="rounded-4 cst-bg-negative-dark text-white">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>Total pengeluaran dalam periode yang dipilih</p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2 text-dark">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <div className="d-flex align-items-center px-3 py-4 px-md-4 py-md-5">
              <span>{takeIcon("expense")}</span>
              <div className="mx-3">
                <h5>Pengeluaran</h5>
                <h3 className="fw-bold">
                  <span className="fw-normal">IDR</span>{" "}
                  {convertIDR(Math.abs(transactionData.debits) || 0)}
                </h3>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} className="my-4">
          <div className="cst-section-shadow-light rounded-4">
            <div className="text-end">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`toolip-1`}>
                    <div style={{ textAlign: "start" }} className="p-1">
                      <p>
                        Proyeksi perkembangan profit dalam periode yang dipilih
                      </p>
                    </div>
                  </Tooltip>
                }
              >
                <span className="cst-clickable mx-2">
                  {" "}
                  {takeIcon("attention")}
                </span>
              </OverlayTrigger>
            </div>
            <div className="px-4 px-md-5 py-4">
              <h3 className="cst-text-primary cst-letter-spacing-sm fw-bold ">
                Statistik{" "}
                <span className="d-none d-md-inline-block">Perkembangan</span>{" "}
                Profit
              </h3>
            </div>
            <div
              // style={{ height: "100px", width: "100px" }}
              className="p-3 p-md-5"
            >
              <Line
                id="line-canvas"
                data={profitData}
                options={statisticOption}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} md={5} className="my-2 my-md-3">
          <div className="cst-section-shadow-light rounded-4 px-5 py-4">
            <h3 className="cst-text-primary">Ringkasan Transaksi</h3>

            <Row className="d-flex align-items-center justify-content-center">
              <OverlayTrigger
                placement={"left"}
                overlay={
                  <Tooltip id={`toolip-unpaid`}>
                    <div className="d-flex justify-content-center align-items-center m-1">
                      <span
                        style={{ width: "15px", height: "15px" }}
                        className="cst-bg-warning rounded-circle mx-1"
                      />
                      <span>
                        Jumlah:
                        <span className="fw-bold">
                          {" "}
                          {journalProgData.unpaidCount}
                        </span>
                      </span>
                    </div>
                  </Tooltip>
                }
              >
                <Col xs={6} className="cst-clickable my-5 fw-bold">
                  <CircularProgressbar
                    value={percentModel(journalProgData)}
                    text={`${percentModel(journalProgData)}%`}
                    strokeWidth={5}
                    styles={styles}
                  />
                </Col>
              </OverlayTrigger>
            </Row>
            <Row className="mb-2 justify-content-center">
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-center align-items-center my-1">
                  <span
                    style={{ width: "15px", height: "15px" }}
                    className="cst-bg-positive rounded-circle mx-1"
                  />
                  <small>Transaksi keseluruhan</small>
                </div>
              </Col>
              <Col xs={12} md={5}>
                <div className="d-flex justify-content-center align-items-center my-1">
                  <span
                    style={{ width: "15px", height: "15px" }}
                    className="cst-bg-warning rounded-circle mx-1"
                  />
                  <small>Belum dibayar</small>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={12} md={7} className="my-2 my-md-3">
          <div className="cst-section-shadow-light rounded-4 px-3 px-md-5 py-4">
            <h3 className="cst-text-primary text-center text-md-start">
              Pembayaran Jatuh Tempo
            </h3>
            {debtData.main ? (
              <div className="px-0 px-md-2 my-5">
                <Row className="justify-content-between mb-3 mb-md-0">
                  <Col xs={12} md={6} className="text-center text-md-start">
                    <h3 className="fw-bold">
                      {moment(debtData.main.deadline_date).format("DD-MM-YYYY")}
                    </h3>
                  </Col>
                  <Col xs={12} md={6} className="text-center text-md-end">
                    <h3>
                      IDR{" "}
                      <span className="cst-text-negative fw-bold">
                        {convertIDR(debtData.main.mutation)}
                      </span>
                    </h3>
                  </Col>
                </Row>
                <Row className="justify-content-between">
                  <Col xs={12} md={6} className="text-center text-md-start">
                    <h6 className="cst-text-neutral">
                      Dibuat pada:{" "}
                      {moment(debtData.main.transaction_date).format(
                        "DD-MM-YYYY"
                      )}
                    </h6>
                  </Col>
                  <Col xs={12} md={6} className="text-center text-md-end">
                    <h6 className="cst-text-neutral">
                      {debtData.main.reference_id || "Transaksi manual"}
                    </h6>
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="my-5 py-5">
                <h5 className="cst-text-positive text-center py-3">
                  Tidak ada tagihan
                </h5>
              </div>
            )}

            {debtData.others.length > 0 && (
              <div className="border-top border-black pt-1">
                <h3 className="cst-text-primary my-4 text-center text-md-start">
                  Jatuh Tempo Selanjutnya
                </h3>
                <Table responsive striped hover className="my-4">
                  <thead>
                    <tr>
                      <th>Tanggal Jatuh Tempo</th>
                      <th>Tanggal Pembuatan</th>
                      <th>Lampiran</th>
                      <th className="text-end">Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debtData.others.map((i) => (
                      <tr key={i.id}>
                        <td>{moment(i.deadline_date).format("DD-MM-YYYY")}</td>
                        <td>
                          {moment(i.transaction_date).format("DD-MM-YYYY")}
                        </td>
                        <td>{i.reference_id || "Transaksi manual"}</td>
                        <td className="text-end">
                          IDR{" "}
                          <span className="cst-text-negative fw-bold">
                            {convertIDR(i.mutation)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
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

export default Home;
