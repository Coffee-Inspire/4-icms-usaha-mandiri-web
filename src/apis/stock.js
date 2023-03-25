// import { host } from "../appsetting/config";
import fetchDepart from "../helpers/fetchDepart";
import axios from "axios";

const base = `/item`;
const stock = {
  getAll: ({ page = "1", limit = "5", filter = "", search = "" }) => {
    console.log(page, limit, filter, search);

    const options = {
      method: "GET",
      body: {},
    };

    let url = `${base}`;
    // * Concating url string with query parameters
    return fetchDepart(url, options);
  },
};

export default stock;
