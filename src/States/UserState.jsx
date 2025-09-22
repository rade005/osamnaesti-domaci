import {atom} from "recoil";

import {LocalStorageEffect} from "../Effects/LocalStorageEffect";

export const UserState = atom( {
    key: "UserState",
    default: {},
    effects_UNSTABLE: [
        LocalStorageEffect("userData")
    ]
});