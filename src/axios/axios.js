import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://dev-api.alldaydr.com",
});
export default customFetch;
