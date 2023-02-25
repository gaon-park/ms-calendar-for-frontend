import axios from "axios";
import * as qs from "qs";
import { AuthCookie } from "../cookie/cookies";
import isJwtTokenExpired from "jwt-check-expiry";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";

const myCookie = new AuthCookie()

export const MsBackendAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "",
  timeout: 100_000,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  }
});

MsBackendAxios.defaults.headers.common["X-OS-TYPE"] = "WEB";
MsBackendAxios.defaults.headers.common["Accept"] = "application/json";
MsBackendAxios.defaults.headers.common["Content-Type"] = "application/json";

MsBackendAxios.interceptors.request.use(
  async function (config) {
    if (config.url !== "/api/oauth2/google" && isTokenExpired()) {
      await axios.post(
        MS_BACKEND_API_PATH.POST_REISSUE_TOKEN,
        {},
        {
          baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "",
        }
      ).then(async (res) => {
        await myCookie.signInCallbackCookies({
          accessToken: res.data.accessToken
        })
      }).catch(() => {
        myCookie.clearCookies()
      })
    }

    if (myCookie.backendAccessCookie.getToken() !== null) {
      config.headers = {
        Authorization: "Bearer " + myCookie.backendAccessCookie.getToken(),
      }
    }
    

    return config;
  }
)

const isTokenExpired = (): boolean => {
  const token = new AuthCookie().backendAccessCookie.getToken()
  if (token !== null) {
    return isJwtTokenExpired(token)
  }

  return false
}
