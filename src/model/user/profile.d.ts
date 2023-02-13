export interface IProfileResponse {
    id: string;
    email: string;
    nickName: string;
    accountId: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    avatarImg: string?;
    world: string;
    job: string;
    jobDetail: string;
    holderFlg: boolean;
    status: string;
}

export interface PutJsonRequest {
    nickName: string;
    accountId: string;
    isPublic: boolean;
    avatarImg: string;
    world: string;
    job: string;
    jobDetail: string;
}
