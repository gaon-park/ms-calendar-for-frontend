import { OAuthProvider, GOOGLE_PROVIDER } from "src/constants/provider";
import { AuthCookie } from "src/common/cookie/cookies";
import { IOAuthProvider } from "src/model/user/oauthProvider";
import { MsApiOauth2Google } from "src/common/api/msBackend/auth/getOauth2Google";

export const SignIn = () => {
    const endpoint = new URL(GOOGLE_PROVIDER.authEndPoint);
    endpoint.searchParams.append("client_id", GOOGLE_PROVIDER.clientID);
    endpoint.searchParams.append("redirect_uri", GOOGLE_PROVIDER.redirectURL);
    endpoint.searchParams.append("approval_prompt", "force");
    endpoint.searchParams.append("response_type", "code");
    endpoint.searchParams.append(
        "scope",
        "https://www.googleapis.com/auth/userinfo.email"
    );
    endpoint.searchParams.append("include_granted_scopes", "true");

    window.location.href = endpoint.href;
};

export class AuthClient {
    private readonly provider: IOAuthProvider;
    private authCookie = new AuthCookie();

    public constructor(provider: IOAuthProvider) {
        this.provider = provider;
    }

    public async signInCallback(code: string) {
        if (this.provider.provider == OAuthProvider.GOOGLE_ID) {
            await MsApiOauth2Google({ code: code })
                .then((res) => {
                    const { data } = res;
                    this.authCookie.signInCallbackCookies({
                        accessToken: data.accessToken,
                    });
                    window.location.href = `${window.location.origin}`;
                })
                .catch(() => {
                    window.location.href = `${window.location.origin}/404`;
                });
        } else {
            window.location.href = `${window.location.origin}/404`;
        }
    }
}
