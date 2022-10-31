
import axios from 'axios'
import Qs from 'qs'
//import { Message } from 'element-ui'  //引入element中的弹窗，这个不是必须的可根据项目来
const TIME_OUT_MS = 600 * 1000 // 默认请求超时时间 

// axios.defaults.withCredentials = false;  //false  不跨域  true 跨域
//axios.defaults.headers.common['token'] = localstorage.getItem('token'); //设置请求头，这个是不是必须的


const sendRequest = (path, params, method = "GET", headerType = "json") => {

   let baseURL = "", data = {}
    baseURL = process.env.BASE_URL //这里是在config里面配置了请求路径

      //设置请求头
    if (method === 'post') {   //post请求
        // if (headerType === "json") {
        //     axios.defaults.headers["Content-Type"] = 'application/json;charset=UTF-8'
        //     data = params
        // } else {
        //     axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
        //     data = Qs.stringify(params);
        // }
    }

    //get请求
    if (method === 'get') {
    //     if (headerType == !'json') {
    //         axios.defaults.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'
    //     }
    //     data = Qs.stringify(params);
    //     path = path + '?' + data
    //     data = {};
 }

    //创建axios实例，请求超时时间为300秒所以对应的也要创建多个axios实例
axios.create({
	timeout: TIME_OUT_MS,
});

     // 请求拦截
    axios.interceptors.request.use(function (config) {
    //     let token = storage.getStorage("token")
    //     if (token) {
    //         config.headers['token'] = token;
    //     }
    //     return config;
    //    }, function (error) {
    //     return Promise.reject(error);
       });

      //响应拦截
      axios.interceptors.response.use(response=>{
        //   if (response.headers.token) {
        //     storage.setStorage('token', response.headers.token)
        //   }
        //   if (response.data.statusCode == 20009) {  //这里的状态码是根据后台设置的来
        //      //  Message.error({ message: '登录过期，请重新登录' })
        //    }
        //    return response;
        //    },error=>{
        //       return Promise.resolve(error.response)
        })

       //发送请求
      return new Promise((resolve, reject)=>{
         return axios({
            method: method,
            url: path,
            data:params,
       
        }).then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
            
          })
}


export default{
    sendRequest,
    
}