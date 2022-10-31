   const CONFIG = {
        // 开发环境配置
        development: {	
            // baseUrl: 'http://192.168.1.140:7100/', // 后台接口请求地址              
            baseUrl: '/baseUrl/', // 后台接口请求地址   
        },
        // 生产环境配置
        production: {
            // baseUrl: 'https://192.168.16.24/', // 后台接口请求地址	
            baseUrl: '/', 
          
        }
    };
    export default CONFIG[process.env.NODE_ENV];