import axios from "axios";

export const request = axios.create({
  baseURL: "https://ping-music-api.vercel.app/",
  timeout: 10000,
  withCredentials: true,
});
