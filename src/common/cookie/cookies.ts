import Cookies, { CookieSetOptions } from "universal-cookie";
import { ILoginResponse } from "src/model/user/user";

/**
 * Cookie管理
 */
export class MyCookie {
  private readonly keyToken: string;
  private cookies: Cookies;

  readonly options: CookieSetOptions = {
    path: "/",
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24,
  };

  public constructor(keyToken: CookieTokenList, cookies: Cookies) {
    this.keyToken = keyToken.toString();
    this.cookies = cookies;
  }

  public setToken(token: string) {
    // ローカルホストで機能
    // ドメイン環境上は機能しない
    this.cookies.set(this.keyToken, token, this.options);
  }

  public getToken(): string | null {
    return this.cookies.get(this.keyToken) || null;
  }

  public removeToken() {
    this.cookies.remove(this.keyToken, this.options);
  }
}

export enum CookieTokenList {
  BACKEND_ACCESS_TOKEN = "M_SESSION",
}

export class AuthCookie {
  readonly backendAccessCookie: MyCookie;

  public constructor() {
    const cookies = new Cookies();
    this.backendAccessCookie = new MyCookie(
      CookieTokenList.BACKEND_ACCESS_TOKEN,
      cookies
    );
  }

  public async signInCallbackCookies(res: ILoginResponse) {
    this.backendAccessCookie.setToken(res.accessToken);
  }

  public clearCookies() {
    this.backendAccessCookie.removeToken();
  }
}
