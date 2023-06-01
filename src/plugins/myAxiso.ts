import axios from "axios";

//创建一个axiso的实例；用于前后端进行交互：
const myAxiso = axios.create({
    baseURL: 'http://localhost:8085/api'
});

//设置全局的cookie：
const res=myAxiso.defaults.withCredentials=true;

console.log("cookie：",res)
//添加cookie：
// 添加请求拦截器
myAxiso.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("我要发送请求了,",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxiso.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("我收到你的响应了,",response)

    //设置全局拦截器，让其必须登录才可以：40100表示未登录
    if (response?.data?.code===40100){
        //原来的url；
        const redirectUrl=window.location.href;
        window.location.href=`/user/login?redirect=${redirectUrl}`;
    }

    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default myAxiso