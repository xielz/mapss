const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
   // 打包基本路径
   publicPath: './',
   // 输出文件目录
   outputDir: 'dist',
  devServer: {
    proxy: {
      '/baseUrl': {
        // target: 'https://pr.31education.com/', 	//API服务器的地址
        target:'https://47.96.93.36/',
        ws: true, 				//是否允许跨域
        changeOrigin: true, 	// cnpm 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/baseUrl': ''
        }
      }
    },
    hot: true, //保存实时刷新
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap'
    }
  }
})
