import fetchDepart from "../helpers/fetchDepart";

const base = `/journal`;
const journal = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit.value}&search=${search}&sort=${sort.value}&filter=${sort.field}`;
    if (filter) url += `&${filter.field}=${filter.value}`;

    return fetchDepart(url, options);
  },

  getBalance: () => {
    // const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/getBalance`;

    return fetchDepart(url, options);
  },

  create: (params) => {
    const options = {
      method: "POST",
      body: params,
    };

    let url = `${base}/create`;
    return fetchDepart(url, options);
  },
};

export default journal;
