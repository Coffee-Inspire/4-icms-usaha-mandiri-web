import fetchDepart from "../helpers/fetchDepart";

const base = `/user`;
const user = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit}&search=${search}`;
    return fetchDepart(url, options);
  },

  create: (params) => {
    const options = {
      method: "POST",
      body: params,
    };

    let url = `/auth/createuser`;
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

export default user;
