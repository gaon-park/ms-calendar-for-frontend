import { useCallback, useMemo } from "react";
import { OAuthProvider, GOOGLE_PROVIDER } from "src/constants/provider";
import { AuthCookie } from "src/common/cookie/cookies";
import { AuthClient } from "src/hooks/oauth";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { isAuthenticated } from "src/store/auth";

const googleAuthClient = new AuthClient(GOOGLE_PROVIDER);

export const useAuth = () => {
    const router = useRouter(); 
    const setIsAuth = useSetRecoilState<boolean>(isAuthenticated);

    const isSignIn = useMemo(() => {
        return new AuthCookie().backendAccessCookie.getToken() != null;
    }, [new AuthCookie(), router]);

    const initAuthStatus = useCallback(async () => {
        setIsAuth(isSignIn);
    }, [isSignIn]);

    const signInCallback = useCallback(
        async (access_token: string, provider: OAuthProvider) => {
            if (provider == OAuthProvider.GOOGLE_ID) {
                await googleAuthClient.signInCallback(access_token);
            } else {
                router.push("403");
            }
            location.href='/'
        },
        []
    );

    return {
        isSignIn,
        signInCallback,
        initAuthStatus,
    };
};
