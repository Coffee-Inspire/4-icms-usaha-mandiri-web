import { host } from "../appsetting/config";
import axios from "axios";

const base = `${host}/stocks`;
const stocksAPI = {
  getAll: ({ page = "1", limit = "5", filter = "", search = "" }) => {
    console.log(page, limit, filter, search);

    let url = `${base}`;
    return axios.get(url);
  },
};

export default stocksAPI;
