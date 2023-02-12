import axios from "axios";
import * as qs from "qs";
import { AuthCookie } from "../cookie/cookies";

export const MsBackendAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "",
  timeout: 50_000,
  headers: {
    Authorization: "Bearer " + new AuthCookie().backendAccessCookie.getToken(),
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
});

MsBackendAxios.defaults.headers.common["X-OS-TYPE"] = "WEB";
