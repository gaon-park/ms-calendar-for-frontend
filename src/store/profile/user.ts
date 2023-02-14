import { atom } from "recoil"
import { IProfile } from "src/model/user/profile"

export const myProfile = atom<IProfile | undefined>({
    key: "myProfile",
    default: undefined
})
