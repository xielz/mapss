import axios from 'axios'
import router from '../../src/router'
// import router from "./router"
axios.defaults.withCredentials = true;  //允许跨域
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' //返回401
import { ElLoading,ElMessage } from 'element-plus'

import qs from "qs"
const TIME_OUT_MS = 600 * 1000 // 默认请求超时时间
//axios.defaults.baseURL = 'http://localhost:8080'; 


//创建axios实例，请求超时时间为300秒所以对应的也要创建多个axios实例
axios.create({
    timeout: 300000,
});

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
function showLoading(target) {
    // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
    // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
    if (needLoadingRequestCount === 0 && !loading) {
        loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.7)',
            //   target: target || "body"
        });
    }
    needLoadingRequestCount++;
}

//隐藏loading
function hideLoading() {
      needLoadingRequestCount--;
      needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
      if (needLoadingRequestCount === 0) {
        //关闭loading
        toHideLoading();
      }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
// var toHideLoading = _.debounce(()=>{
//       loading.close();
//       loading = null;
//     }, 300);

function toHideLoading() {
    loading.close();
    loading = null;
};

// 请求拦截
axios.interceptors.request.use(
    config => {
        // console.log("请求拦截", config);
        // let access_token = localStorage.getItem("access_token") || '';
        // // console.log("bbb",access_token);
        // if (access_token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = 'Bearer ' + access_token;
        // }
        // else{
        //     this.$router.push('/Login');
        // }
        if (config.method == 'get') {
            //axios中get请求会移除Content-Type，此处是绕过判断给get添加header
            //config.data = true;
             config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }

        // if (config.method == 'post') {
           
        //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        // }
       

        //就这个
        // if (config.method == 'post') {
        //     types = 'application/x-www-form-urlencoded';
        // }

        // else {
        //     types = 'application/json;charset=UTF-8';
        // }
        

        // if (config.headers.showLoading !== false) {
        //     showLoading(config.headers.loadingTarget);
        // }
      
        //发送请求之前操作
        return config;
    },
    err => {
        console.log("cccKK", err)
        //判断当前请求是否设置了不显示Loading
        // if (config.headers.showLoading !== false) {
        //     hideLoading();
        // }

        this.$message({
            type: "error",
            message: '请求超时!'
        });    
       
        //请求错误
      return Promise.reject(err);
    });


// http 响应拦截

axios.interceptors.response.use(
    response => {
       
        // console.log('http 响应拦截response',response)
        //拦截响应，做统一处理 
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
   //判断当前请求是否设置了不显示Loading
        // if (error.config.headers.showLoading !== false) {
        //     hideLoading();
        // }

    

        let status = error.response.status
        if (status) {
            switch (status) {
                case 401:
                    router.replace({
                        path: "/Login"
                    })
                    break;
                // case 403: //服务器已经理解请求，但是拒绝执行他（一般是TOKEN过期）
                //     localStorage.removeItem('access_token');
                //     //跳转的登录页面
                //     break;
                case 500:
                  ElMessage.error('服务器异常请稍后再试500')
                    break;
            }
        }
        console.log("CCCerror.response.status",error.response)
        // return Promise.reject(error.response) // 返回接口返回的错误信息

        console.log('http 响应拦截接口错误状态处理',error)
        return Promise.reject(error) // 返回接口返回的错误信息
    })





    // axios.interceptors.response.use(
    //     response => {
    //         // 根据后端约定，response.data形式为{success:boolean, message:string, content:any}
    //         if (response.data.success) {
    //             return response.data
    //         } else {
    //             iView.Notice.error({
    //                 title: '错误',
    //                 desc: response.data.message
    //             })
    //             Promise.reject(response.data.message)
    //         }
    //     },
    //     error => {
    //         if (error.response) {
    //             if (error.response.status === 401) {
    //                 // 这种情况一般调到登录页
    //             } else if (error.response.status === 403) {
    //                 // 提示无权限等
    //             } else {
    //                 // 其他错误处理
    //             }
    //         }
    //         return Promise.reject(error.response.data)
    //     }
    // )





// // 引入直接看这个 接下都不要看了
// //https://www.136.la/ios/show-6510.html




// // 调用 1、 正常情况下，每次发起请求页面上都会显示一个全屏的 loading 效果。
// this.axios.get("/api/menu")
//  .then(response => {
//      this.menus = response.data;
//  })

// //  2、如果在请求 header 中传递个 showLoading:false 参数，则该请求不会有 loading 效果。
//  this.axios.get("/api/getDeviceDatas",{headers: {'showLoading': false}})
//  .then(response => {
//      this.tableData = response.data;
//  })

//  this.$axios.post(this.$api.Login,{userName: this.ruleForm.username,password: this.ruleForm.password})
// .then(res => {


//  //3、如果将请求 header 中 loadingTarget 设置为页面上某个元素的选择符，则 loading 效果会只显示在个元素区域上。比如我们下面代码我们只让 loading 遮罩显示在弹出框的内容区域上。
//  this.axios.get("/api/controlApp?method=" + method, {headers: {'loadingTarget': '#dialogContent'}})
//  .then(response => {
//      // 重新加载数据
//      this.loadAppData();
//      this.$message.success('执行成功!');
//  })
