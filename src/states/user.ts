//返回当前用户的状态：
import {UserType} from "../models/user";

let currentUser:UserType;

const setCurrentUserState=(user:UserType)=>{
    currentUser=user;
}


const getCurrentUserState=():UserType=>{
    return currentUser
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
