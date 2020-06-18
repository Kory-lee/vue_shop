'use strict';
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const resolve = (dir) => path.join(__dirname, dir);
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    'element-ui': 'ELEMENT',
    // echarts: 'echarts',
  },
  // 通过cdn方式使用
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.3.3/dist/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
    // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    // 'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
  ],
  css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'],
};

module.exports = {
  publicPath: isProduction ? '' : '/', // 基本路径,打包时加上.
  // outputDir: process.env.outputDir, // 输出文件目录
  outputDir: isProduction ? 'dist' : 'devdist',
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
    const svgRules = config.module.rule('svg');
    svgRules.uses.clear();
    svgRules
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        include: ['./src/icons'],
      });

    config.resolve.alias
      // .set('vue', 'vue/dist/vue.js')
      .set('@', resolve('src'))
      .set('@views', resolve('src/views'))
      .set('@components', resolve('src/components'))
      .set('@styles', resolve('src/styles'))
      .set('@images', resolve('src/assets/images'))
      .set('@assets', resolve('src/assets'))
      .set('@router', resolve('src/router'))
      .set('@utils', resolve('src/utils'))
      .set('@api', resolve('src/api'))
      .set('@icons', resolve('src/icons'))
      .set('@store', resolve('src/store'));
    // 修复Lazy Loading routes Error
    config.plugin('html').tap((args) => {
      args[0].chunksSortMode = 'none';
      return args;
    });
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
    config.module.rule('eslint');
  },
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // // 公共代码抽离
      // config.optimization = {
      //   // 分割代码块
      //   splitChunks: {
      //     cacheGroups: {
      //       // 公用模块抽离
      //       common: {
      //         chunks: 'initial',
      //         minSize: 0, // 大于0个字节
      //         minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
      //       },
      //       // 第三方库抽离
      //       vendor: {
      //         priority: 1, // 权重
      //         test: /node_modules/,
      //         chunks: 'initial',
      //         minSize: 0, // 大于0个字节
      //         minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
      //       }
      //     }
      //   }
      // };
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        prependData: `@import "~@styles/main.scss";`,
      },
      postcss: {
        // plugins: [
        //   // 把px单位换算成rem单位
        //   require('postcss-pxtorem')({
        //     rootValue: 75, // 换算的基数(设计图750的根字体为32)
        //     selectorBlackList: ['.van-'], // 要忽略的选择器并保留为px。
        //     propList: ['*'], // 可以从px更改为rem的属性。
        //     minPixelValue: 2, // 设置要替换的最小像素值。
        //   }),
        //   require('autoprefixer'),
        // ],
        plugins: [require('autoprefixer')],
      }, // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    // modules: false // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: false, // 开启热加载
    hotOnly: false,
    proxy: {
      // [process.env.VUE_APP_MODE]: {
      //   target: `http://web-jshtml.cn/productapi/token`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     //看后台是否有，决定是否重写
      //     ['^' + process.env.VUE_APP_API_URL]: '',
      //   },
      // },
      '/devApi': {
        target: 'http://web-jshtml.cn/productapi/token', //API服务器的地址  http://www.web-jshtml.cn/api
        changeOrigin: true,
        pathRewrite: {
          '^/devApi': '',
        },
      },
    },
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true,
    },
    before: () => {},
  },
};
