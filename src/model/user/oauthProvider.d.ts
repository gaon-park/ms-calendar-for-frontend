export interface IOAuthProvider {
    backLoginEndPoint: string,
    authEndPoint: string,
    clientID: string,
    clientSecret: string,
    redirectURL: string,
    provider: AuthProvider,
}

export interface IOAuthState {
    accessToken: string,
    provider: AuthProvider,
}
