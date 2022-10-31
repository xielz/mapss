import { createRouter, createWebHashHistory } from "vue-router";
const routes = [{
        path: "/",
        name: "Main",
        component: () =>
            import ("../components/common/Main.vue"),
        children: [
            //写在这里的都是有添加头尾部的页面
            {
                path: "/",
                name: "Home",
                component: () =>
                    import ("../components/Home.vue"),
                meta: {
                    index: 0,
                    title: '首页'
                }
            },
            {
                path: "/SchoolResource",
                name: "SchoolResource",
                component: () =>
                    import ("../components/SchoolResource.vue"),
                meta: {
                    index: 1,
                    title: '校级资源库'
                }
            },
            {
                path: "/MajorResource",
                name: "MajorResource",
                component: () =>
                    import ("../components/MajorResource.vue"),
                meta: {
                    index: 2,
                    title: '专业资源库'
                }
            },
            {
                path: "/CourseResource",
                name: "CourseResource",
                component: () =>
                    import ("../components/CourseResource.vue"),
                meta: {
                    index: 3,
                    title: '课程资源库'
                }
            },
            {
                path: "/NavCountResource",
                name: "NavCountResource",
                component: () =>
                    import ("../components/NavCountResource.vue"),
                meta: {
                   
                    title: '资源库'
                }
            },
            {
                path: "/My",
                name: "My",
                component: () =>
                    import ("../components/My.vue"),
                meta: {
                    index: 4,
                    title: '我的'
                }
            },
            {
                path: "/ResourceDetails",
                name: "ResourceDetails",
                component: () =>
                    import ("../components/ResourceDetails.vue"),
                meta: {   
                    title: '详情'
                }
            },
            
            // {
            //     path: '/:pathMatch(.*)',
            //     //访问主页的时候 重定向到index页面
            //     redirect: '/404',
            // },
            // {
            //     path: "/404",
            //     name: "404",
            //     component: () =>
            //         import ("../components/error/404"),
            //     meta: { title: "404" }
            // },
            {
                path: "/403",
                name: "403",
                component: () =>
                    import ("../components/error/403"),
                meta: { title: "403" }
            },
        ]
    },  
    //这个不会添加头尾部
    {
        path: "/404",
        name: "404",
        component: () =>
            import ("../components/error/404"),
        meta: { title: "404" }
    },
    {
        path: "/Login",
        name: "Login",
        component: () =>
            import ("../components/common/Login.vue"),
        meta: {
            title: '登录'
        }
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 全局守卫：登录拦截 本地没有存token,请重新登录
// router.beforeEach((to, from, next) => {
// 	// 判断有没有登录
// 	// if (!localStorage.getItem('token')) {
// 	// 	if (to.name == "login") {
// 	// 		next();
// 	// 	} else {
// 	// 		router.push('login')
// 	// 	}
// 	// } else {
// 	// 	next();
// 	// }
// });


export default router;