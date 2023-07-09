import fetchDepart from "../helpers/fetchDepart";

const base = `/info`;
const category = {
  getActivity: (params) => {
    const { startDate, endDate } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/activityCount?startDate=${startDate}&endDate=${endDate}`;

    return fetchDepart(url, options);
  },

  getTransaction: (params) => {
    const { startDate, endDate } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/transactions?startDate=${startDate}&endDate=${endDate}`;

    return fetchDepart(url, options);
  },

  getJournalProgress: () => {
    const options = {
      method: "GET",
    };

    let url = `${base}/journalProgress`;

    return fetchDepart(url, options);
  },

  getCurrentProfit: () => {
    const options = {
      method: "GET",
    };

    let url = `${base}/currentProfit`;

    return fetchDepart(url, options);
  },

  getProfits: (params) => {
    const { startDate, endDate } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/profits?startDate=${startDate}&endDate=${endDate}`;

    return fetchDepart(url, options);
  },

  getDebt: () => {
    const options = {
      method: "GET",
    };

    let url = `${base}/debts`;

    return fetchDepart(url, options);
  },
};

export default category;
