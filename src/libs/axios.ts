import axios from "axios";

export const AxiosApiMyQuran = axios.create({
  baseURL: "https://api.myquran.com/v2/",
});
export const AxiosApiEQuran = axios.create({
  baseURL: "https://equran.id/api/v2/",
});

export const AxiosApiQuran = axios.create({
  baseURL: "https://api.quran.com/api/v4",
});
