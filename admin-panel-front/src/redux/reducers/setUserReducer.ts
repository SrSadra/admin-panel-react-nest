import { User } from "../../classes/user"

export const setUserReducer = (state = {user: new User()}, action : {type : string , user : User}) => { // initial state is new user that has default value
    switch (action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        default: 
            return state;

    }

}

