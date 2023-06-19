import fetchDepart from "../helpers/fetchDepart";

const base = `/return`;
const outgoing = {
  getAll: (params) => {
    const { page, limit, sort, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit.value}&search=${search}&sort=${sort.value}&filter=${sort.field}`;
    return fetchDepart(url, options);
  },

  getById: (params) => {
    const { id } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/id/?id=${id}`;
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

  update: (params) => {
    const options = {
      method: "PUT",
      body: params,
    };

    let url = `${base}/update`;
    return fetchDepart(url, options);
  },
};

export default outgoing;