"use strict";
const path = require("path");
const isProduction = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const productionGzipExtensions = ["html", "js", "css"];
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  "vue-router": "VueRouter",
  axios: "axios",
  // 'element-ui': 'ElementUi,
  // echarts: 'echarts',
};
const cdn = {
  js: [
    "//unpkg.com/vue/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min.js",
    "//unpkg.com/axios/dist/axios.min.js",
    // '//unpkg.com/element-ui/lib/index.js',
    // 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    // 'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
  ],
  css: ["//unpkg.com/element-ui/lib/theme-chalk/index.css"],
};
module.exports = {
  publicPath: "/",
  lintOnSave: isProduction,
  css: {
    loaderOptions: {
      scss: { additionalData: '@import "~@styles/main.scss";' },
    },
  },
  // webpack配置
  chainWebpack(config) {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.resolve.symlinks(true);

    config.resolve.alias
      .set("@", resolve("src"))
      .set("@views", resolve("src/views"))
      .set("@components", resolve("src/components"))
      .set("@styles", resolve("src/styles"))
      .set("@images", resolve("src/assets/images"))
      .set("@assets", resolve("src/assets"))
      .set("@router", resolve("src/router"))
      .set("@utils", resolve("src/utils"))
      .set("@api", resolve("src/api"))
      .set("@icons", resolve("src/icons"))
      .set("@store", resolve("src/store"));
    // 修复Lazy Loading routes Error
    config.plugin("html").tap((args) => {
      args[0].chunksSortMode = "none";
      return args;
    });
    const svgRules = config.module.rule("svg");
    svgRules.uses.clear();
    svgRules
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]", include: ["./src/icons"] });

    config.module.rule("eslint");

    if (isProduction) {
      config
        .plugin("webpack-report")
        .use(BundleAnalyzerPlugin, [{ analyzerMode: "static" }]);
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },

  configureWebpack(config) {
    // 生产环境相关配置
    if (isProduction) {
      config.externals = externals;
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            // 公用模块抽离
            common: {
              chunks: "initial",
              minSize: 0, // 大于0个字节
              minChunks: 2, // 抽离公共代码时，这个代码块最小被引用的次数
            },
            // 第三方库抽离
            vendor: {
              priority: 1, // 权重
              test: /node_modules/,
              chunks: "initial",
              minSize: 0, // 大于0个字节
              minChunks: 2, // 在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
      // gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          // deleteOriginalAssets: true, // 删除原文件
        })
      );
    }
  },
  devServer: {
    open: true, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: false, // 开启热加载
    proxy: {
      [process.env.VUE_APP_API]: {
        target: "http://www.web-jshtml.cn/vue_admin_api/token", //API服务器的地址  http://web-jshtml.cn/productapi/token
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_API]: "",
        },
      },
    },
    overlay: {
      // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true,
    },
  },

  productionSourceMap: false,
};
