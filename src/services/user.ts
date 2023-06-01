//得到当前用户的信息；
import myAxiso from "../plugins/myAxiso";
import {getCurrentUserState, setCurrentUserState} from "../states/user";

export const getCurrentUser= async ()=>{

    // const currentUser=getCurrentUserState();
    // if (currentUser){
    //     return currentUser;
    // }
    //不存在,从远程获取用户的信息：返回用户信息：
    const res=await myAxiso.get('/user/current');
    if (res.code === 0){
        // setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}
