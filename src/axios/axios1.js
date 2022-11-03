import axios from "axios";

const customFetch1 = axios.create({
  baseURL: "https://api.ideal-postcodes.co.uk/v1/postcodes",
});
export default customFetch1;
