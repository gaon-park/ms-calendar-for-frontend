import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { OAuthProvider } from "src/constants/provider";
import { useAuth } from "src/hooks/useAuth";

function OAuthGoogleCallback() {
    const router = useRouter();
    const { signInCallback } = useAuth();
    const didLogRef = useRef(false);

    useEffect(() => {
        if (didLogRef.current) return;
        didLogRef.current = true;
        const search = location.href.substring(1).split("?")[1].split("&");
        const params: { [k: string]: string } = {};
        search.forEach((param) => {
            const kv = param.split("=");
            params[kv[0]] = kv[1];
        });
        const code = decodeURIComponent(params["code"]);
        if (code != null) {
            signInCallback(code, OAuthProvider.GOOGLE_ID);
            
            return;
        }
        router.push("/404");
    });
}

export default OAuthGoogleCallback;
