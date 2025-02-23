import { User } from "../../classes/user";

export const setUserAction = (user : User) => {
    return {
        type : "SET_USER",
        user
    }
}