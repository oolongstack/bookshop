import axios from 'axios';
import { Notify ,Toast} from "vant";
import router from '../router/index'
export function request(config){
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout:5000
    })

    instance.interceptors.request.use(config=>{
        //请求时将有token信息的头部信息带上
        let token = window.localStorage.getItem('token')
        if (token){
            config.headers.Authorization = 'Bearer'+' '+ token
        }
        //放行
        return config
    },err=>{
        
    })

    instance.interceptors.response.use(res=>{
        return res.data? res.data : res
    },err=>{
      //如果有需要授权才能访问的接口，统一跳转到/login
        if (err.response.status == '401'){
            Toast.fail('前先登录')
           setTimeout(()=>{
            router.push('/login')
           },300)
        }
      //如果有错误，在这里处理，显示错误信息  
      Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])  
    })
    return instance(config)
}