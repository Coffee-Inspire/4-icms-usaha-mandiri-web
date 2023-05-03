import fetchDepart from "../helpers/fetchDepart";

const base = `/incomings`;
// const baseDetails = `/incomingDetails`;
const incomings = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit}&search=${search}`;
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

  receive: (params) => {
    const options = {
      method: "PUT",
      body: params,
    };

    let url = `/incomingDetails/update`;
    return fetchDepart(url, options);
  },

  updateStatus: (params) => {
    const options = {
      method: "PUT",
      body: params,
    };

    let url = `${base}/update`;
    return fetchDepart(url, options);
  },
};

export default incomings;
