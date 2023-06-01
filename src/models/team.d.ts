/**
 * 封装队伍用户的信息
 */
import {UserType} from "./user";

export type TeamType={
    id:number;
    name:string;
    description:string;
    maxNum:number;
    expireTime?:Date; //表示可有可无;
    userId:number;
    //todo 定义枚举类型
    status:number;
    password?:string;
    createTime:Date;
    updateTime:Date;
    createUser:UserType;
    hasJoinNum?:number;
    hasJoin:boolean;
}