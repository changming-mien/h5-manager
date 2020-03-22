module.exports = {
	publicPath:'./',
    devServer: {
        proxy: {
            '/service': {
                // target: 'http://manager.fin-home.com/service', //对应自己的接口
                target:'http://123.56.102.189:18002/service',
                // target:'http://123.56.102.189:8080/service',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/service': ''
                }
            }
        }
    }
  }