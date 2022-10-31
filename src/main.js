import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
// import axios from 'axios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'


// import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.use(router)
// app.config.globalProperties.$axios = axios;
app.use(ElementPlus)

import qs from "qs";
app.config.globalProperties.$qs = qs;

import api from '../static/js/api'
app.config.globalProperties.$api = api;


import http from '../static/js/common'
app.config.globalProperties.$http = http;

// console.log('当前环境',process.env.NODE_ENV)



import axios from 'axios'
//引入axios.js文件,注意路径
import '../static/js/common'
import "../static/css/base.less";


//挂载到原型链上
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts


// v-preventReClick="5000" 5秒内禁止连续点击(只对button有效ok)
// app.directive('preventReClick', {
//     // mounted(el, binding) {
//     //     el.addEventListener('click', () => {
//     //         if (!el.disabled) {
//     //             console.log("123")
//     //             el.disabled = true;
//     //             //可 el.setAttribute('style', 'pointer-events: none;')
//     //             setTimeout(() => {
//     //                 console.log("456")
//     //                 el.disabled = false;
//     //                 // el.setAttribute('style', 'pointer-events: auto;')
//     //             }, binding.value || 300);
//     //         }

//     //     })
//     // }

// })
app.directive(
    'preventReClick', {
        mounted: function(el, binding) {
            el.addEventListener('click', () => {
                const events = el.style.pointerEvents
                if (events == "") {
                    el.style.pointerEvents = 'none'
                    setTimeout(() => {
                        el.style.pointerEvents = "";
                    }, binding.value || 300);
                }
            })
        }
    }
)






// router.afterEach((to,from,next) => {
//     //遍历meta改变title
//     if (to.meta.title) {
//       document.title = to.meta.title;
//     }
//     window.scrollTo(0,0);
//   });

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
    next();




    // if (to.path === '/Login' || to.path === '/403' || to.path === '/404'|| to.path === '/Login') {
    //     console.log("333333")
    //     next();
    //     return;
    // } else {

    //     console.log("4444444")
    //     axios.get(api.CheckLogin, {}).then(res => {
    //         if (res.data.data == false) {
    //             localStorage.removeItem('access_token');
    //             next({
    //                 path: '/Login'
    //             });
    //         } else {
    //             let access_token = localStorage.getItem('access_token');
    //             if (access_token) {
    //                 next()
    //             } else {
    //                 if (to.path == '/Login') {
    //                     next()
    //                 } else {
    //                     next({
    //                         path: '/Login'
    //                     })
    //                 }
    //             }
    //         }
    //     }).catch(error => {
    //         console.log("error", error);
    //     });

    // }


    // 无cookie
    // if (to.path === '/Login'||to.path === '/403'||to.path === '/404') {
    //     next();
    //     return;
    // }
    // else{
    //     axios.get(api.CheckLogin, {}).then(res => { 
    //         console.log("resccc",res)
    //         if (res.data.data == true) {
    //             console.log("111")
    //             next();
    //         } else {
    //             console.log("222")
    //             next('/Login');
    //         }
    //     })
    //     .catch(error => {
    //         console.log("error", error);
    //     });
    // }







    // 判断有没有登录
    // if (!localStorage.getItem('token')) {
    // 	if (to.name == "login") {
    // 		next();
    // 	} else {
    // 		router.push('login')
    // 	}
    // } else {
    // 	next();
    // }
});


app.mount('#app')


// createApp(App).use(router).use(ElementPlus).mount('#app')