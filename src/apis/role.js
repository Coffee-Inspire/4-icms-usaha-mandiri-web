import fetchDepart from "../helpers/fetchDepart";

const base = `/role`;
const role = {
  getAll: () => {
    const options = {
      method: "GET",
    };

    let url = `${base}`;
    return fetchDepart(url, options);
  },
};

export default role;
