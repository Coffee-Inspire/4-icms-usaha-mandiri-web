import axios from "axios";
import { host, pathPrefix } from "../appsetting/config";

const auditor = () => {
  const token = localStorage.getItem("token");
  return `Bearer ${token}`;
};

async function fetchDepart(
  url,
  options = { method: "GET", body: {}, contentType: "application/json" }
) {
  const authorization = auditor();
  const completeURL = `${host}${pathPrefix}${url}`;
  const request = {
    method: options.method,
    baseURL: completeURL,
    headers: {
      Authorization: authorization,
      "Content-Type": options.contentType || "application/json",
    },
  };

  if (options.method != "GET") request.data = options.body;

  //  TODO: Sign In Silent with profile ID & fast token, redirect to login if error occurs
  //  try {
  //   const res = await axios(request)
  //   if(res.status >= 200 && res.status < 400)
  //   return res
  // } catch (error) {
  //   if(error.response && error.response.status == 401){
  //     const newRequest = Object.assign({}, request)
  //     ...
  //   }
  // }

  try {
    const res = await axios(request);
    if (res.status >= 200 && res.status < 400) {
      return res;
    } else throw res;
  } catch (error) {
    console.log("Triggering exception: ", error);
  }

  const res = await axios(request);
  return res;
}

export default fetchDepart;
