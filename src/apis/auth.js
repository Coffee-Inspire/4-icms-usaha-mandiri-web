import fetchDepart from "../helpers/fetchDepart";

const base = `/auth`;
const auth = {
  login: (params) => {
    const options = {
      method: "POST",
      body: params,
    };
    let url = `${base}/login`;
    return fetchDepart(url, options);
  },
};

export default auth;
