import fetchDepart from "../helpers/fetchDepart";

const base = `/stock`;
const stock = {
  getAll: (params) => {
    const { page, limit, sort, filter, search } = params;
    const options = {
      method: "GET",
    };

    let url = `${base}/?page=${page}&limit=${limit}&search=${search}`;
    return fetchDepart(url, options);
  },
};

export default stock;
