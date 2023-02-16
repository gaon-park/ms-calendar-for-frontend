import axios from "axios";
import * as qs from "qs";
import { AuthCookie } from "../cookie/cookies";
import isJwtTokenExpired from "jwt-check-expiry";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";

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
MsBackendAxios.interceptors.request.use(
  async function (config) {
    if (!isTokenExpired()) {
      console.log('expired token! run reissue logic')
      await axios.post(
        MS_BACKEND_API_PATH.POST_REISSUE_TOKEN,
        {},
        {
          baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "",
        }
      ).then((res) => {
        new AuthCookie().signInCallbackCookies({
          accessToken: res.data.accessToken
        })

        console.log('new cookie set done')
      })
    }
    console.log('original api request!')
    return config;
  }
)

const isTokenExpired = (): boolean => {
  const token = new AuthCookie().backendAccessCookie.getToken()
  if (token !== null) {
    if (isJwtTokenExpired(token)) return true
    return false
  }
  return true
}
