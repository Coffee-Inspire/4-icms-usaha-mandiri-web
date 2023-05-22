import fetchDepart from "../helpers/fetchDepart";

const base = `/category`;
const category = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit.value}&search=${search}&sort=${sort.value}&filter=${sort.field}`;
    return fetchDepart(url, options);
  },

  getDataSource: () => {
    const options = {
      method: "GET",
    };

    let url = `${base}/datasource`;
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

  delete: (targetId) => {
    const options = {
      method: "DELETE",
    };

    let url = `${base}/delete?id=${targetId}`;
    return fetchDepart(url, options);
  },
};

export default category;
