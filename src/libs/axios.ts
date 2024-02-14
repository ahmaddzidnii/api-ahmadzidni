import axios from "axios";

export const AxiosApiMyQuran = axios.create({
  baseURL: "https://api.myquran.com/v2/",
});
