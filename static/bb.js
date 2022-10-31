import axios from 'axios';
import { Message,Loading } from 'element-ui';
import _ from 'lodash';
  
const http = axios.create({
    baseURL:process.env.BASE_URL, //设置请求的base url
    timeout:40000 //超时时长
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
    loading = Loading.service({
      lock: true,
      text: "Loading...",
      background: 'rgba(255, 255, 255, 0.5)',
      target: target || "body"
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
var toHideLoading = _.debounce(()=>{
      loading.close();
      loading = null;
    }, 300);
  
//添加请求拦截器
http.interceptors.request.use(config => {
  //判断当前请求是否设置了不显示Loading
  if(config.headers.showLoading !== false){
    showLoading(config.headers.loadingTarget);
  }
  return config;
}, err => {
  //判断当前请求是否设置了不显示Loading
  if(config.headers.showLoading !== false){
    hideLoading();
  }
  Message.error('请求超时!');
  return Promise.resolve(err);
});
  
//响应拦截器
http.interceptors.response.use(
    response => {
      //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
      if(response.config.headers.showLoading !== false){
        hideLoading();
      }
      return response;
    },
    error => {
      //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
      if(error.config.headers.showLoading !== false){
        hideLoading();
      }
      if(error.response && error.response.data && error.response.data.message) {
        var jsonObj = JSON.parse(error.response.data.message);
        Message.error(jsonObj.message);
      }else{
        Message.error(error.message);
      }
      return Promise.reject(error);
    }
);
  
export default http;



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

 