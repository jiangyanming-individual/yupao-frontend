/**
 * 用户属性：
 */
export type UserType={
    id: number;
    userName: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    profile?:string
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string;
    createTime: Date;
}