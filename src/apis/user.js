import fetchDepart from "../helpers/fetchDepart";

const base = `/user`;
const user = {
  getAll: (param) => {
    const options = {
      method: "GET",
    };

    let url = `${base}/`;
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

export default user;
