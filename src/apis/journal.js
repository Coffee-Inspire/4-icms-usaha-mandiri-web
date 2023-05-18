import fetchDepart from "../helpers/fetchDepart";

const base = `/journal`;
const journal = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    // let url = `${base}/?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
    let url = `${base}/?page=${page}&limit=${limit}&search=${search}&sort=ASC&filter=created_at`;
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
