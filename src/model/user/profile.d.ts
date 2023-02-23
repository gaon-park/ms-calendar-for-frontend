export interface PutJsonRequest {
    nickName: string;
    accountId: string;
    isPublic: boolean;
    avatarImg: string;
    world: string;
    job: string;
    jobDetail: string;
    notificationFlg: boolean;
}

export interface IProfile {
    id: string;
    nickName: string;
    accountId: string;
    createdAt: number[];
    updatedAt: number[];
    isPublic: boolean;
    avatarImg: string?;
    world: string;
    job: string;
    jobDetail: string;
    heFollowMe: 'FOLLOW' | 'WAITING' | null
    iamFollowHim: 'FOLLOW' | 'WAITING' | null
    notificationFlg: boolean;
    role: string;
}

export interface IProfileResponse {
    profile: IProfile;
    follow: IProfile[];
    follower: IProfile[];
    acceptedFollowCount: number;
    acceptedFollowerCount: number;
}

export interface PostApiKeyReq {
    apiKey: string
}

export interface ApiKeyResponse {
    apiKey: string
    isValid: boolean
    createdAt: string
    expiredAt: string
}