import {defineConfig} from 'umi'
import route  from './routes'


export default defineConfig ({
    antd: {},
    routes :route,
    dva: {
      hmr: true,
      immer: true,
    },
    locale: {
      antd: true,
      default: 'zh-CN',
      baseNavigator: true,
    },
    // 按需加载
    dynamicImport: {
       loading: '@/PageLoading/index',
    },
    cssLoader: {
        modules: {
        getLocalIdent: (
          context: {
            resourcePath: string;
          },
          _: string,
          localName: string,
        ) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('ant.design.pro.less') ||
            context.resourcePath.includes('global.less')
          ) {
            return localName;
          }
      }
    
      },
    },
    // 配置多个代理 首先在本地上找资源找不到再到目的服务器找资源
    proxy: {
        '/carSystem': { // 匹配前缀为/carSystem的请求
          target: 'http://localhost:3000/',  // 目的服务器
          changeOrigin: true,                // 修改请求头地址欺骗服务器
          pathRewrite: { '^/carSystem': '' },  // 重写请求路径
        },
      } 
})