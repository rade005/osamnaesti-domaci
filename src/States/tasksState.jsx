import {atom} from "recoil";
import {LocalStorageEffect} from "../Effects/LocalStorageEffect";

export const tasksState = atom({
    key:"tasksState",
    default: [
        LocalStorageEffect("userTasks")
    ],
})