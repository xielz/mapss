import axios from 'axios'
import qs from "qs"
const TIME_OUT_MS = 600 * 1000 // 默认请求超时时间
//axios.defaults.baseURL = 'http://localhost:8080'; 


//创建axios实例，请求超时时间为300秒所以对应的也要创建多个axios实例
axios.create({
    timeout: 300000,
});


// 请求拦截
axios.interceptors.request.use(
    config => {
        console.log("请求拦截", config);
        let access_token = localStorage.getItem("access_token") || '';
        if (access_token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = 'Bearer ' + access_token;
        }
        // else{
        //     this.$router.push('/Login');
        // }
        if (config.method == 'get') {
            //axios中get请求会移除Content-Type，此处是绕过判断给get添加header
            //config.data = true;
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }

        if (config.method == 'post') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

        }
        //发送请求之前操作
        return config;
    },
    err => {
           console.log("请求拦截err",err)

        //请求错误
        return Promise.reject(err);
    });


// http 响应拦截
axios.interceptors.response.use(
    response => {
        // //这段解除注销后 下面的return response就要注销掉
        // // response 根据不同status 状态返回 对应不同的comfirm
        // const res = response.data
        // if (res.code === '后端返回的status或者code获取其他状态码') {
        //   // console.log('登录状态已过期')
        // } else {
        //   return res  
        // }
         console.log("响应拦截", response)

        //拦截响应，做统一处理 
        return response;
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        // let status = error.response.status
        // if (status) {
        //     switch (status) {
        //         case 401:
        //             router.replace({
        //                 path: "/Login"
        //             })
        //             break;
        //         case 403: //服务器已经理解请求，但是拒绝执行他（一般是TOKEN过期）
        //             localStorage.removeItem('access_token');
        //             //跳转的登录页面
        //             break;
        //         case 500:
        //             break;

        //     }

        // }
        // console.log("bbbb",error.response.status)
        return Promise.reject(error.response) // 返回接口返回的错误信息
      


        // console.log("response error :"+error);
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 401:
        //       console.log("token 过期");
        //       var config = error.config;
        //       refresh(config);  //这个可以注释掉
        //       return;
        //   }
        // }
        //       return Promise.reject(error) // 返回接口返回的错误信息
    })

// // 引入直接看这个 接下都不要看了
// //https://www.136.la/ios/show-6510.html
