import { IOAuthProvider } from "src/model/user/oauthProvider";

export enum OAuthProvider {
    GOOGLE_ID = 'google'
};

/**
 * Google 認証用の設定
 *
 * https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#oauth-2.0-endpoints_1
 */
export const GOOGLE_PROVIDER: IOAuthProvider = {
    backLoginEndPoint: process.env.NEXT_PUBLIC_BACKEND_API_URL + '/login',
    authEndPoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
    redirectURL: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL ?? '',
    provider: OAuthProvider.GOOGLE_ID,
}
