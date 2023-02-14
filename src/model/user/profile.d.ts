export interface PutJsonRequest {
    nickName: string;
    accountId: string;
    isPublic: boolean;
    avatarImg: string;
    world: string;
    job: string;
    jobDetail: string;
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
    ifollowHim: 'FOLLOW' | 'WAITING' | null
}

export interface IProfileResponse {
    profile: IProfile;
    follow: IProfile[];
    follower: IProfile[];
    acceptedFollowCount: number;
    acceptedFollowerCount: number;
}
